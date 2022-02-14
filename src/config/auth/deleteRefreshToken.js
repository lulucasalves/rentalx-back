const connection = require('../database/database')

function deleteRefreshToken(id) {
  connection.query(`DELETE FROM users_tokens WHERE user_id = "${id}"`)
}

module.exports = deleteRefreshToken
