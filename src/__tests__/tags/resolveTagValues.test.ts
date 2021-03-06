import Joi from 'joi'
import { Options } from '../../options/types'
import { resolveTagValues } from '../../tags/prepare'
import { ResolvedTag } from '../../tags/types'
import { options as defaultOptions } from '../_stubs/options'
import { tags as allTags } from '../_stubs/tags'

const resolvedTagSchema = ({
  name,
  value,
}: {
  name: string,
  value: string,
}) => Joi.object().keys({
  mandatory: Joi.boolean().required(),
  name,
  replaces: Joi.array().optional().items(Joi.function()),
  section: Joi.string().optional(),
  value,
})

const testEachTag = (
  tags: ResolvedTag[],
  schemata: Joi.ObjectSchema[],
): void => {
  expect(schemata).toHaveLength(tags.length)

  tags.forEach((tag, index) => {
    expect(tag).toMatchJoiSchema(schemata[index])
  })
}

test('returns object literal tags without changes', async () => {
  expect.assertions(3)

  const resolvedTags = resolveTagValues([allTags[0]], defaultOptions)

  expect(resolvedTags[0]).toEqual(allTags[0])

  testEachTag(resolvedTags, [
    resolvedTagSchema({ name: 'Tag', value: 'tag' }),
  ])
})

test('returns object literal tags from function tags', async () => {
  expect.assertions(2)

  const resolvedTags = resolveTagValues([allTags[2]], defaultOptions)

  testEachTag(resolvedTags, [
    resolvedTagSchema({ name: 'Computed Value Tag', value: 'computed-value-tag' }),
  ])
})

test('returns object literal tags from function tags based on the options provided', async () => {
  expect.assertions(4)

  const variableTag = (options: Options): ResolvedTag => ({
    mandatory: false,
    name: `Update Processed is ${options.updateProcessed}`,
    value: 'update-processed',
  })

  const resolvedTagsWithProcessed = resolveTagValues(
    [variableTag],
    { ...defaultOptions, updateProcessed: true },
  )
  testEachTag(resolvedTagsWithProcessed, [
    resolvedTagSchema({ name: 'Update Processed is true', value: 'update-processed' }),
  ])

  const resolvedTagsWithoutProcessed = resolveTagValues(
    [variableTag],
    { ...defaultOptions, updateProcessed: false },
  )
  testEachTag(resolvedTagsWithoutProcessed, [
    resolvedTagSchema({ name: 'Update Processed is false', value: 'update-processed' }),
  ])
})

test('handles a mix of both object literal and function tag', async () => {
  expect.assertions(5)

  const resolvedTags = resolveTagValues(allTags, defaultOptions)

  testEachTag(resolvedTags, [
    resolvedTagSchema({ name: 'Tag', value: 'tag' }),
    resolvedTagSchema({ name: 'Mandatory Tag', value: 'mandatory-tag' }),
    resolvedTagSchema({ name: 'Computed Value Tag', value: 'computed-value-tag' }),
    resolvedTagSchema({ name: 'Replacement Tag', value: 'replacement-tag' }),
  ])
})
