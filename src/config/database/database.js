const mysql = require('mysql2')
require('dotenv/config')

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.USER_DB,
  password: process.env.SECRET,
  database: process.env.DATABASE,
  port: process.env.PORT_DATABASE
})

module.exports = connection
