import ansiStyles from 'ansi-styles'
import { green, red, yellow } from 'chalk'
import stripAnsi from 'strip-ansi'
import { applyActionAndColourToTagName } from '../../text'

test('appends the action string to the name', async () => {
  expect.assertions(3)

  const name = 'Email Address'

  const testText = (actionString: string, expectedString: string): void => {
    expect(stripAnsi(actionString)).toBe(expectedString)
  }

  testText(applyActionAndColourToTagName(name, 'deleted', red), 'Email Address [deleted]')
  testText(applyActionAndColourToTagName(name, 'mandatory', green), 'Email Address [mandatory]')
  testText(applyActionAndColourToTagName(name, 'was email', yellow), 'Email Address [was email]')
})

test('colours the entire final name', async () => {
  expect.assertions(6)

  const name = 'Mobile'

  const testColour = (actionString: string, colour: ansiStyles.CSPair): void => {
    expect(actionString.startsWith(colour.open)).toBeTruthy()
    expect(actionString.endsWith(colour.close)).toBeTruthy()
  }

  testColour(applyActionAndColourToTagName(name, 'mandatory', green), ansiStyles.green)
  testColour(applyActionAndColourToTagName(name, 'deleted', red), ansiStyles.red)
  testColour(applyActionAndColourToTagName(name, 'was mobile', yellow), ansiStyles.yellow)
})
