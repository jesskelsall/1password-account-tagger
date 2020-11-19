import { read, write } from 'clipboardy'
import { uniq } from 'lodash/fp'
import { ONE_PASSWORD_TAG_SEPARATOR } from './consts'

export type OnePasswordTag = string

export const readFromClipboard = async (): Promise<OnePasswordTag[]> => {
  const clipboardText = await read()
  if (!clipboardText) return []

  return uniq(clipboardText.split(ONE_PASSWORD_TAG_SEPARATOR).sort())
}

export const writeToClipboard = async (tags: OnePasswordTag[]): Promise<void> => {
  const clipboardText = uniq(tags).sort().join(ONE_PASSWORD_TAG_SEPARATOR)

  await write(clipboardText)
}
