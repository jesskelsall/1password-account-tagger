import { terminalWidth } from 'yargs'
import yargs from 'yargs/yargs'
import { Argv, Options } from './types'

export const getOptions = (argv: Argv): Options => {
  const { argv: args } = yargs(argv.slice(2))
    .options({
      sections: {
        default: false,
        description: 'Group tags by sections, only showing one section of tags at a time.',
        type: 'boolean',
      },
      'update-processed': {
        default: true,
        description: 'Make the current processed quarter tag mandatory, applying it by default.',
        type: 'boolean',
      },
    })
    .wrap(terminalWidth())

  return {
    sections: args.sections,
    updateProcessed: args['update-processed'],
  }
}
