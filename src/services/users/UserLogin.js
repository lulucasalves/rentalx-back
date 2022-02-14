const connection = require('../../config/database/database')
const passwordhash = require('password-hash')
const { sign } = require('jsonwebtoken')
const {
  secret_token,
  expires_in_token,
  secret_refresh_token,
  expires_in_refresh_token,
  refresh_token_expires_date
} = require('../../config/auth/auth')
const addDays = require('../../config/dates/addDays')
const refreshTokenFunc = require('../../config/auth/refreshToken')

function UserLogin(req, res) {
  const { email, password } = req.body

  const sql = 'SELECT email,password,id FROM users WHERE email = ?'
  const values = [email]

  connection.query(sql, values, (error, results) => {
    if (error) {
      return res.status(400).json({ error: true, results: error })
    }

    const user = results[0]

    const passwordPass = passwordhash.verify(password, user.password)

    if (results && passwordPass && email === user.email) {
      const token = sign({}, secret_token, {
        subject: user.id,
        expiresIn: expires_in_token
      })

      const refresh_token_id = sign({ email }, secret_refresh_token, {
        subject: user.id,
        expiresIn: expires_in_refresh_token
      })

      const refresh_token_expires = addDays(refresh_token_expires_date)

      refreshTokenFunc(refresh_token_expires, refresh_token_id, user.id)

      return res.status(200).json({
        token: token,
        user: { id: user.id, email: email },
        refresh_token: refresh_token_id
      })
    }

    return res
      .status(400)
      .json({ error: true, results: 'Algo deu errado ao fazer o login...' })
  })
}

module.exports = UserLogin
