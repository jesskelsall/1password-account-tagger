import { filter, flow, map } from 'lodash/fp'
import { PreparedTag } from '../tags/schema'
import { InquirerDefaultTag, InquirerSourceTag } from './schema'
import { getPreparedTagName } from '../text'

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
