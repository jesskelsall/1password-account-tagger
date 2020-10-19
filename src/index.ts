import { readFromClipboard, writeToClipboard } from './clipboard'

const test = async (): Promise<void> => {
  const tags = await readFromClipboard()
  console.info(tags)
  await writeToClipboard(tags)
}

test()
