import { filter, flow, map } from 'lodash/fp'
import { PreparedTag } from '../tags/types'
import { getPreparedTagName } from '../text'
import { InquirerDefaultTag, InquirerSourceTag } from './types'

// Gets the value of all prepared tags that are selected
export const formatDefaultTags = (tags: PreparedTag[]): InquirerDefaultTag[] => flow(
  filter({ selected: true }),
  map('value'),
)(tags)

export const formatSourceTags = (tags: PreparedTag[]): InquirerSourceTag[] => map(
  (tag) => ({
    disabled: false,
    name: getPreparedTagName(tag),
    value: tag.value,
  }),
  tags,
)
