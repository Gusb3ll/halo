import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'

import { HaloResolver } from './graphql/halo.resolver'

import app from './app';

(async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HaloResolver,
      ],
    }),
    cache: 'bounded',
    csrfPrevention: true,
    introspection: true,
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app })

  app.listen(parseInt(process.env.PORT) || 4000, '0.0.0.0', () => {
    console.info(`Server started on port ${process.env.PORT || 4000}`)
  })
})()
