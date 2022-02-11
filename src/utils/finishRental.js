const connection = require('../config/database/database')

function finishRental(id, end_date, total) {
  connection.query(
    `UPDATE rentals SET end_date = "${end_date}", total = ${total} WHERE id = ?`,
    [id]
  )
}

module.exports = finishRental
