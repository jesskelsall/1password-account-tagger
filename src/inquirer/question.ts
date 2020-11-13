import fuzzy from 'fuzzy'
import inquirer from 'inquirer'
import {
  first,
  flow,
  get,
  map,
  values,
} from 'lodash/fp'
import { OnePasswordTag } from '../clipboard'
import { PreparedTag } from '../tags/schema'
import { formatDefaultTags, formatSourceTags } from './format'
import { CheckboxPlusQuestion } from './schema'

// Creates an inquirer question object that uses the checkbox plus type
export const generateInquirerQuestion = (tags: PreparedTag[]): CheckboxPlusQuestion => {
  const defaultTags = formatDefaultTags(tags)
  const sourceTags = formatSourceTags(tags)

  return {
    default: defaultTags,
    highlight: false,
    message: 'Select tags',
    name: 'tags',
    pageSize: tags.length,
    searchable: true,
    source: async (_answersSoFar, input = '') => {
      const fuzzyResult = fuzzy.filter(input, sourceTags, {
        extract: get('name'),
      })

      return map(get('original'), fuzzyResult)
    },
    type: 'checkbox-plus',
  }
}

export const askQuestion = async (question: CheckboxPlusQuestion): Promise<OnePasswordTag[]> => {
  const answers = await inquirer.prompt([question])
  return flow(values, first)(answers)
}
