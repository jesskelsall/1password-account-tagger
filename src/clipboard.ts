import { read, write } from 'clipboardy'
import {
  flow, identity, join, sortBy, split, uniq,
} from 'lodash/fp'
import { ONE_PASSWORD_TAG_SEPARATOR } from './consts'

export type OnePasswordTag = string

export const readFromClipboard = async (): Promise<OnePasswordTag[]> => {
  const clipboardText = await read()
  if (!clipboardText) return []

  return flow(
    split(ONE_PASSWORD_TAG_SEPARATOR),
    sortBy(identity),
    uniq,
  )(clipboardText)
}

export const writeToClipboard = async (tags: OnePasswordTag[]): Promise<void> => {
  const clipboardText = flow(
    uniq,
    sortBy(identity),
    join(ONE_PASSWORD_TAG_SEPARATOR),
  )(tags)

  await write(clipboardText)
}
