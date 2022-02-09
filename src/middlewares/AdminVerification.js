const connection = require('../config/database/database')

function AdminVerification(req, res, next) {
  const { userId } = req

  const sql = 'SELECT admin FROM users WHERE id = ?'
  const values = [userId]

  connection.query(sql, values, (error, results) => {
    if (results[0].admin === 1) {
      next()
    } else if (error) {
      return res.status(400).json({ error: true, result: error })
    } else {
      return res.status(400).json({ error: true, result: 'Vc n é admin' })
    }
  })
}

module.exports = AdminVerification
