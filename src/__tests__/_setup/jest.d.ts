import Joi from 'joi'

declare global {
  namespace jest {
    interface Expect {
      toMatchJoiSchema: (schema: Joi.AnySchema, options?: Joi.ValidationOptions) => void,
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R> {
      toMatchJoiSchema: (schema: Joi.AnySchema, options?: Joi.ValidationOptions) => void,
    }
  }
}
