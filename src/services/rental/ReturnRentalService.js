const connection = require('../../config/database/database')
const compareDays = require('../../config/dates/compareDays')
const compareDaysRental = require('../../config/dates/compareDaysRental')
const getCurrentDate = require('../../config/dates/generateNewDate')
const finishRental = require('../../utils/finishRental')
const updateReturnCar = require('../../utils/updateReturnCar')

function ReturnRentalsService(req, res) {
  const { id } = req.params
  const { userId } = req

  connection.query(
    'SELECT * FROM rentals WHERE id = ? AND user_id = ? AND total = ?',
    [id, userId, 0],
    (error, results) => {
      if (error) {
        return res.status(400).json({ error: true, result: error })
      }

      if (results.length < 1) {
        return res
          .status(400)
          .json({ error: true, result: 'nenhum aluguel em aberto encontrado' })
      }

      const car_id = results[0].car_id

      const daysQuantity = compareDaysRental(
        results[0].start_date,
        results[0].expected_return_date
      )

      connection.query(
        'SELECT * from cars WHERE id = ?',
        [car_id],
        (error, resultsCar) => {
          if (error) {
            return res.status(400).json({ error: true, result: error })
          }

          if (resultsCar.length < 0) {
            return res
              .status(400)
              .json({ error: true, result: 'nenhum carro encontrado' })
          }

          const totalPrice = daysQuantity * resultsCar[0].daily_rate

          const totalFineAmountDays = compareDays(
            results[0].expected_return_date
          )

          const fine_amount = totalFineAmountDays * resultsCar[0].daily_rate

          updateReturnCar(car_id, fine_amount + resultsCar[0].fine_amount)
          finishRental(id, getCurrentDate(), totalPrice)

          return res.status(200).send()
        }
      )
    }
  )
}

module.exports = ReturnRentalsService
