import Joi from 'joi'
import { selectTag } from '../../tags/modify'
import { resolvedTags } from '../_stubs/tags'

test('returns a PreparedTag', async () => {
  expect.assertions(4)

  const selectedTagSchema = Joi.object().keys({
    mandatory: Joi.boolean().required(),
    name: Joi.string().required(),
    replaces: Joi.array().optional().items(Joi.function()),
    section: Joi.string().optional(),
    selected: Joi.boolean().required().valid(true),
    value: Joi.string().required(),
  })

  resolvedTags.forEach((tag) => {
    const result = selectTag(tag)
    expect(result).toMatchJoiSchema(selectedTagSchema)
  })
})
