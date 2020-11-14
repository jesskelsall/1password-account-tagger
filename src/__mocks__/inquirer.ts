import { flow, keyBy, mapValues } from 'lodash/fp'

export default {
  // The selected answers are whichever the default selected ones are
  prompt: jest
    .fn()
    .mockImplementation(flow(
      keyBy('name'),
      mapValues('default'),
    )),
}
