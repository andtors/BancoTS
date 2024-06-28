import express = require('express')
import config from 'config'
const app = express()
require('dotenv').config()
const Logger =  require('./config/logger')
import morganMiddleware from './middlewares/morganMiddleware'
const cors = require('cors')

app.use(express.json())

app.use(cors({credentials: true, origin:'http://localhost:5173'}))

import AccountRoutes from './routes/AccountRoutes'

app.use('/', morganMiddleware, AccountRoutes)

const port = config.get<number>("port")

app.listen(port)
