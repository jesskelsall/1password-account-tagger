import { OnePasswordTag } from '../clipboard'
import { PreparedTag, ResolvedTag } from './types'

// Create a new tag for a OnePasswordTag with no associated Tag
export const createDeletedTag = (value: OnePasswordTag): PreparedTag => ({
  mandatory: false,
  name: value,
  selected: false,
  update: { action: 'delete' },
  value,
})

// Mark a tag as pre-selected
export const selectTag = (tag: ResolvedTag): PreparedTag => ({
  ...tag,
  selected: true,
})

// Mark a tag as pre-selected because it was not otherwise selected but is mandatory
export const addTag = (tag: ResolvedTag): PreparedTag => ({
  ...tag,
  selected: true,
  update: { action: 'add' },
})

// Mark a tag as pre-selected because a OnePasswordTag matched with one of its ReplacementMatchers
export const replaceTag = (oldValue: OnePasswordTag, tag: ResolvedTag): PreparedTag => ({
  ...tag,
  selected: true,
  update: {
    action: 'replace',
    oldValue,
  },
})
