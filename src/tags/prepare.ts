import {
  concat,
  cond,
  constant,
  find,
  flow,
  get,
  identity,
  includes,
  isEqual,
  isFunction,
  map,
  reject,
  set,
  some,
  update,
  __,
} from 'lodash/fp'
import { OnePasswordTag } from '../clipboard'
import { createDeletedTag, replaceTag, selectTag } from './modify'
import { PreparedTag, Tag } from './schema'

// Runs any Tag value functions so that all Tags have string values
export const resolveTagValues = (tags: Tag[]): Tag[] => map(update('value', cond([
  [isFunction, (valueFunc) => valueFunc()], [constant(true), identity],
])), tags)

export const prepareTags = (tags: Tag[], tagStrings: OnePasswordTag[]): PreparedTag[] => {
  const selectedAndReplacedTags: PreparedTag[] = map((tag) => {
    // Replaced - test if any of the ReplacementMatchers match any of the OnePasswordTags

    const replacedTagString: OnePasswordTag | undefined = tag.replaces
      ? find((tagString) => some((replacement) => replacement(tagString), tag.replaces), tagStrings)
      : undefined
    if (replacedTagString) return replaceTag(replacedTagString, tag)

    // Selected - check if any of the OnePasswordTags match the tag value
    const identicalTagString = some(isEqual(tag.value), tagStrings)
    if (identicalTagString) return selectTag(tag)

    // Neither - convert to PreparedTag
    return set('selected', false, tag) as PreparedTag
  }, tags)

  // Deleted - create a new deleted PreparedTag for each remaining OnePasswordTag

  const remainingTagStrings = reject(
    (tagString) => some(
      (tag) => flow(
        map(get(__, tag)),
        includes(tagString),
      )(['value', 'update.oldValue']),
      selectedAndReplacedTags,
    ),
    tagStrings,
  )

  return concat(selectedAndReplacedTags, map(createDeletedTag, remainingTagStrings))
}
