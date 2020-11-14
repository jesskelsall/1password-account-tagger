import { isEqual, startsWith } from 'lodash/fp'
import { DateTime } from 'luxon'
import { Tag } from './types'

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
    value: 'email-jk-dev-hi',
    mandatory: false,
  },
  {
    name: 'Pay: PayPal',
    value: 'pay-ppl',
    mandatory: false,
  },
  {
    name: 'Processed Date',
    value: (): string => `processed-${DateTime.local().toFormat('yyQq')}`,
    mandatory: true,
    replaces: [startsWith('processed')],
  },
  {
    name: 'Subscription',
    value: 'subscription',
    mandatory: false,
  },
]
