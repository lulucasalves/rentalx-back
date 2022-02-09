const connection = require('../config/database/database')

function deleteSpecifications(id) {
  connection.query(`DELETE FROM specifications_cars WHERE id = "${id}"`)
}

module.exports = deleteSpecifications
