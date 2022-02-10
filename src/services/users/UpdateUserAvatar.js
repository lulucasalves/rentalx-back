const connection = require('../../config/database/database')
const verifyAvatar = require('../../config/filesAdjustments/verifyAvatar')

function UpdateUserAvatar(req, res) {
  const avatar = req.file.filename
  const { userId } = req

  const sql = 'UPDATE users SET avatar = ? WHERE id = ?'
  const values = [avatar, userId]

  verifyAvatar(userId)

  connection.query(sql, values, async error => {
    if (error) {
      return res.status(400).json({ error: true, results: error })
    }

    return res.status(204).send()
  })
}

module.exports = UpdateUserAvatar
