import Joi from 'joi'

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
    Joi.assert(data, schema, { abortEarly: false, ...options })

    return {
      message: () => 'Success',
      pass: true,
    }
  } catch (error) {
    return {
      message: () => {
        const { details } = error as Joi.ValidationError
        const message = details.map((errorItem) => ({
          message: errorItem.message,
          path: errorItem.path,
          validationFailed: errorItem.type.split('.').reverse()[0],
        }))

        return JSON.stringify(message)
      },
      pass: false,
    }
  }
}

expect.extend({ toMatchJoiSchema })
