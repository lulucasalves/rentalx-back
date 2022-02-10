const { v4: uuid } = require('uuid')
const connection = require('../../config/database/database')
const rentalVerification = require('../../utils/rentalVerification')
const updateCarAvailable = require('../../utils/updateCarAvailable')

function CreateRentalsService(req, res) {
  const id = uuid()
  const { userId } = req

  const { car_id, expected_return_date, total } = req.body
  const start_date = new Date()

  const sql =
    'INSERT INTO rentals(id,car_id,user_id,start_date,expected_return_date,total) VALUES (?,?,?,?,?,?)'

  const values = [id, car_id, userId, start_date, expected_return_date, total]

  rentalVerification(userId, car_id, (resultUsers, resultCars) => {
    if (resultUsers.length > 0 && resultUsers[0].end_date == null) {
      return res
        .status(400)
        .json({ error: true, result: 'Usuário já está com um carro alugado' })
    } else if (resultCars < 1) {
      return res.status(400).json({ error: true, result: 'Carro já utilizado' })
    } else {
      connection.query(sql, values, error => {
        if (error) {
          return res.status(400).json({ error: true, result: error })
        }

        updateCarAvailable(car_id)

        return res.status(201).send()
      })
    }
  })
}

module.exports = CreateRentalsService
