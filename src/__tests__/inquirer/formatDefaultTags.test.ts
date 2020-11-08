import * as Joi from 'joi'
import { map } from 'lodash/fp'
import { formatDefaultTags } from '../../inquirer/format'
import { preparedTags } from '../_stubs/preparedTags'

test('formatDefaultTags returns an array of tag values', async () => {
  const result = formatDefaultTags(preparedTags)

  expect(result).toMatchJoiSchema(
    Joi.array().min(1).items(Joi.string()),
  )
})

test('formatDefaultTags returns no tag values when no tags are selected', async () => {
  const noSelectedTags = map((tag) => ({ ...tag, selected: false }), preparedTags)
  const result = formatDefaultTags(noSelectedTags)

  expect(result).toEqual([])
})

test('formatDefaultTags returns some tag values when some tags are selected', async () => {
  const result = formatDefaultTags(preparedTags)

  expect(result).toEqual([
    'selected-tag',
    'added-tag',
    'replaced-tag',
  ])
})

test('formatDefaultTags returns all tag values when all tags are selected', async () => {
  const allSelectedTags = map((tag) => ({ ...tag, selected: true }), preparedTags)
  const result = formatDefaultTags(allSelectedTags)

  expect(result).toHaveLength(preparedTags.length)
  expect(result).toEqual([
    'unselected-tag',
    'selected-tag',
    'added-tag',
    'replaced-tag',
    'deleted-tag',
  ])
})