import { writeToClipboard } from '../../clipboard'
import { write } from '../../__mocks__/clipboardy'

jest.mock('clipboardy')

test('writeToClipboard writes a string of tags to the clipboard', async () => {
  await writeToClipboard(['tag'])

  expect(write).toHaveBeenLastCalledWith('tag')
})

test('writeToClipboard writes an empty string if there are no tags', async () => {
  await writeToClipboard([])

  expect(write).toHaveBeenLastCalledWith('')
})

test('writeToClipboard separates tags by the comma delimiter', async () => {
  await writeToClipboard(['first tag', 'second tag'])

  expect(write).toHaveBeenLastCalledWith('first tag,second tag')
})

test('writeToClipboard orders tags alphabetically', async () => {
  await writeToClipboard([
    'alpha',
    'gamma',
    'beta',
  ])

  expect(write).toHaveBeenLastCalledWith('alpha,beta,gamma')
})

test('writeToClipboard removes duplicate tags', async () => {
  await writeToClipboard([
    'alpha',
    'gamma',
    'beta',
    'gamma',
  ])

  expect(write).toHaveBeenLastCalledWith('alpha,beta,gamma')
})
