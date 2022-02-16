const connection = require('../../config/database/database')
require('dotenv/config')

function ProfileUser(req, res) {
  const { userId } = req

  const sql =
    'SELECT id,name,email,driver_license,avatar FROM users WHERE id = ?'
  const values = [userId]

  connection.query(sql, values, (error, results) => {
    if (error) {
      return res.status(400).json({ error: true, result: error })
    }

    switch (process.env.disk) {
      case 'local':
        const linkLocal = `${process.env.APP_API_URL}/avatar/${results[0].avatar}`
        res.status(200).json({
          error: false,
          result: {
            id: results[0].id,
            name: results[0].name,
            email: results[0].email,
            driver_license: results[0].driver_license,
            avatar: results[0].avatar,
            avatar_url: linkLocal
          }
        })
      case 's3':
        const avatar_url = `${process.env.AWS_BUCKET_URL}/avatar/${results[0].avatar}`
        res.status(200).json({
          error: false,
          result: {
            id: results[0].id,
            name: results[0].name,
            email: results[0].email,
            driver_license: results[0].driver_license,
            avatar: results[0].avatar,
            avatar_url
          }
        })
    }
  })
}

module.exports = ProfileUser
