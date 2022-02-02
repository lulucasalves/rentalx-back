const fs = require('fs')
const csvParse = require('csv-parse')
const { v4: uuid } = require('uuid')
const connection = require('../../../../config/database')

async function ImportCategoriesService(req, res) {
  const { file } = req

  const stream = fs.createReadStream(file.path)
  const categories = []

  const parseFile = csvParse()
  stream.pipe(parseFile)
  parseFile
    .on('data', async line => {
      const [name, description] = line
      categories.push({
        name,
        description
      })
    })
    .on('end', () => {
      fs.promises.unlink(file.path)
      categories.map(val => {
        const id = uuid()

        const sql = 'INSERT INTO categories(id,name,description) VALUES (?,?,?)'
        const values = [id, val.name, val.description]

        connection.query(sql, values, error => {
          if (error) {
            console.log(`A categoria ${val.name} não foi cadastrada...`)
          }

          return res.status(201).json({
            error: false,
            result: 'Categoria cadastrada com sucesso!'
          })
        })
      })
    })
    .on('error', err => {
      res.status(400).json({ error: true, result: err })
    })
}

module.exports = ImportCategoriesService
