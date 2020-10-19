import { readFromClipboard } from '../clipboard'

jest.mock('clipboardy')

test('readFromClipboard returns an array of strings', async () => {
  const result = await readFromClipboard()
  expect(result).toEqual(['tag'])
})

test('readFromClipboard returns an empty array when the clipboard is empty', async () => {
  const result = await readFromClipboard()
  expect(result).toEqual([])
})

test('readFromClipboard separates tags by the comma delimiter', async () => {
  const result = await readFromClipboard()
  expect(result).toEqual(['first tag', 'second tag'])
})

test('readFromClipboard orders tags alphabetically', async () => {
  const result = await readFromClipboard()
  expect(result).toEqual([
    'alpha',
    'beta',
    'gamma',
  ])
})

test('readFromClipboard removes duplicate tags', async () => {
  const result = await readFromClipboard()
  expect(result).toEqual([
    'alpha',
    'beta',
    'gamma',
  ])
})
