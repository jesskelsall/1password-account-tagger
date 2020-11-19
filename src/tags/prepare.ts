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
  ReplacementMatcher,
  ResolvedTag,
  Tag,
} from './types'

// Type guard
const isReplacementMatchers = (
  replaces: ReplacementMatcher[] | undefined,
): replaces is ReplacementMatcher[] => Boolean(replaces)

// Runs any tag functions so that all tags are object literals
export const resolveTagValues = (
  tags: Tag[],
  options: Options,
): ResolvedTag[] => tags.map((tag) => (isVariableTag(tag) ? tag(options) : tag))

export const prepareTags = (tags: ResolvedTag[], tagStrings: OnePasswordTag[]): PreparedTag[] => {
  const preparedTags: PreparedTag[] = tags.map((tag) => {
    // Replaced - test if any of the ReplacementMatchers match any of the OnePasswordTags

    if (isReplacementMatchers(tag.replaces)) {
      const replacementMatchers = tag.replaces
      const replacedTagString = tagStrings.find(
        (tagString) => replacementMatchers.some((replacement) => replacement(tagString)),
      )
      if (replacedTagString) return replaceTag(replacedTagString, tag)
    }

    // Selected - check if any of the OnePasswordTags match the tag value
    const identicalTagString = tagStrings.some((tagString) => tagString === tag.value)
    if (identicalTagString) return selectTag(tag)

    // Added - check if the tag is mandatory
    if (tag.mandatory) return addTag(tag)

    // Neither - convert to PreparedTag
    return { ...tag, selected: false }
  })

  // Deleted - create a new deleted PreparedTag for each remaining OnePasswordTag

  const remainingTagStrings = tagStrings.filter(
    (tagString) => preparedTags.every((preparedTag) => preparedTag.value !== tagString && (
      !preparedTag.update || preparedTag.update.action !== 'replace' || preparedTag.update.oldValue !== tagString
    )),
  )

  return [
    ...preparedTags,
    ...remainingTagStrings.map(createDeletedTag),
  ]
}
