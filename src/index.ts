import inquirer from 'inquirer'
import checkboxPlus from 'inquirer-checkbox-plus-prompt'
import { readFromClipboard, writeToClipboard } from './clipboard'
import { askQuestion, generateInquirerQuestion } from './inquirer/question'
import { getOptions } from './options/argv'
import { prepareTags, resolveTagValues } from './tags/prepare'
import { tags } from './tags/tags'

inquirer.registerPrompt('checkbox-plus', checkboxPlus)

const handleTags = async (): Promise<void> => {
  const options = getOptions(process.argv)
  const clipboardTags = await readFromClipboard()

  const resolvedTags = resolveTagValues(tags, options)
  const preparedTags = prepareTags(resolvedTags, clipboardTags)

  const question = generateInquirerQuestion(preparedTags)
  const selectedTags = await askQuestion(question)

  await writeToClipboard(selectedTags)
}

handleTags()
