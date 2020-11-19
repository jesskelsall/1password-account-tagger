import inquirer, { CheckboxQuestion } from 'inquirer'

export default {
  // The selected answers are whichever the default selected ones are
  prompt: jest
    .fn()
    .mockImplementation(
      async (questions: CheckboxQuestion[]): Promise<inquirer.Answers> => {
        const answers: inquirer.Answers = {}

        questions.forEach((question) => {
          if (question.name) answers[question.name] = question.default
        })

        return answers
      },
    ),
}
