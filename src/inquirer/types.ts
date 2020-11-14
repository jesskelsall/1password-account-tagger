import inquirer from 'inquirer'

export type InquirerDefaultTag = string

export interface InquirerSourceTag {
  disabled: false,
  name: string,
  value: string,
}

export type CheckboxPlusSource = (
  answersSoFar: InquirerSourceTag[],
  input: string | undefined,
) => Promise<InquirerSourceTag[]>

export interface CheckboxPlusQuestion extends inquirer.Question {
  highlight: false,
  pageSize: number,
  searchable: true,
  source: CheckboxPlusSource,
  type: 'checkbox-plus',
}
