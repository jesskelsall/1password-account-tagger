import * as Joi from 'joi'
import { OnePasswordTag } from '../../clipboard'
import { createDeletedTag } from '../../tags/modify'

test('createDeletedTag returns a PreparedTag', async () => {
  expect.assertions(1)

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

test('createDeletedTag returns a tag named after the OnePasswordTag', async () => {
  expect.assertions(2)

  const deletedTagSchema = (value: OnePasswordTag) => Joi.object().keys({
    name: value,
    value,
  }).unknown()

  const firstResult = createDeletedTag('first')
  expect(firstResult).toMatchJoiSchema(deletedTagSchema('first'))

  const secondResult = createDeletedTag('second')
  expect(secondResult).toMatchJoiSchema(deletedTagSchema('second'))
})
