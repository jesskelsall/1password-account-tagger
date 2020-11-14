import Joi from 'joi'
import {
  defaults, flow, last, map, split,
} from 'lodash/fp'

interface JestTestResponse {
  message: () => string,
  pass: boolean,
}

// Provides Jest expect support for Joi.validate
const toMatchJoiSchema = (
  data: any, // eslint-disable-line
  schema: Joi.AnySchema,
  options: Joi.ValidationOptions,
): JestTestResponse => {
  try {
    Joi.assert(data, schema, defaults({ abortEarly: false }, options))

    return {
      message: () => 'Success',
      pass: true,
    }
  } catch (error) {
    return {
      message: () => {
        const { details } = error as Joi.ValidationError
        const message = map((errorItem) => ({
          message: errorItem.message,
          path: errorItem.path,
          validationFailed: flow(
            split('.'),
            last,
          )(errorItem.type),
        }), details)
        return JSON.stringify(message)
      },
      pass: false,
    }
  }
}

expect.extend({ toMatchJoiSchema })
