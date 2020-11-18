import Joi from 'joi'
import { getOptions } from '../../options/argv'
import { Argv } from '../../options/types'
import { options as defaultOptions } from '../_stubs/options'

const buildArgv = (args: string[]): Argv => [
  '',
  '',
  ...args,
]

test('returns default values when no arguments are provided', async () => {
  const result = getOptions(buildArgv([]))

  expect(result).toEqual(defaultOptions)
})

test('interprets --sections when set explicitly', async () => {
  const falseResult = getOptions(buildArgv(['--sections', 'false']))
  expect(falseResult).toMatchJoiSchema(
    Joi.object().keys({
      sections: Joi.boolean().required().valid(false),
    }).unknown(),
  )

  const trueResult = getOptions(buildArgv(['--sections', 'true']))
  expect(trueResult).toMatchJoiSchema(
    Joi.object().keys({
      sections: Joi.boolean().required().valid(true),
    }).unknown(),
  )
})

test('interprets --update-processed when set explicitly', async () => {
  const falseResult = getOptions(buildArgv(['--update-processed', 'false']))
  expect(falseResult).toMatchJoiSchema(
    Joi.object().keys({
      updateProcessed: Joi.boolean().required().valid(false),
    }).unknown(),
  )

  const trueResult = getOptions(buildArgv(['--update-processed', 'true']))
  expect(trueResult).toMatchJoiSchema(
    Joi.object().keys({
      updateProcessed: Joi.boolean().required().valid(true),
    }).unknown(),
  )
})
