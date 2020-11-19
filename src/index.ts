import inquirer from 'inquirer'
import checkboxPlus from 'inquirer-checkbox-plus-prompt'
import { readFromClipboard, writeToClipboard } from './clipboard'
import { askQuestions, generateInquirerQuestions } from './inquirer/question'
import { getOptions } from './options/argv'
import { groupTagsIntoSections } from './tags/group'
import { prepareTags, resolveTagValues } from './tags/prepare'
import { sections } from './tags/sections'
import { tags } from './tags/tags'

inquirer.registerPrompt('checkbox-plus', checkboxPlus)

const handleTags = async (): Promise<void> => {
  const options = getOptions(process.argv)
  const clipboardTags = await readFromClipboard()

  const resolvedTags = resolveTagValues(tags, options)
  const preparedTags = prepareTags(resolvedTags, clipboardTags)

  const sectionsOfTags = groupTagsIntoSections(preparedTags, sections, options.sections)

  const questions = generateInquirerQuestions(sectionsOfTags)
  const selectedTags = await askQuestions(questions)

  await writeToClipboard(selectedTags)
}

handleTags()
