const connection = require('../config/database/database')

function getCategoryId(category, callback) {
  connection.query(
    'SELECT id FROM categories WHERE name = ?',
    [category],
    (error, results) => {
      return callback(results)
    }
  )
}

module.exports = getCategoryId
