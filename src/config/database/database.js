const mysql = require('mysql2')
require('dotenv/config')

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.USER_DB,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT_DATABASE
})

module.exports = connection
