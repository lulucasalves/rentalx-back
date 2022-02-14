const connection = require('../../config/database/database')
const { v4: uuid } = require('uuid')
const refreshTokenFunc = require('../../config/auth/refreshToken')
const addHour = require('../../config/dates/addHour')
const NewEmail = require('./NewEmail')
const { resolve } = require('path')
require('dotenv/config')

function SendEmail(req, res) {
  const { email } = req.body

  const sql = 'SELECT * FROM users WHERE email = ?'

  connection.query(sql, [email], async (error, results) => {
    if (error) {
      return res.status(400).json({ error: true, results: error })
    }

    if (!results[0]) {
      return res.status(400).json({ error: true, results: 'User not found' })
    }

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'forgotPassword.hbs'
    )

    const token = uuid()

    const token_validation = addHour(3)

    refreshTokenFunc(token_validation, token, results[0].id)

    const variables = {
      name: results[0].name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`
    }

    await NewEmail(email, 'Recuperação de senha', variables, templatePath)

    res.status(200).send()
  })
}

module.exports = SendEmail
