import { SectionOfTags } from '../../tags/types'

export const sectionsOfTags: SectionOfTags[] = [
  {
    name: 'Section One',
    value: 'one',
    tags: [
      {
        mandatory: true,
        name: 'Added Tag',
        section: 'one',
        selected: true,
        update: {
          action: 'add',
        },
        value: 'added-tag',
      },
    ],
  },
  {
    name: 'Section Two',
    value: 'two',
    tags: [
      {
        mandatory: false,
        name: 'Unselected Tag',
        section: 'two',
        selected: false,
        value: 'unselected-tag',
      },
      {
        mandatory: false,
        name: 'Replaced Tag',
        section: 'two',
        selected: true,
        update: {
          action: 'replace',
          oldValue: 'old-tag',
        },
        value: 'replaced-tag',
      },
    ],
  },
  {
    name: 'Other Tags',
    value: '_other',
    tags: [
      {
        mandatory: false,
        name: 'Selected Tag',
        selected: true,
        value: 'selected-tag',
      },
      {
        mandatory: false,
        name: 'Deleted Tag',
        selected: false,
        update: {
          action: 'delete',
        },
        value: 'deleted-tag',
      },
    ],
  },
]
