const connection = require('../config/database/database')

function tokenVerification(token, callback) {
  connection.query(
    'SELECT * FROM users_tokens WHERE refresh_token = ?',
    [token],
    (error, resultsTokens) => {
      connection.query(
        `SELECT * FROM users WHERE id = "${resultsTokens[0].user_id}"`,
        (err, resultsUsers) => {
          callback(resultsTokens, resultsUsers)
        }
      )
    }
  )
}

module.exports = tokenVerification
