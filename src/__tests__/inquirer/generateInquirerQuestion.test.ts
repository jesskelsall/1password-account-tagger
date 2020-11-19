import Joi from 'joi'
import { generateInquirerQuestion } from '../../inquirer/question'
import { sectionsOfTags } from '../_stubs/sectionsOfTags'

test('returns a checkbox plus inquirer question', async () => {
  expect.assertions(3)

  sectionsOfTags.forEach((sectionOfTags) => {
    const result = generateInquirerQuestion(sectionOfTags)
    const selectedCount = sectionOfTags.tags.filter((tag) => tag.selected).length

    expect(result).toMatchJoiSchema(
      Joi.object().keys({
        default: Joi.array().required().items(Joi.string()).length(selectedCount),
        highlight: Joi.boolean().required().valid(false),
        message: Joi.string().required().valid(sectionOfTags.name),
        name: Joi.string().required().valid(sectionOfTags.value),
        pageSize: Joi.number().required().valid(sectionOfTags.tags.length),
        searchable: Joi.boolean().required().valid(true),
        source: Joi.function().required(),
        type: Joi.string().required().valid('checkbox-plus'),
      }),
    )
  })
})
