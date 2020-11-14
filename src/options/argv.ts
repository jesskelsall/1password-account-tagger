import { drop, pick } from 'lodash/fp'
import { terminalWidth } from 'yargs'
import yargs from 'yargs/yargs'
import { Argv, Options } from './types'

export const getOptions = (argv: Argv): Options => {
  const { argv: args } = yargs(drop(2, argv))
    .options({
      'update-processed': {
        default: true,
        description: 'Make the current processed quarter tag mandatory, applying it by default.',
        type: 'boolean',
      },
    })
    .wrap(terminalWidth())

  // Cast to the Options type
  // This is because yargs returns both camel and kebab cased option names
  // There is no way to TypeScript to type this correctly itself
  return pick(['updateProcessed'], args) as unknown as Options
}
