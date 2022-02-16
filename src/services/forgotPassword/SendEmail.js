const connection = require('../../config/database/database')
const { v4: uuid } = require('uuid')
const refreshTokenFunc = require('../../config/auth/refreshToken')
const addHour = require('../../config/dates/addHour')
const { resolve } = require('path')
require('dotenv/config')

const nodemailer = require('nodemailer')
const handlebars = require('handlebars')
const fs = require('fs')

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

    nodemailer
      .createTestAccount()
      .then(async account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: { user: account.user, pass: account.pass }
        })

        const templateFileContent = fs
          .readFileSync(templatePath)
          .toString('utf-8')

        const templateParse = handlebars.compile(templateFileContent)

        const templateHTML = templateParse(variables)

        const message = await transporter
          .sendMail({
            to: 'lucas.alves.supus@outlook.com',
            from: 'Rentx <noreplay@rentx.com.br>',
            subject: 'Recuperação de senha',
            html: templateHTML
          })
          .then(info => res.status(200).send(info))
          .catch(err => res.status(400).send(err))
      })
      .catch(err => res.status(400).send(err))
  })
}

module.exports = SendEmail
