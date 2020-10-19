import { copyFromClipboard, pasteToClipboard } from './clipboard'

const test = async (): Promise<void> => {
  const tags = await copyFromClipboard()
  console.info(tags)
  await pasteToClipboard(tags)
}

test()
