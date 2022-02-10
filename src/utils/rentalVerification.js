const connection = require('../config/database/database')

function rentalVerification(user_id, car_id, callback) {
  connection.query(
    'SELECT user_id, end_date FROM rentals WHERE user_id = ?',
    [user_id],
    (error, resultUsers) => {
      connection.query(
        'SELECT available FROM cars WHERE id = ?',
        [car_id],
        (error, resultCars) => {
          callback(resultUsers, resultCars[0].available)
        }
      )
    }
  )
}

module.exports = rentalVerification
