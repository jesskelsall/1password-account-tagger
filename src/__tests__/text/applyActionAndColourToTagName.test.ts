import ansiStyles from 'ansi-styles'
import { green, red, yellow } from 'chalk'
import stripAnsi from 'strip-ansi'
import { applyActionAndColourToTagName } from '../../text'

test('appends the action string to the name', async () => {
  expect.assertions(3)

  const name = 'Email Address'
  const curriedApplyAction = applyActionAndColourToTagName(name)

  const testText = (actionString: string, expectedString: string): void => {
    expect(stripAnsi(actionString)).toBe(expectedString)
  }

  testText(curriedApplyAction('deleted', red), 'Email Address [deleted]')
  testText(curriedApplyAction('mandatory', green), 'Email Address [mandatory]')
  testText(curriedApplyAction('was email', yellow), 'Email Address [was email]')
})

test('colours the entire final name', async () => {
  expect.assertions(6)

  const name = 'Mobile'
  const curriedApplyAction = applyActionAndColourToTagName(name)

  const testColour = (actionString: string, colour: ansiStyles.CSPair): void => {
    expect(actionString.startsWith(colour.open)).toBeTruthy()
    expect(actionString.endsWith(colour.close)).toBeTruthy()
  }

  testColour(curriedApplyAction('mandatory', green), ansiStyles.green)
  testColour(curriedApplyAction('deleted', red), ansiStyles.red)
  testColour(curriedApplyAction('was mobile', yellow), ansiStyles.yellow)
})
