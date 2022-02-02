const { v4: uuid } = require('uuid')
const connection = require('../../../../config/database')

function CreateCategoriesService(req, res) {
  const id = uuid()
  const { name, description } = req.body

  const sql = 'INSERT INTO categories(id,name,description) VALUES (?,?,?)'
  const values = [id, name, description]

  connection.query(sql, values, error => {
    if (error) {
      return res.status(400).json({ error: true, result: error })
    }

    return res.status(201).json({
      error: false,
      result: 'Categoria cadastrada com sucesso!'
    })
  })
}

module.exports = CreateCategoriesService
