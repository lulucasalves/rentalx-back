const connection = require('../../database/database')
const passwordhash = require('password-hash')
const { sign } = require('jsonwebtoken')
require('dotenv/config')

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
      const token = sign({}, process.env.AUTH, {
        subject: user.id,
        expiresIn: '1d'
      })

      return res.status(200).json({ token: token, id: user.id })
    }

    return res
      .status(400)
      .json({ error: true, results: 'Algo deu errado ao fazer o login...' })
  })
}

module.exports = UserLogin
