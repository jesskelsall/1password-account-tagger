import Joi from 'joi'
import { replaceTag } from '../../tags/modify'
import { resolvedTags } from '../_stubs/tags'

test('returns a PreparedTag', async () => {
  expect.assertions(4)

  const updatedTagSchema = Joi.object().keys({
    mandatory: Joi.boolean().required(),
    name: Joi.string().required(),
    replaces: Joi.array().optional().items(Joi.function()),
    section: Joi.string().optional(),
    selected: Joi.boolean().required().valid(true),
    update: Joi.object().required().keys({
      action: Joi.string().required().valid('replace'),
      oldValue: Joi.string().required(),
    }),
    value: Joi.string().required(),
  })

  resolvedTags.forEach((tag) => {
    const result = replaceTag('old-value', tag)
    expect(result).toMatchJoiSchema(updatedTagSchema)
  })
})

test('returns a tag containing the OnePasswordTag', async () => {
  expect.assertions(4)

  const oldValue = 'old-value'

  const updatedTagSchema = Joi.object().keys({
    name: Joi.string().invalid(oldValue),
    update: Joi.object().required().keys({
      oldValue: Joi.string().required().valid(oldValue),
    }).unknown(),
    value: Joi.string().required().invalid(oldValue),
  }).unknown()

  resolvedTags.forEach((tag) => {
    const result = replaceTag(oldValue, tag)
    expect(result).toMatchJoiSchema(updatedTagSchema)
  })
})
