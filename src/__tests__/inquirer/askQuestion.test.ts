import * as Joi from 'joi'
import { askQuestion, generateInquirerQuestion } from '../../inquirer/question'
import { preparedTags } from '../_stubs/preparedTags'

jest.mock('inquirer')

test('askQuestion returns an array of strings', async () => {
  const question = generateInquirerQuestion(preparedTags)
  const result = await askQuestion(question)

  expect(result).toMatchJoiSchema(
    Joi.array().min(1).items(Joi.string()),
  )
})

test('askQuestion returns no strings when no answers are selected', async () => {
  const noSelectedTags = preparedTags.map((tag) => ({ ...tag, selected: false }))
  const question = generateInquirerQuestion(noSelectedTags)
  const result = await askQuestion(question)

  expect(result).toEqual([])
})

test('askQuestion returns some strings when some answers are selected', async () => {
  const question = generateInquirerQuestion(preparedTags)
  const result = await askQuestion(question)

  expect(result).toEqual([
    'selected-tag',
    'added-tag',
    'replaced-tag',
  ])
})

test('askQuestion returns all strings when all answers are selected', async () => {
  const allSelectedTags = preparedTags.map((tag) => ({ ...tag, selected: true }))
  const question = generateInquirerQuestion(allSelectedTags)
  const result = await askQuestion(question)

  expect(result).toHaveLength(preparedTags.length)
  expect(result).toEqual([
    'unselected-tag',
    'selected-tag',
    'added-tag',
    'replaced-tag',
    'deleted-tag',
  ])
})
