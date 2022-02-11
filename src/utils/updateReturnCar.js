const connection = require('../config/database/database')

function updateReturnCar(id, fine_amount) {
  connection.query(
    `UPDATE cars SET available = ${1}, fine_amount = ${fine_amount} WHERE id = ?`,
    [id]
  )
}

module.exports = updateReturnCar
