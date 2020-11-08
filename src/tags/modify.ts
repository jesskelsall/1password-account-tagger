import { flow, set } from 'lodash/fp'
import { OnePasswordTag } from '../clipboard'
import { PreparedTag, Tag } from './schema'

// Create a new tag for a OnePasswordTag with no associated Tag
export const createDeletedTag = (value: OnePasswordTag): PreparedTag => ({
  mandatory: false,
  name: value,
  selected: false,
  update: { action: 'delete' },
  value,
})

// Mark a tag as pre-selected
export const selectTag = (tag: Tag): PreparedTag => set('selected', true, tag) as PreparedTag

export const addTag = (tag: Tag): PreparedTag => flow(
  selectTag,
  set('update', { action: 'add' }),
)(tag) as PreparedTag

// Mark a tag as pre-selected because a OnePasswordTag matched with one of its ReplacementMatchers
export const replaceTag = (oldValue: OnePasswordTag, tag: Tag): PreparedTag => flow(
  selectTag,
  set('update', {
    action: 'replace',
    oldValue,
  }),
)(tag) as PreparedTag
