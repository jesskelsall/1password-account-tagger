import { startsWith, isEqual } from 'lodash/fp'
import { tagSchema, Tag } from '../../tags'

test('tagSchema matches Tag objects with a value property string', async () => {
  expect.assertions(1)

  const tag: Tag = {
    mandatory: false,
    name: 'withValueString',
    value: 'withValueString',
  }

  expect(tag).toMatchJoiSchema(tagSchema)
})

test('tagSchema matches Tag objects with a value property function', async () => {
  expect.assertions(1)

  const tag: Tag = {
    mandatory: false,
    name: 'withValueFunction',
    value: () => 'withValueFunction',
  }

  expect(tag).toMatchJoiSchema(tagSchema)
})

test('tagSchema matches Tag objects with a replaces property array', async () => {
  expect.assertions(1)

  const tag: Tag = {
    mandatory: true,
    name: 'withReplacesArray',
    replaces: [
      isEqual('withReplacesArray'),
      startsWith('with'),
      (string) => string.split('-').length > 1,
    ],
    value: 'withReplacesArray',
  }

  expect(tag).toMatchJoiSchema(tagSchema)
})
