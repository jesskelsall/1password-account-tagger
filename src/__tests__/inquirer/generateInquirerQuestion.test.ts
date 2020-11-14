import Joi from 'joi'
import { generateInquirerQuestion } from '../../inquirer/question'
import { preparedTags } from '../_stubs/preparedTags'

test('generateInquirerQuestion returns a checkbox plus inquirer question', async () => {
  const result = generateInquirerQuestion(preparedTags)
  const selectedCount = preparedTags.filter((tag) => tag.selected).length

  expect(result).toMatchJoiSchema(
    Joi.object().keys({
      default: Joi.array().required().items(Joi.string()).length(selectedCount),
      highlight: Joi.boolean().required().valid(false),
      message: Joi.string().required(),
      name: Joi.string().required(),
      pageSize: Joi.number().required().valid(preparedTags.length),
      searchable: Joi.boolean().required().valid(true),
      source: Joi.function().required(),
      type: Joi.string().required().valid('checkbox-plus'),
    }),
  )
})
