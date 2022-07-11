import type { MiddlewareFn } from 'type-graphql'

import Logger from '@utils/logger'

const resolveTime: MiddlewareFn = async ({ info }, next) => {
  if (process.env.NODE_ENV !== 'production') {
    const start = Date.now()
    await next()
    const resolveTime = Date.now() - start
    Logger.debug(`${info.parentType.name}.${info.fieldName} [${resolveTime} ms]`)
  }
}

export default resolveTime
