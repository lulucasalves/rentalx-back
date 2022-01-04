const express = require('express')
const cors = require('cors')
const app = express()
const router = require('./routes')
require('./database')

app.use(express.json())
app.use(cors())
app.use(router)

const port = 5000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
