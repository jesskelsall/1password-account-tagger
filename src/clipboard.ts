import { read, write } from 'clipboardy'
import {
  flow, identity, join, sortBy, split, uniq,
} from 'lodash/fp'
import { ONE_PASSWORD_TAG_SEPARATOR } from './consts'

type OnePasswordTag = string
type OnePasswordTags = OnePasswordTag[]

export const copyFromClipboard = async (): Promise<OnePasswordTags> => {
  const clipboardText = await read()
  if (!clipboardText) return []

  return flow(
    split(ONE_PASSWORD_TAG_SEPARATOR),
    sortBy(identity),
    uniq,
  )(clipboardText)
}

export const pasteToClipboard = async (tags: OnePasswordTags): Promise<void> => {
  const clipboardText = flow(
    uniq,
    sortBy(identity),
    join(ONE_PASSWORD_TAG_SEPARATOR),
  )(tags)

  await write(clipboardText)
}
