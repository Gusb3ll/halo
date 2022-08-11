import path from 'path'

import type { Application } from 'express'

import 'dotenv/config'
import cors from 'cors'
import helmet from 'helmet'
import express from 'express'
import compression from 'compression'

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

app.use('/', express.static(path.join(__dirname, '../web')))

export default app
