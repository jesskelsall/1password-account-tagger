import { DateTime } from 'luxon'
import { Options } from '../options/types'
import { ResolvedTag, Tag } from './types'

// Add your own tags to choose from here
export const tags: Tag[] = [
  {
    name: 'Avatar: Jessica Kelsall',
    value: 'avatar-jk-11',
    mandatory: false,
    replaces: [
      (value: string): boolean => value.startsWith('avatar-jk'),
    ],
  },
  {
    name: 'Email: hi@jesskelsall.dev',
    section: 'contact-methods',
    value: 'email-jk-dev-hi',
    mandatory: false,
  },
  {
    name: 'Financial',
    value: 'financial',
    mandatory: false,
  },
  {
    name: 'Pay: PayPal',
    value: 'pay-ppl',
    mandatory: false,
  },
  {
    name: 'Phone: Mobile',
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
      replaces: options.updateProcessed
        ? [(value: string): boolean => value.startsWith('processed')]
        : [],
    }
  },
  {
    name: 'Subscription',
    value: 'subscription',
    mandatory: false,
  },
]
