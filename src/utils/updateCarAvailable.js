const connection = require('../config/database/database')

function updateCarAvailable(id, status) {
  connection.query(`UPDATE cars SET available = ${status} WHERE id = ?`, [id])
}

module.exports = updateCarAvailable
