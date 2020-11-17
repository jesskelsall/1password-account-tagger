import { isFunction } from 'lodash/fp'
import { OnePasswordTag } from '../clipboard'
import { Options } from '../options/types'

// Tags

export type ReplacementMatcher = (tag: OnePasswordTag) => boolean

// A tag literal with fixed values
export interface ResolvedTag {
  mandatory: boolean,
  name: string,
  replaces?: ReplacementMatcher[],
  section?: string,
  value: string,
}

// A function that is executed to return a tag literal
export type VariableTag = (options: Options) => ResolvedTag

// A tag as defined by the user
// It can be a tag literal or a function that returns one
export type Tag = ResolvedTag | VariableTag

// Type guard
export const isVariableTag = (tag: Tag): tag is VariableTag => isFunction(tag)

// The tag is mandatory but did not match a clipboard tag
export interface TagUpdateAdd {
  action: 'add',
}

// The clipboard tag does not match a Tag or ReplacementMatcher
export interface TagUpdateDelete {
  action: 'delete',
}

// The clipboard tag matches a ReplacementMatcher
export interface TagUpdateReplace {
  action: 'replace',
  oldValue: OnePasswordTag,
}

// Tags once they have had OnePasswordTags applied to them
export interface PreparedTag extends ResolvedTag {
  selected: boolean,
  update?: TagUpdateAdd | TagUpdateDelete | TagUpdateReplace
}
