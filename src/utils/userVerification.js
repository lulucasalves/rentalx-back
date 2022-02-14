const connection = require('../config/database/database')

function userVerification(user_id, callback) {
  connection.query(
    'SELECT * FROM users_tokens WHERE user_id = ?',
    [user_id],
    (error, results) => {
      callback(results)
    }
  )
}

module.exports = userVerification
