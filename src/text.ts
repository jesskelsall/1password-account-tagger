import {
  Chalk,
  green,
  red,
  yellow,
} from 'chalk'
import { PreparedTag } from './tags/types'

// Appends an action string to the tag name and colours the entire string
export const applyActionAndColourToTagName = (
  name: string,
  actionString: string,
  colour: Chalk,
): string => colour(`${name} [${actionString}]`)

// Gets the tag name with the prepared action applied
export const getPreparedTagName = (tag: PreparedTag): string => {
  const { name, update } = tag

  if (update) {
    if (update.action === 'add') return applyActionAndColourToTagName(name, 'mandatory', green)
    if (update.action === 'delete') return applyActionAndColourToTagName(name, 'deleted', red)

    return applyActionAndColourToTagName(name, `was ${update.oldValue}`, yellow)
  }

  return name
}
