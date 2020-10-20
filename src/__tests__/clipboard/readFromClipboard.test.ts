import { readFromClipboard } from '../../clipboard'

jest.mock('clipboardy')

test('readFromClipboard returns an array of strings', async () => {
  expect.assertions(1)

  const result = await readFromClipboard()
  expect(result).toEqual(['tag'])
})

test('readFromClipboard returns an empty array when the clipboard is empty', async () => {
  expect.assertions(1)

  const result = await readFromClipboard()
  expect(result).toEqual([])
})

test('readFromClipboard separates tags by the comma delimiter', async () => {
  expect.assertions(1)

  const result = await readFromClipboard()
  expect(result).toEqual(['first tag', 'second tag'])
})

test('readFromClipboard orders tags alphabetically', async () => {
  expect.assertions(1)

  const result = await readFromClipboard()
  expect(result).toEqual([
    'alpha',
    'beta',
    'gamma',
  ])
})

test('readFromClipboard removes duplicate tags', async () => {
  expect.assertions(1)

  const result = await readFromClipboard()
  expect(result).toEqual([
    'alpha',
    'beta',
    'gamma',
  ])
})
