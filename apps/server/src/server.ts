import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from 'apollo-server-core'

import Logger from '@utils/logger'

import { haloResolver } from '@resolvers/halo.resolver'
import { errorInterceptor, resolveTime } from '@middleware'

import app from './app';

(async () => {
  const middlewares = [
    errorInterceptor,
  ]

  if (process.env.NODE_ENV !== 'production')
    middlewares.push(resolveTime)

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        haloResolver,
      ],
      globalMiddlewares: middlewares,
    }),
    context: ({ req, res }) => ({ req, res }),
    cache: 'bounded',
    csrfPrevention: true,
    introspection: true,
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
        : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
    ],
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app })

  app.listen(parseInt(process.env.PORT) || 8080, '0.0.0.0', () => {
    Logger.info(`Server started on port ${process.env.PORT || 8080}`)
  })
})()
