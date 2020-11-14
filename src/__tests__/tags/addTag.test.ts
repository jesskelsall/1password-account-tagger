import Joi from 'joi'
import { forEach } from 'lodash/fp'
import { addTag } from '../../tags/modify'
import { resolvedTags } from '../_stubs/tags'

test('addTag returns a PreparedTag', async () => {
  expect.assertions(4)

  const addedTagSchema = Joi.object().keys({
    mandatory: Joi.boolean().required(),
    name: Joi.string().required(),
    replaces: Joi.array().optional().items(Joi.function()),
    selected: Joi.boolean().required().valid(true),
    update: Joi.object().required().keys({
      action: Joi.string().required().valid('add'),
    }),
    value: Joi.string().required(),
  })

  forEach((tag) => {
    const result = addTag(tag)
    expect(result).toMatchJoiSchema(addedTagSchema)
  }, resolvedTags)
})
