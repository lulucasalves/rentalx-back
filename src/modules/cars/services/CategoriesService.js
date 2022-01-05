const { v4: uuid } = require('uuid')
const connection = require('../../../config/database')

function CategoriesService(req, res) {
  connection.query('SELECT * FROM categories', (error, results) => {
    if (error) {
      return res.status(400).json({ error: true, result: error })
    }

    res.status(200).json({ error: false, result: results })
  })
}

module.exports = CategoriesService
