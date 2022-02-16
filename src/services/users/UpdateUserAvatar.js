const connection = require('../../config/database/database')
const verifyAvatar = require('../../config/filesAdjustments/verifyAvatar')
const saveLocalStorage = require('../../config/storage/SaveLocalStorage')

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

    await saveLocalStorage(avatar, 'avatar')

    return res.status(201).send()
  })
}

module.exports = UpdateUserAvatar
