import fuzzy from 'fuzzy'
import inquirer from 'inquirer'
import { flatten } from 'lodash/fp'
import { OnePasswordTag } from '../clipboard'
import { SectionOfTags } from '../tags/types'
import { formatDefaultTags, formatSourceTags } from './format'
import { CheckboxPlusQuestion, CheckboxPlusSource, InquirerSourceTag } from './types'

// Use inquirer to get the user to select/unselect tags
// One inquirer question per section of tags
export const askQuestions = async (
  questions: CheckboxPlusQuestion[],
): Promise<OnePasswordTag[]> => {
  const answers = await inquirer.prompt(questions)
  return flatten(Object.values(answers))
}

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
export const generateInquirerQuestion = (section: SectionOfTags): CheckboxPlusQuestion => {
  const { tags } = section
  const defaultTags = formatDefaultTags(tags)
  const source = generateCheckboxPlusSource(formatSourceTags(tags))

  return {
    default: defaultTags,
    highlight: false,
    message: section.name,
    name: section.value,
    pageSize: tags.length,
    searchable: true,
    source,
    type: 'checkbox-plus',
  }
}

// Creates an inquirer question for each section of tags
export const generateInquirerQuestions = (
  sections: SectionOfTags[],
): CheckboxPlusQuestion[] => sections.map(generateInquirerQuestion)
