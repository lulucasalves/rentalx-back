const connection = require('../../database/database')

function ListCategoriesService(req, res) {
  connection.query('SELECT * FROM categories', (error, results) => {
    if (error) {
      return res.status(400).json({ error: true, result: error })
    }

    res.status(200).json({ error: true, result: results })
  })
}

module.exports = ListCategoriesService
