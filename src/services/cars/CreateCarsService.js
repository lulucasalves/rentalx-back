const { v4: uuid } = require('uuid')
const connection = require('../../config/database/database')
const categoryVerification = require('../../utils/categoryVerification')

function CreateCarsService(req, res) {
  const id = uuid()
  const {
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id
  } = req.body

  categoryVerification(category_id, results => {
    if (results[0]) {
      const sql =
        'INSERT INTO cars(id,name,description,daily_rate,license_plate,fine_amount,brand,category_id) VALUES (?,?,?,?,?,?,?,?)'

      const values = [
        id,
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id
      ]

      connection.query(sql, values, error => {
        if (error) {
          return res.status(400).json({ error: true, result: error })
        }

        return res.status(201).send()
      })
    } else {
      return res
        .status(400)
        .json({ error: true, result: 'Não foi encontrado o category_id' })
    }
  })
}

module.exports = CreateCarsService
