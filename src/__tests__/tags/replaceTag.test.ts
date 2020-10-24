import * as Joi from 'joi'
import { forEach } from 'lodash/fp'
import { replaceTag } from '../../tags/modify'
import { tags } from '../_stubs/tags'

test('replaceTag returns a PreparedTag', async () => {
  expect.assertions(4)

  const updatedTagSchema = Joi.object().keys({
    mandatory: Joi.boolean().required(),
    name: Joi.string().required(),
    replaces: Joi.array().optional().items(Joi.function()),
    selected: Joi.boolean().required().valid(true),
    update: Joi.object().required().keys({
      action: Joi.string().required().valid('replace'),
      oldValue: Joi.string().required(),
    }),
    value: Joi.alternatives().required().try(
      Joi.string(),
      Joi.function(),
    ),
  })

  forEach((tag) => {
    const result = replaceTag('old-value', tag)
    expect(result).toMatchJoiSchema(updatedTagSchema)
  }, tags)
})

test('replaceTag returns a tag containing the OnePasswordTag', async () => {
  expect.assertions(4)

  const oldValue = 'old-value'

  const updatedTagSchema = Joi.object().keys({
    name: Joi.string().invalid(oldValue),
    update: Joi.object().required().keys({
      oldValue: Joi.string().required().valid(oldValue),
    }).unknown(),
    value: Joi.alternatives().required().try(
      Joi.string().invalid(oldValue),
      Joi.function(),
    ),
  }).unknown()

  forEach((tag) => {
    const result = replaceTag(oldValue, tag)
    expect(result).toMatchJoiSchema(updatedTagSchema)
  }, tags)
})
