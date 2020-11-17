import { startsWith } from 'lodash/fp'
import { DateTime } from 'luxon'
import { ResolvedTag, Tag } from './types'
import { Options } from '../options/types'

// Add your own tags to choose from here
export const tags: Tag[] = [
  {
    name: 'Avatar: Jessica Kelsall',
    value: 'avatar-jk-11',
    mandatory: false,
    replaces: [startsWith('avatar-jk')],
  },
  {
    name: 'Email: hi@jesskelsall.dev',
    section: 'contact-methods',
    value: 'email-jk-dev-hi',
    mandatory: false,
  },
  {
    name: 'Pay: PayPal',
    value: 'pay-ppl',
    mandatory: false,
  },
  {
    name: 'Phone: 07714277754 (Mobile)',
    section: 'contact-methods',
    value: 'phone-754',
    mandatory: false,
  },
  (options: Options): ResolvedTag => {
    const quarter = DateTime.local().toFormat('yyQq')

    return {
      name: `Processed Date (${quarter})`,
      value: `processed-${quarter}`,
      mandatory: options.updateProcessed,
      replaces: [startsWith('processed')],
    }
  },
  {
    name: 'Subscription',
    value: 'subscription',
    mandatory: false,
  },
]
