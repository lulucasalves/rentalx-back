const { v4: uuid } = require('uuid')
const connection = require('../../config/database/database')
const searchSameSpecifications = require('../../utils/searchSameSpecifications')
const updateCarSpecifications = require('./updateCarSpecifications')

function CreateCarSpecificationsService(req, res) {
  const id = uuid()
  const { specification_id } = req.body
  const { id: car_id } = req.params

  searchSameSpecifications(specification_id, car_id, results => {
    if (results.length < 1) {
      const sql =
        'INSERT INTO specifications_cars(id,car_id,specification_id) VALUES (?,?,?)'
      const values = [id, car_id, specification_id]

      connection.query(sql, values, error => {
        if (error) {
          return res.status(400).json({ error: true, result: error })
        }

        updateCarSpecifications(car_id, id)
        return res.status(204).send()
      })
    } else {
      return res.status(400).json({
        error: true,
        result: 'Esta especificação já existe no carro selecionado'
      })
    }
  })
}

module.exports = CreateCarSpecificationsService
