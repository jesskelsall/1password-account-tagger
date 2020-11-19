import { resolveTagValues } from '../../tags/prepare'
import { ResolvedTag, Tag } from '../../tags/types'
import { options } from './options'

export const tags: Tag[] = [
  {
    mandatory: false,
    name: 'Tag',
    section: 'one',
    value: 'tag',
  },
  {
    mandatory: true,
    name: 'Mandatory Tag',
    section: 'two',
    value: 'mandatory-tag',
  },
  (): ResolvedTag => ({
    mandatory: false,
    name: 'Computed Value Tag',
    section: 'two',
    value: 'computed-value-tag',
  }),
  {
    mandatory: false,
    name: 'Replacement Tag',
    replaces: [
      (value: string): boolean => value === 'replacement',
      (value: string): boolean => value.startsWith('rt-'),
    ],
    value: 'replacement-tag',
  },
]

export const resolvedTags = resolveTagValues(tags, options)
