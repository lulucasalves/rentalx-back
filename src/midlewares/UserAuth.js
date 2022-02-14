const { verify } = require('jsonwebtoken')
const connection = require('../config/database/database')
const { secret_refresh_token } = require('../config/auth/auth')

function UserAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization

    if (authHeader) {
      const [, token] = authHeader.split(' ')

      const { sub } = verify(token, secret_refresh_token)

      const sql = 'SELECT id FROM users WHERE id = ?'
      const values = [sub]

      connection.query(sql, values, (error, results) => {
        if (error) {
          return res.status(400).json({ error: true, results: error })
        }

        if (!results[0].id) {
          return res.status(400).json({
            error: true,
            results: 'Algo deu errado ao buscar os dados...'
          })
        }

        req.userId = sub

        next()
      })
    }
  } catch (err) {
    return res.status(401).json({
      error: true,
      results: 'Token inválido'
    })
  }
}

module.exports = UserAuth
