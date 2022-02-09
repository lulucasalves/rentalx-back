const connection = require('../config/database/database')
const deleteFile = require('./file')

function verifyAvatar(id) {
  connection.query(
    'SELECT avatar FROM users WHERE id = ?',
    [id],
    async (err, results) => {
      console.log(results)
      if (results[0].avatar) {
        await deleteFile(`./tmp/avatar/${results[0].avatar}`)
      }
    }
  )
}

module.exports = verifyAvatar
