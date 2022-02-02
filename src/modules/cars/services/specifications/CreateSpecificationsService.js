const { v4: uuid } = require('uuid')
const connection = require('../../../../config/database')

function CreateSpecificationsService(req, res) {
  const id = uuid()
  const { name, description } = req.body

  const sql = 'INSERT INTO specifications(id,name,description) VALUES (?,?,?)'
  const values = [id, name, description]

  connection.query(sql, values, error => {
    if (error) {
      return res.status(400).json({ error: true, result: error })
    }

    return res.status(201).json({
      error: false,
      result: 'Especificação cadastrada com sucesso!'
    })
  })
}

module.exports = CreateSpecificationsService
