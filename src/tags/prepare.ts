import {
  concat,
  find,
  flow,
  get,
  includes,
  isEqual,
  map,
  reject,
  some,
  __,
} from 'lodash/fp'
import { OnePasswordTag } from '../clipboard'
import { Options } from '../options/types'
import {
  addTag,
  createDeletedTag,
  replaceTag,
  selectTag,
} from './modify'
import {
  isVariableTag,
  PreparedTag,
  ResolvedTag,
  Tag,
} from './types'

// Runs any tag functions so that all tags are object literals
export const resolveTagValues = (
  tags: Tag[],
  options: Options,
): ResolvedTag[] => tags.map((tag) => (isVariableTag(tag) ? tag(options) : tag))

export const prepareTags = (tags: ResolvedTag[], tagStrings: OnePasswordTag[]): PreparedTag[] => {
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
