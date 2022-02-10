const app = require('./app')
require('dotenv/config')

const port = 5000

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}
