import Joi from 'joi'
import { generateInquirerQuestions } from '../../inquirer/question'
import { sectionsOfTags } from '../_stubs/sectionsOfTags'

test('returns an array of checkbox plus inquirer questions', async () => {
  const result = generateInquirerQuestions(sectionsOfTags)

  expect(result).toMatchJoiSchema(
    Joi.array().length(3).items(
      Joi.object().keys({
        default: Joi.array().required().items(Joi.string()),
        highlight: Joi.boolean().required().valid(false),
        message: Joi.string().required(),
        name: Joi.string().required(),
        pageSize: Joi.number().required().min(1),
        searchable: Joi.boolean().required().valid(true),
        source: Joi.function().required(),
        type: Joi.string().required().valid('checkbox-plus'),
      }),
    ),
  )
})
