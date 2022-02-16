const connection = require('../database/database')
const deleteLocalStorage = require('../storage/DeleteLocalStorage')

function verifyAvatar(id) {
  connection.query(
    'SELECT avatar FROM users WHERE id = ?',
    [id],
    async (err, results) => {
      if (results[0].avatar) {
        await deleteLocalStorage(results[0].avatar, 'avatar')
      }
    }
  )
}

module.exports = verifyAvatar
