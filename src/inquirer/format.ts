import { PreparedTag } from '../tags/types'
import { getPreparedTagName } from '../text'
import { InquirerDefaultTag, InquirerSourceTag } from './types'

// Gets the value of all prepared tags that are selected
export const formatDefaultTags = (tags: PreparedTag[]): InquirerDefaultTag[] => tags
  .filter((tag) => tag.selected)
  .map((tag) => tag.value)

export const formatSourceTags = (tags: PreparedTag[]): InquirerSourceTag[] => tags.map(
  (tag) => ({
    disabled: false,
    name: getPreparedTagName(tag),
    value: tag.value,
  }),
)
