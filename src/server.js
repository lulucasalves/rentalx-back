const express = require('express')
const cors = require('cors')
const app = express()
require('./database/database')
const router = require('./router')

app.use(express.json())
app.use(cors())
app.use(router)

const port = 5000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

module.exports = app
