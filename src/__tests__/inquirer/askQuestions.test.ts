import Joi from 'joi'
import { askQuestions, generateInquirerQuestions } from '../../inquirer/question'
import { sectionsOfTags } from '../_stubs/sectionsOfTags'

jest.mock('inquirer')

test('returns an array of strings', async () => {
  const questions = generateInquirerQuestions(sectionsOfTags)
  const result = await askQuestions(questions)

  expect(result).toMatchJoiSchema(
    Joi.array().min(1).items(Joi.string()),
  )
})

test('returns no strings when no answers are selected', async () => {
  const noSelectedTags = sectionsOfTags.map((section) => ({
    ...section,
    tags: section.tags.map((tag) => ({ ...tag, selected: false })),
  }))

  const questions = generateInquirerQuestions(noSelectedTags)
  const result = await askQuestions(questions)

  expect(result).toEqual([])
})

test('returns some strings when some answers are selected', async () => {
  const questions = generateInquirerQuestions(sectionsOfTags)
  const result = await askQuestions(questions)

  expect(result).toEqual([
    'added-tag',
    'replaced-tag',
    'selected-tag',
  ])
})

test('returns all strings when all answers are selected', async () => {
  const allSelectedTags = sectionsOfTags.map((section) => ({
    ...section,
    tags: section.tags.map((tag) => ({ ...tag, selected: true })),
  }))

  const questions = generateInquirerQuestions(allSelectedTags)
  const result = await askQuestions(questions)

  const totalTags = sectionsOfTags.reduce((count, section) => count + section.tags.length, 0)
  expect(result).toHaveLength(totalTags)

  expect(result).toEqual([
    'added-tag',
    'unselected-tag',
    'replaced-tag',
    'selected-tag',
    'deleted-tag',
  ])
})
