import ansiStyles from 'ansi-styles'
import stripAnsi from 'strip-ansi'
import { getPreparedTagName } from '../../text'
import { preparedTags } from '../_stubs/preparedTags'

const testColour = (actionString: string, colour: ansiStyles.CSPair): void => {
  expect(actionString.startsWith(colour.open)).toBeTruthy()
  expect(actionString.endsWith(colour.close)).toBeTruthy()
}

const testText = (actionString: string, expectedString: string): void => {
  expect(stripAnsi(actionString)).toBe(expectedString)
}

test('returns a plain name for an unselected tag', async () => {
  const unselectedTagName = getPreparedTagName(preparedTags[0])

  expect(unselectedTagName).toBe('Unselected Tag')
})

test('returns a plain name for a selected tag', async () => {
  const selectedTagName = getPreparedTagName(preparedTags[1])

  expect(selectedTagName).toBe('Selected Tag')
})

test('returns a green mandatory name for an added tag', async () => {
  expect.assertions(3)

  const addedTagName = getPreparedTagName(preparedTags[2])
  testColour(addedTagName, ansiStyles.green)
  testText(addedTagName, 'Added Tag [mandatory]')
})

test('returns a yellow replaced name for a replaced tag', async () => {
  expect.assertions(3)

  const updatedTagName = getPreparedTagName(preparedTags[3])
  testColour(updatedTagName, ansiStyles.yellow)
  testText(updatedTagName, 'Replaced Tag [was old-tag]')
})

test('returns a red deleted name for a deleted tag', async () => {
  expect.assertions(3)

  const deletedTagName = getPreparedTagName(preparedTags[4])
  testColour(deletedTagName, ansiStyles.red)
  testText(deletedTagName, 'Deleted Tag [deleted]')
})
