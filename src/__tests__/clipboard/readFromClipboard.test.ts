import { readFromClipboard } from '../../clipboard'

jest.mock('clipboardy')

test('returns an array of strings', async () => {
  const result = await readFromClipboard()

  expect(result).toEqual(['tag'])
})

test('returns an empty array when the clipboard is empty', async () => {
  const result = await readFromClipboard()

  expect(result).toEqual([])
})

test('separates tags by the comma delimiter', async () => {
  const result = await readFromClipboard()

  expect(result).toEqual(['first tag', 'second tag'])
})

test('orders tags alphabetically', async () => {
  const result = await readFromClipboard()

  expect(result).toEqual([
    'alpha',
    'beta',
    'gamma',
  ])
})

test('removes duplicate tags', async () => {
  const result = await readFromClipboard()

  expect(result).toEqual([
    'alpha',
    'beta',
    'gamma',
  ])
})
