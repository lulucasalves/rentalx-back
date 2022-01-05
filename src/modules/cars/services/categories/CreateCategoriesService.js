const { v4: uuid } = require('uuid')
const connection = require('../../../../config/database')

function CreateCategoriesService(req, res) {
  const id = uuid()
  const { name, description } = req.body

  const sql = 'INSERT INTO categories(id,name,description) VALUES (?,?,?)'
  const values = [id, name, description]

  connection.query(sql, values, error => {
    if (error.errno == 1062) {
      return res
        .status(400)
        .json({ error: true, result: 'Este nome já está cadastrado' })
    } else if (error.errno == 1048) {
      return res
        .status(400)
        .json({ error: true, result: 'Informações insuficientes' })
    } else if (error) {
      return res.status(400).json({ error: true, result: error })
    }

    return res.status(201).json({
      error: false,
      result: 'Categoria cadastrada com sucesso!'
    })
  })
}

module.exports = CreateCategoriesService