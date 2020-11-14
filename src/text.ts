import {
  Chalk,
  green,
  red,
  yellow,
} from 'chalk'
import { curry } from 'lodash/fp'
import { PreparedTag } from './tags/types'

// Appends an action string to the tag name and colours the entire string
export const applyActionAndColourToTagName = curry((
  name: string,
  actionString: string,
  colour: Chalk,
): string => colour(`${name} [${actionString}]`))

// Gets the tag name with the prepared action applied
export const getPreparedTagName = (tag: PreparedTag): string => {
  const { name, update } = tag
  const applyAction = applyActionAndColourToTagName(name)

  if (update) {
    if (update.action === 'add') return applyAction('mandatory', green)
    if (update.action === 'delete') return applyAction('deleted', red)

    return applyAction(`was ${update.oldValue}`, yellow)
  }

  return name
}
