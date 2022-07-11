import type { MiddlewareFn } from 'type-graphql'

import Logger from '@halo/logger'

const resolveTime: MiddlewareFn = async ({ info }, next) => {
  const start = Date.now()
  await next()
  const resolveTime = Date.now() - start
  Logger.debug(`${info.parentType.name}.${info.fieldName} [${resolveTime} ms]`)
}

export default resolveTime
