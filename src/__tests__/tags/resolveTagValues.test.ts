import Joi from 'joi'
import { flow, forEach, zip } from 'lodash/fp'
import { resolveTagValues } from '../../tags/prepare'
import { ResolvedTag } from '../../tags/types'
import { tags as allTags } from '../_stubs/tags'

const resolvedTagSchema = ({
  name,
  value,
}: {
  name: string,
  value: string,
}) => Joi.object().keys({
  mandatory: Joi.boolean().required(),
  name,
  replaces: Joi.array().optional().items(Joi.function()),
  value,
})

const testEachTag = (tags: ResolvedTag[], schemata: Joi.ObjectSchema[]) => flow(
  zip(tags),
  forEach(([tag, schema]) => {
    if (tag && schema) expect(tag).toMatchJoiSchema(schema)
  }),
)(schemata)

test('resolveTagValues returns tags with string values without changes', async () => {
  expect.assertions(2)

  const resolvedTags = resolveTagValues([allTags[0]])

  expect(resolvedTags[0]).toEqual(allTags[0])

  testEachTag(resolvedTags, [
    resolvedTagSchema({ name: 'Tag', value: 'tag' }),
  ])
})

test('resolveTagValues returns tags with function values with function return strings', async () => {
  expect.assertions(1)

  const resolvedTags = resolveTagValues([allTags[2]])

  testEachTag(resolvedTags, [
    resolvedTagSchema({ name: 'Computed Value Tag', value: 'computed-value-tag' }),
  ])
})

test('resolveTagValues handles a mix of both string and function values', async () => {
  expect.assertions(4)

  const resolvedTags = resolveTagValues(allTags)

  testEachTag(resolvedTags, [
    resolvedTagSchema({ name: 'Tag', value: 'tag' }),
    resolvedTagSchema({ name: 'Mandatory Tag', value: 'mandatory-tag' }),
    resolvedTagSchema({ name: 'Computed Value Tag', value: 'computed-value-tag' }),
    resolvedTagSchema({ name: 'Replacement Tag', value: 'replacement-tag' }),
  ])
})
