const fs = require('fs')
const csvParse = require('csv-parse')
const { v4: uuid } = require('uuid')
const connection = require('../../database/database')

async function ImportCategoriesService(req, res) {
  const { file } = req

  const stream = fs.createReadStream(file.path)
  const categories = []

  const parseFile = csvParse()

  stream.pipe(parseFile)

  parseFile
    .on('headers', val => {
      console.log(val)
    })
    .on('data', async line => {
      const [name, description] = line
      categories.push({
        name,
        description
      })
    })
    .on('end', () => {
      fs.promises.unlink(file.path)
      categories.map(({ name, description }) => {
        const id = uuid()

        const sql = 'INSERT INTO categories(id,name,description) VALUES (?,?,?)'
        const values = [id, name, description]

        connection.query(sql, values, error => {
          if (error) {
            console.log(`A categoria ${name} não foi cadastrada...`)
          }
        })
      })

      return res.status(201).send()
    })
    .on('error', err => {
      res.status(400).json({ error: true, result: err })
    })
}

module.exports = ImportCategoriesService
