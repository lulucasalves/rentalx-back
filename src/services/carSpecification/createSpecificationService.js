const { v4: uuid } = require('uuid')
const connection = require('../../config/database/database')

function CreateCarSpecificationsService(req, res) {
  const id = uuid()
  const { car_id, specification_id } = req.body

  const sql =
    'INSERT INTO specifications_cars(id,car_id,specification_id) VALUES (?,?,?)'
  const values = [id, car_id, specification_id]

  connection.query(sql, values, error => {
    if (error) {
      return res.status(400).json({ error: true, result: error })
    }

    return res.status(201).send()
  })
}

module.exports = CreateCarSpecificationsService
