import { OnePasswordTag } from '../clipboard'

export type ReplacementMatcher = (tag: OnePasswordTag) => boolean
export type VariableTagValue = () => string

// A tag as it is declared by the user in schema.ts
export interface Tag {
  mandatory: boolean,
  name: string,
  replaces?: ReplacementMatcher[],
  value: string | VariableTagValue,
}

export interface ResolvedTag extends Tag {
  value: string,
}

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
