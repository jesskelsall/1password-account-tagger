import { red, yellow } from 'chalk'
import Joi from 'joi'
import { formatSourceTags } from '../../inquirer/format'
import { generateCheckboxPlusSource } from '../../inquirer/question'
import { InquirerSourceTag } from '../../inquirer/types'
import { preparedTags } from '../_stubs/preparedTags'

const sourceTags = formatSourceTags(preparedTags)
const checkboxPlusSource = generateCheckboxPlusSource(sourceTags)

const filterTagsByName = (
  names: string[],
): InquirerSourceTag[] => sourceTags.filter((tag) => names.includes(tag.name))

test('returns a function', async () => {
  expect(checkboxPlusSource).toMatchJoiSchema(Joi.function())
})

test('returns all answers with no input', async () => {
  const result = await checkboxPlusSource(sourceTags, undefined)

  expect(result).toEqual(sourceTags)
})

test('returns all answers with an empty input', async () => {
  const result = await checkboxPlusSource(sourceTags, '')

  expect(result).toEqual(sourceTags)
})

test('returns some answers that match a partial input', async () => {
  const result = await checkboxPlusSource(sourceTags, 'sel')

  expect(result).toEqual(filterTagsByName(['Unselected Tag', 'Selected Tag']))
})

test('returns one answer that matches a partial input', async () => {
  const result = await checkboxPlusSource(sourceTags, 'Rep')

  expect(result).toEqual(filterTagsByName([yellow('Replaced Tag [was old-tag]')]))
})

test('returns one answer that matches a complete input', async () => {
  const result = await checkboxPlusSource(sourceTags, 'Deleted Tag')

  expect(result).toEqual(filterTagsByName([red('Deleted Tag [deleted]')]))
})

test('returns no answers if the input matches nothing', async () => {
  const result = await checkboxPlusSource(sourceTags, 'No Match')

  expect(result).toEqual([])
})
