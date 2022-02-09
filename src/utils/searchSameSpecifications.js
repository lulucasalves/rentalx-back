const connection = require('../config/database/database')

function searchSameSpecifications(specificationId, carId, callback) {
  connection.query(
    'SELECT * FROM specifications_cars WHERE specification_id = ? AND car_id = ?',
    [specificationId, carId],
    (error, results) => {
      return callback(results)
    }
  )
}

module.exports = searchSameSpecifications
