import * as Joi from 'joi'
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

// The clipboard tag does not match a Tag or ReplacementMatcher
export interface TagDeleteUpdate {
  action: 'delete',
}

// The clipboard tag matches a ReplacementMatcher
export interface TagReplaceUpdate {
  action: 'replace',
  oldValue: OnePasswordTag,
}

// Tags once they have had OnePasswordTags applied to them
export interface PreparedTag extends Tag {
  selected: boolean,
  update?: TagDeleteUpdate | TagReplaceUpdate
}

// Used to verify that a Tag declared by the user in schema.ts matches the interface
export const tagSchema = Joi.object().keys({
  mandatory: Joi.boolean().required(),
  name: Joi.string().required(),
  replaces: Joi.array().optional().items(Joi.function()),
  value: Joi.alternatives().required().try(
    Joi.string(),
    Joi.function(),
  ),
})
