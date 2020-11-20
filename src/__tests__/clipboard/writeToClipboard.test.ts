import { writeToClipboard } from '../../clipboard'
import { write } from '../../__mocks__/clipboardy'

jest.mock('clipboardy')
jest.spyOn(console, 'info').mockImplementation()

test('writes a string of tags to the clipboard', async () => {
  await writeToClipboard(['tag'])

  expect(write).toHaveBeenLastCalledWith('tag')
})

test('writes an empty string if there are no tags', async () => {
  await writeToClipboard([])

  expect(write).toHaveBeenLastCalledWith('')
})

test('separates tags by the comma delimiter', async () => {
  await writeToClipboard(['first tag', 'second tag'])

  expect(write).toHaveBeenLastCalledWith('first tag,second tag')
})

test('orders tags alphabetically', async () => {
  await writeToClipboard([
    'alpha',
    'gamma',
    'beta',
  ])

  expect(write).toHaveBeenLastCalledWith('alpha,beta,gamma')
})

test('removes duplicate tags', async () => {
  await writeToClipboard([
    'alpha',
    'gamma',
    'beta',
    'gamma',
  ])

  expect(write).toHaveBeenLastCalledWith('alpha,beta,gamma')
})
