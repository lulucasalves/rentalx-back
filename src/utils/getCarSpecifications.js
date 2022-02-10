const connection = require('../config/database/database')

function getCarSpecifications(carId, callback) {
  connection.query(
    'SELECT * FROM specifications_cars WHERE car_id = ?',
    [carId],
    (error, results) => {
      return callback(results)
    }
  )
}

module.exports = getCarSpecifications
