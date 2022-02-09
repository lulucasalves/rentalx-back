const connection = require('../../config/database/database')

function ListCarsService(req, res) {
  let { name, brand, category } = req.query

  const sql = `SELECT * FROM cars WHERE available = ?
  ${brand ? `AND brand = "${brand}"` : ''}
  ${name ? `AND name = "${name}"` : ''}
  ${category ? `AND category_id = "${category}"` : ''}`

  connection.query(sql, [1], (error, results) => {
    if (error) {
      return res.status(400).json({ error: true, result: error })
    }

    res.status(200).json({ error: false, result: results })
  })
}

module.exports = ListCarsService
