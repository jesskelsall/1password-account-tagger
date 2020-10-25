import {
  cond, constant, identity, isFunction, map, update,
} from 'lodash/fp'
import { Tag } from './schema'

// Runs any Tag value functions so that all Tags have string values
export const resolveTagValues = (tags: Tag[]): Tag[] => map(update('value', cond([
  [isFunction, (valueFunc) => valueFunc()], [constant(true), identity],
])), tags)

export const prepareTags = curry(())

// selected - find(includes(__, tagStrings))
// replaced - find(some(func))

/**
 * TODO
 * processTags turns the list of OnePasswordTags into PreparedTags
 *
 * Go through each defined tag
 * Check for an exact value match -> selected
 * Check if one of the ReplacementMatchers returns true -> replace
 *
 * Filter the OnePasswordTags to just those that don't match value/replaces.oldValue
 * Add new deleted tags for each
 *
 * Double check there's no other funky logic in account-tagger v2
 */
