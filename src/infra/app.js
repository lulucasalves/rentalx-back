const express = require('express')
const cors = require('cors')
const app = express()
require('../config/database/database')
const router = require('./routers')

app.use(express.json())
app.use(cors())
app.use(router)

module.exports = app
