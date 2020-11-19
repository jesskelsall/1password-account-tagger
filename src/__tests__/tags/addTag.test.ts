import Joi from 'joi'
import { addTag } from '../../tags/modify'
import { resolvedTags } from '../_stubs/tags'

test('returns a PreparedTag', async () => {
  expect.assertions(4)

  const addedTagSchema = Joi.object().keys({
    mandatory: Joi.boolean().required(),
    name: Joi.string().required(),
    replaces: Joi.array().optional().items(Joi.function()),
    section: Joi.string().optional(),
    selected: Joi.boolean().required().valid(true),
    update: Joi.object().required().keys({
      action: Joi.string().required().valid('add'),
    }),
    value: Joi.string().required(),
  })

  resolvedTags.forEach((tag) => {
    const result = addTag(tag)
    expect(result).toMatchJoiSchema(addedTagSchema)
  })
})
