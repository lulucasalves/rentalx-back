const express = require('express')
const cors = require('cors')
const app = express()
require('../config/database/database')
const router = require('./routers')
require('dotenv/config')

app.use(express.json())
app.use(cors())
app.use(router)

const port = 5000

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

module.exports = app
