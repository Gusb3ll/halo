import path from 'path'

import type { Application, Request, Response } from 'express'

import 'dotenv/config'
import cors from 'cors'
import helmet from 'helmet'
import express from 'express'
import compression from 'compression'
import { express as voyagerMiddleware } from 'graphql-voyager/middleware'

const app: Application = express()

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(compression())
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
)

app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }))

app.get('/', (_req: Request, res: Response) => {
  return res.status(200).sendFile(path.join(__dirname, '../web/index.html'))
})

export default app
