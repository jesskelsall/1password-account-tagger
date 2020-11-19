import Joi from 'joi'
import { unset } from 'lodash/fp'
import { groupTagsIntoSections } from '../../tags/group'
import { SectionOfTags } from '../../tags/types'
import { preparedTags } from '../_stubs/preparedTags'
import { sections as allSections } from '../_stubs/sections'

interface TagAssertionValues {
  section?: string,
  value: string,
}

const tagSchema = ({
  section,
  value,
}: TagAssertionValues) => Joi.object().keys({
  section: section
    ? Joi.string().required().valid(section)
    : Joi.any().disallow(),
  value,
}).unknown()

const testSections = (
  sections: SectionOfTags[],
  expectedSectionValues: string[],
): void => {
  const sectionValues = sections.map((section) => section.value)
  expect(sectionValues).toEqual(expectedSectionValues)
}

const testTags = (
  section: SectionOfTags,
  expectedTagValues: TagAssertionValues[],
): void => {
  expect(expectedTagValues).toHaveLength(section.tags.length)

  section.tags.forEach((tag, index) => {
    expect(tag).toMatchJoiSchema(
      tagSchema(expectedTagValues[index]),
    )
  })
}

test('returns one section containing all tags when grouping by section is disabled', async () => {
  expect.assertions(7)

  const result = groupTagsIntoSections(preparedTags, allSections, false)

  testSections(result, ['_all'])

  testTags(result[0], [
    { value: 'unselected-tag', section: 'two' },
    { value: 'selected-tag' },
    { value: 'added-tag', section: 'one' },
    { value: 'replaced-tag', section: 'two' },
    { value: 'deleted-tag' },
  ])
})

test('returns one section containing all tags when there are no sections', async () => {
  expect.assertions(7)

  const tagsWithNoSections = preparedTags.map(unset('section'))
  const result = groupTagsIntoSections(tagsWithNoSections, [], true)

  testSections(result, ['_other'])

  testTags(result[0], [
    { value: 'unselected-tag' },
    { value: 'selected-tag' },
    { value: 'added-tag' },
    { value: 'replaced-tag' },
    { value: 'deleted-tag' },
  ])
})

test('returns multiple sections when some tags have sections', async () => {
  expect.assertions(9)

  const result = groupTagsIntoSections(preparedTags, allSections, true)

  testSections(result, [
    'one',
    'two',
    '_other',
  ])

  testTags(result[0], [
    { value: 'added-tag', section: 'one' },
  ])

  testTags(result[1], [
    { value: 'unselected-tag', section: 'two' },
    { value: 'replaced-tag', section: 'two' },
  ])

  testTags(result[2], [
    { value: 'selected-tag' },
    { value: 'deleted-tag' },
  ])
})

test('does not group tags into a section that is not defined', async () => {
  expect.assertions(9)

  const tagsWithUnknownSection = preparedTags.map((tag) => (
    tag.value === 'selected-tag' ? { ...tag, section: 'three' } : tag
  ))
  const result = groupTagsIntoSections(tagsWithUnknownSection, allSections, true)

  testSections(result, [
    'one',
    'two',
    '_other',
  ])

  testTags(result[0], [
    { value: 'added-tag', section: 'one' },
  ])

  testTags(result[1], [
    { value: 'unselected-tag', section: 'two' },
    { value: 'replaced-tag', section: 'two' },
  ])

  testTags(result[2], [
    { value: 'selected-tag' },
    { value: 'deleted-tag' },
  ])
})

test('does not return sections that have no tags', async () => {
  expect.assertions(8)

  const tagsWithEmptySection = preparedTags.map((tag) => (
    tag.section === 'two' ? unset('section', tag) : tag
  ))
  const result = groupTagsIntoSections(tagsWithEmptySection, allSections, true)

  testSections(result, [
    'one',
    '_other',
  ])

  testTags(result[0], [
    { value: 'added-tag', section: 'one' },
  ])

  testTags(result[1], [
    { value: 'unselected-tag' },
    { value: 'selected-tag' },
    { value: 'replaced-tag' },
    { value: 'deleted-tag' },
  ])
})

test('does not return the All Tags section if all tags have sections', async () => {
  expect.assertions(8)

  const tagsAllWithSections = preparedTags.map((tag) => (
    !tag.section ? { ...tag, section: 'two' } : tag
  ))
  const result = groupTagsIntoSections(tagsAllWithSections, allSections, true)

  testSections(result, [
    'one',
    'two',
  ])

  testTags(result[0], [
    { value: 'added-tag', section: 'one' },
  ])

  testTags(result[1], [
    { value: 'unselected-tag', section: 'two' },
    { value: 'selected-tag', section: 'two' },
    { value: 'replaced-tag', section: 'two' },
    { value: 'deleted-tag', section: 'two' },
  ])
})
