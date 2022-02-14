const { v4: uuid } = require('uuid')
const connection = require('../database/database')

function refreshTokenFunc(expires_date, refresh_token, user_id) {
  const id = uuid()

  const sql =
    'INSERT INTO users_tokens(id,user_id,expires_date,refresh_token) VALUES (?,?,?,?)'
  const values = [id, user_id, expires_date, refresh_token]

  connection.query(sql, values, error => {
    if (error) {
      throw new Error(error)
    }
  })
}

module.exports = refreshTokenFunc
