import inquirer from 'inquirer'
import checkboxPlus from 'inquirer-checkbox-plus-prompt'
import { readFromClipboard } from './clipboard'
import { askQuestion, generateInquirerQuestion } from './inquirer/question'
import { prepareTags, resolveTagValues } from './tags/prepare'
import { tags } from './__tests__/_stubs/tags'

inquirer.registerPrompt('checkbox-plus', checkboxPlus)

const test = async (): Promise<void> => {
  const clipboardTags = await readFromClipboard()
  const resolvedTags = resolveTagValues(tags)
  const preparedTags = prepareTags(resolvedTags, clipboardTags)
  const question = generateInquirerQuestion(preparedTags)

  const finalTags = await askQuestion(question)

  console.info(finalTags)
}

test()
