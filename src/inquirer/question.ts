import fuzzy from 'fuzzy'
import inquirer from 'inquirer'
import { OnePasswordTag } from '../clipboard'
import { PreparedTag } from '../tags/types'
import { formatDefaultTags, formatSourceTags } from './format'
import { CheckboxPlusQuestion, CheckboxPlusSource, InquirerSourceTag } from './types'

// Creates a function that filters the list of available tags based on what the user types
export const generateCheckboxPlusSource = (
  sourceTags: InquirerSourceTag[],
): CheckboxPlusSource => async (_answersSoFar, input = '') => {
  const fuzzyResult = fuzzy.filter(input, sourceTags, {
    extract: (answer) => answer.name,
  })

  return fuzzyResult.map((result) => result.original)
}

// Creates an inquirer question object that uses the checkbox plus type
export const generateInquirerQuestion = (tags: PreparedTag[]): CheckboxPlusQuestion => {
  const defaultTags = formatDefaultTags(tags)
  const source = generateCheckboxPlusSource(formatSourceTags(tags))

  return {
    default: defaultTags,
    highlight: false,
    message: 'Select tags',
    name: 'tags',
    pageSize: tags.length,
    searchable: true,
    source,
    type: 'checkbox-plus',
  }
}

export const askQuestion = async (question: CheckboxPlusQuestion): Promise<OnePasswordTag[]> => {
  const answers = await inquirer.prompt([question])
  return Object.values(answers)[0]
}
