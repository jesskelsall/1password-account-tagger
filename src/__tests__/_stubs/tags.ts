import { isEqual, startsWith } from 'lodash/fp'
import { resolveTagValues } from '../../tags/prepare'
import { ResolvedTag, Tag } from '../../tags/types'
import { options } from './options'

export const tags: Tag[] = [
  {
    mandatory: false,
    name: 'Tag',
    value: 'tag',
  },
  {
    mandatory: true,
    name: 'Mandatory Tag',
    value: 'mandatory-tag',
  },
  (): ResolvedTag => ({
    mandatory: false,
    name: 'Computed Value Tag',
    value: 'computed-value-tag',
  }),
  {
    mandatory: false,
    name: 'Replacement Tag',
    replaces: [
      isEqual('replacement'), startsWith('rt-'),
    ],
    value: 'replacement-tag',
  },
]

export const resolvedTags = resolveTagValues(tags, options)
