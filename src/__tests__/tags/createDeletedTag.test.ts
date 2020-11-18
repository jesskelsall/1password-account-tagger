import Joi from 'joi'
import { OnePasswordTag } from '../../clipboard'
import { createDeletedTag } from '../../tags/modify'

test('returns a PreparedTag', async () => {
  const result = createDeletedTag('preparedTag')

  expect(result).toMatchJoiSchema(
    Joi.object().keys({
      mandatory: Joi.boolean().required().valid(false),
      name: Joi.string().required(),
      selected: Joi.boolean().required().valid(false),
      update: Joi.object().required().keys({
        action: Joi.string().required().valid('delete'),
      }),
      value: Joi.string().required(),
    }),
  )
})

test('returns a tag named after the OnePasswordTag', async () => {
  const deletedTagSchema = (value: OnePasswordTag) => Joi.object().keys({
    name: value,
    value,
  }).unknown()

  const firstResult = createDeletedTag('first')
  expect(firstResult).toMatchJoiSchema(deletedTagSchema('first'))

  const secondResult = createDeletedTag('second')
  expect(secondResult).toMatchJoiSchema(deletedTagSchema('second'))
})
