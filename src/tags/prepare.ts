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
  some,
  update,
  __,
} from 'lodash/fp'
import { OnePasswordTag } from '../clipboard'
import {
  addTag,
  createDeletedTag,
  replaceTag,
  selectTag,
} from './modify'
import { PreparedTag, Tag } from './schema'

// Runs any Tag value functions so that all Tags have string values
export const resolveTagValues = (tags: Tag[]): Tag[] => map(update('value', cond([
  [isFunction, (valueFunc) => valueFunc()], [constant(true), identity],
])), tags)

export const prepareTags = (tags: Tag[], tagStrings: OnePasswordTag[]): PreparedTag[] => {
  const preparedTags: PreparedTag[] = map((tag) => {
    // Replaced - test if any of the ReplacementMatchers match any of the OnePasswordTags

    const replacedTagString: OnePasswordTag | undefined = tag.replaces
      ? find((tagString) => some((replacement) => replacement(tagString), tag.replaces), tagStrings)
      : undefined
    if (replacedTagString) return replaceTag(replacedTagString, tag)

    // Selected - check if any of the OnePasswordTags match the tag value
    const identicalTagString = some(isEqual(tag.value), tagStrings)
    if (identicalTagString) return selectTag(tag)

    // Added - check if the tag is mandatory
    if (tag.mandatory) return addTag(tag)

    // Neither - convert to PreparedTag
    return { ...tag, selected: false }
  }, tags)

  // Deleted - create a new deleted PreparedTag for each remaining OnePasswordTag

  const remainingTagStrings = reject(
    (tagString) => some(
      (tag) => flow(
        map(get(__, tag)),
        includes(tagString),
      )(['value', 'update.oldValue']),
      preparedTags,
    ),
    tagStrings,
  )

  return concat(preparedTags, map(createDeletedTag, remainingTagStrings))
}
