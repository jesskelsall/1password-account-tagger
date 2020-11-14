import { drop, pick } from 'lodash/fp'
import yargs from 'yargs/yargs'
import { Options, Argv } from './types'

export const getOptions = (argv: Argv): Options => {
  const { argv: args } = yargs(drop(2, argv))
    .options({
      'update-processed': { type: 'boolean', default: true },
    })

  // Cast to the Options type
  // This is because yargs returns both camel and kebab cased option names
  // There is no way to TypeScript to type this correctly itself
  return pick(['updateProcessed'], args) as unknown as Options
}
