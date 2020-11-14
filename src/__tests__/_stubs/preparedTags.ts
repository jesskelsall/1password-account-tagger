import { PreparedTag } from '../../tags/types'

export const preparedTags: PreparedTag[] = [
  {
    mandatory: false,
    name: 'Unselected Tag',
    selected: false,
    value: 'unselected-tag',
  },
  {
    mandatory: false,
    name: 'Selected Tag',
    selected: true,
    value: 'selected-tag',
  },
  {
    mandatory: true,
    name: 'Added Tag',
    selected: true,
    update: {
      action: 'add',
    },
    value: 'added-tag',
  },
  {
    mandatory: false,
    name: 'Replaced Tag',
    selected: true,
    update: {
      action: 'replace',
      oldValue: 'old-tag',
    },
    value: 'replaced-tag',
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
]
