const connection = require('../config/database/database')

function updateCarAvailable(id) {
  connection.query(`UPDATE cars SET available = ${0} WHERE id = ?`, [id])
}

module.exports = updateCarAvailable
