import { isEqual, startsWith } from 'lodash/fp'
import { Tag } from '../../tags/schema'

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
  {
    mandatory: false,
    name: 'Computed Value Tag',
    value: (): string => 'computed-value-tag',
  },
  {
    mandatory: false,
    name: 'Replacement Tag',
    replaces: [
      isEqual('replacement'), startsWith('rt-'),
    ],
    value: 'replacement-tag',
  },
]
