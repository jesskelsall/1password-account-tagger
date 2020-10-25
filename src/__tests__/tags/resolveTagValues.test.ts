import * as Joi from 'joi'
import { resolveTagValues } from '../../tags/prepare'
import { tags } from '../_stubs/tags'

interface ResolvedTagSchemaProperties {
  name: string,
  value: string,
}

const resolvedTagSchema = (properties: ResolvedTagSchemaProperties) => Joi.object().keys({
  mandatory: Joi.boolean().required(),
  name: properties.name,
  replaces: Joi.array().optional().items(Joi.function()),
  value: properties.value,
})

test('resolveTagValues returns tags with string values without changes', async () => {
  expect.assertions(2)

  const [tag] = resolveTagValues([tags[0]])

  expect(tag).toEqual(tags[0])
  expect(tag).toMatchJoiSchema(resolvedTagSchema({
    name: 'Tag',
    value: 'tag',
  }))
})

test('resolveTagValues returns tags with function values with function return strings', async () => {
  expect.assertions(1)

  const [computedValueTag] = resolveTagValues([tags[2]])

  expect(computedValueTag).toMatchJoiSchema(resolvedTagSchema({
    name: 'Computed Value Tag',
    value: 'computed-value-tag',
  }))
})

test('resolveTagValues handles a mix of both string and function values', async () => {
  expect.assertions(4)

  const [
    tag,
    mandatoryTag,
    computedValueTag,
    replacementTag,
  ] = resolveTagValues(tags)

  expect(tag).toMatchJoiSchema(resolvedTagSchema({
    name: 'Tag',
    value: 'tag',
  }))
  expect(mandatoryTag).toMatchJoiSchema(resolvedTagSchema({
    name: 'Mandatory Tag',
    value: 'mandatory-tag',
  }))
  expect(computedValueTag).toMatchJoiSchema(resolvedTagSchema({
    name: 'Computed Value Tag',
    value: 'computed-value-tag',
  }))
  expect(replacementTag).toMatchJoiSchema(resolvedTagSchema({
    name: 'Replacement Tag',
    value: 'replacement-tag',
  }))
})
