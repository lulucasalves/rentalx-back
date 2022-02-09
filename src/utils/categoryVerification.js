const connection = require('../config/database/database')

function categoryVerification(id, callback) {
  connection.query(
    'SELECT name FROM categories WHERE id = ?',
    [id],
    (error, results) => {
      return callback(results)
    }
  )
}

module.exports = categoryVerification
