const connection = require('../database/database')

function deleteRefreshTokenByToken(id) {
  connection.query(`DELETE FROM users_tokens WHERE id = "${id}"`)
}

module.exports = deleteRefreshTokenByToken
