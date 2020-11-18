import { green, red, yellow } from 'chalk'
import Joi from 'joi'
import { formatSourceTags } from '../../inquirer/format'
import { preparedTags } from '../_stubs/preparedTags'

const sourceTags = [
  {
    disabled: false,
    name: 'Unselected Tag',
    value: 'unselected-tag',
  },
  {
    disabled: false,
    name: 'Selected Tag',
    value: 'selected-tag',
  },
  {
    disabled: false,
    name: green('Added Tag [mandatory]'),
    value: 'added-tag',
  },
  {
    disabled: false,
    name: yellow('Replaced Tag [was old-tag]'),
    value: 'replaced-tag',
  },
  {
    disabled: false,
    name: red('Deleted Tag [deleted]'),
    value: 'deleted-tag',
  },
]

const indexOrAll = <T>(array: T[], index?: number): T[] => (index ? [array[index]] : array)

const testAgainstSourceTags = (index?: number): void => {
  const preparedTagsSubset = indexOrAll(preparedTags, index)
  const sourceTagsSubset = indexOrAll(sourceTags, index)

  expect(preparedTagsSubset[0]).toBeTruthy()
  expect(sourceTagsSubset[0]).toBeTruthy()

  expect(formatSourceTags(preparedTagsSubset)).toEqual(sourceTagsSubset)
}

test('returns an array of inquirer source tags', async () => {
  const result = formatSourceTags(preparedTags)

  expect(result).toMatchJoiSchema(
    Joi.array().length(preparedTags.length).items(
      Joi.object().keys({
        disabled: false,
        name: Joi.string().required(),
        value: Joi.string().required(),
      }),
    ),
  )
})

test('returns a source tag object with a plain name for an unselected tag', async () => {
  expect.assertions(3)
  testAgainstSourceTags(0)
})

test('returns a source tag object with a plain name for a selected tag', async () => {
  expect.assertions(3)
  testAgainstSourceTags(1)
})

test('returns a source tag object with a green mandatory name for an added tag', async () => {
  expect.assertions(3)
  testAgainstSourceTags(2)
})

test('returns a source tag object with a yellow replaced name for a replaced tag', async () => {
  expect.assertions(3)
  testAgainstSourceTags(3)
})

test('returns a source tag object with a red deleted name for a deleted tag', async () => {
  expect.assertions(3)
  testAgainstSourceTags(4)
})

test('returns a mixture of all of the above', async () => {
  expect.assertions(3)
  testAgainstSourceTags()
})
