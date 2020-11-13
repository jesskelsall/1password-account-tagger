import inquirer from 'inquirer'

export type InquirerDefaultTag = string

export interface InquirerSourceTag {
  disabled: false,
  name: string,
  value: string,
}

export interface CheckboxPlusQuestion extends inquirer.Question {
  highlight?: boolean,
  pageSize?: number,
  searchable?: boolean,
  source?: (answersSoFar: InquirerSourceTag[], input: string) => Promise<InquirerSourceTag[]>,
}
