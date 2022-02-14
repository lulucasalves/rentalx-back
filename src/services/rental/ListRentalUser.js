const connection = require('../../config/database/database')

function ListRentalUser(req, res) {
  const { userId } = req

  connection.query(
    'SELECT * FROM rentals JOIN (SELECT id, name AS carName, description AS carDescription, daily_rate AS car_daily_rate FROM cars) cars ON rentals.car_id = cars.id WHERE user_id = ?',
    [userId],
    (error, results) => {
      if (error) {
        return res.status(400).json({ error: true, result: error })
      }

      res.status(200).json({ error: false, result: results })
    }
  )
}

module.exports = ListRentalUser
