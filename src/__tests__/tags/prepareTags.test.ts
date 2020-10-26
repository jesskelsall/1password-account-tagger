import * as Joi from 'joi'
import {
  flow,
  forEach,
  isFunction,
  reject,
  zip,
} from 'lodash/fp'
import { prepareTags } from '../../tags/prepare'
import { PreparedTag, Tag } from '../../tags/schema'
import { tags as allTags } from '../_stubs/tags'

const deletedTagSchema = ({ value }: { value: string }) => Joi.object().keys({
  mandatory: Joi.boolean().required().valid(false),
  name: Joi.string().required(),
  selected: Joi.boolean().required().valid(false),
  update: Joi.object().required().keys({
    action: Joi.string().required().valid('delete'),
  }),
  value,
})

const replacedTagSchema = ({
  oldValue,
  value,
}: {
  oldValue: string,
  value: string,
}) => Joi.object().keys({
  mandatory: Joi.boolean().required(),
  name: Joi.string().required(),
  replaces: Joi.array().required().items(Joi.function()),
  selected: Joi.boolean().required().valid(true),
  update: Joi.object().required().keys({
    action: Joi.string().required().valid('replace'),
    oldValue,
  }),
  value,
})

const selectedTagSchema = ({ value }: { value: string }) => Joi.object().keys({
  mandatory: Joi.boolean().required(),
  name: Joi.string().required(),
  selected: Joi.boolean().required().valid(true),
  value,
})

const unmodifiedTagSchema = ({ value }: { value: string }) => Joi.object().keys({
  mandatory: Joi.boolean().required(),
  name: Joi.string().required(),
  replaces: Joi.array().optional().items(Joi.function()),
  selected: Joi.boolean().required().valid(false),
  value,
})

const testEachTag = (tags: PreparedTag[], schemata: Joi.ObjectSchema[]) => flow(
  zip(tags),
  forEach(([tag, schema]) => {
    if (tag && schema) expect(tag).toMatchJoiSchema(schema)
  }),
)(schemata)

const tags = reject((tag: Tag) => isFunction(tag.value), allTags)

test('prepareTags returns an array of PreparedTags', async () => {
  expect.assertions(3)

  const result = prepareTags(tags, [])

  testEachTag(result, [
    unmodifiedTagSchema({ value: 'tag' }),
    unmodifiedTagSchema({ value: 'mandatory-tag' }),
    unmodifiedTagSchema({ value: 'replacement-tag' }),
  ])
})

test('prepareTags returns a replaced PreparedTag when a OnePasswordTag matches a ReplacementMatcher', async () => {
  expect.assertions(3)

  const result = prepareTags(tags, ['rt-tag'])

  testEachTag(result, [
    unmodifiedTagSchema({ value: 'tag' }),
    unmodifiedTagSchema({ value: 'mandatory-tag' }),
    replacedTagSchema({ oldValue: 'rt-tag', value: 'replacement-tag' }),
  ])
})

test('prepareTags returns a selected PreparedTag when a OnePasswordTag matches a value', async () => {
  expect.assertions(3)

  const result = prepareTags(tags, ['tag'])

  testEachTag(result, [
    selectedTagSchema({ value: 'tag' }),
    unmodifiedTagSchema({ value: 'mandatory-tag' }),
    unmodifiedTagSchema({ value: 'replacement-tag' }),
  ])
})

test('prepareTags returns a deleted PreparedTag when a OnePasswordTag does not match any tag', async () => {
  expect.assertions(4)

  const result = prepareTags(tags, ['other'])

  testEachTag(result, [
    unmodifiedTagSchema({ value: 'tag' }),
    unmodifiedTagSchema({ value: 'mandatory-tag' }),
    unmodifiedTagSchema({ value: 'replacement-tag' }),
    deletedTagSchema({ value: 'other' }),
  ])
})

test('prepareTags returns a mix of all PreparedTag types', async () => {
  expect.assertions(4)

  const result = prepareTags(tags, [
    'other',
    'replacement',
    'tag',
  ])

  testEachTag(result, [
    selectedTagSchema({ value: 'tag' }),
    unmodifiedTagSchema({ value: 'mandatory-tag' }),
    replacedTagSchema({ oldValue: 'replacement', value: 'replacement-tag' }),
    deletedTagSchema({ value: 'other' }),
  ])
})

test('prepareTags prioritises replacements over selections', async () => {
  expect.assertions(3)

  const result = prepareTags(tags, ['replacement', 'replacement-tag'])

  testEachTag(result, [
    unmodifiedTagSchema({ value: 'tag' }),
    unmodifiedTagSchema({ value: 'mandatory-tag' }),
    replacedTagSchema({ oldValue: 'replacement', value: 'replacement-tag' }),
  ])
})
