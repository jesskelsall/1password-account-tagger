import * as Joi from 'joi'
import { forEach } from 'lodash/fp'
import { selectTag } from '../../tags/modify'
import { tags } from '../_stubs/tags'

test('selectTag returns a PreparedTag', async () => {
  expect.assertions(4)

  const selectedTagSchema = Joi.object().keys({
    mandatory: Joi.boolean().required(),
    name: Joi.string().required(),
    replaces: Joi.array().optional().items(Joi.function()),
    selected: Joi.boolean().required().valid(true),
    value: Joi.alternatives().required().try(
      Joi.string(),
      Joi.function(),
    ),
  })

  forEach((tag) => {
    const result = selectTag(tag)
    expect(result).toMatchJoiSchema(selectedTagSchema)
  }, tags)
})
