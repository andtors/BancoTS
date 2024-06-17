import express = require('express')
import config from 'config'
const app = express()
require('dotenv').config()
const Logger =  require('./config/logger')
import morganMiddleware from './middlewares/morganMiddleware'

app.use(express.json())

import AccountRoutes from './routes/AccountRoutes'

app.use('/', morganMiddleware, AccountRoutes)

const port = config.get<number>("port")

app.listen(port)
