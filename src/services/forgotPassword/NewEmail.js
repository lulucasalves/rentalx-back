const nodemailer = require('nodemailer')
const handlebars = require('handlebars')
const fs = require('fs')

async function NewEmail(to, subject, variables, path) {
  nodemailer
    .createTestAccount()
    .then(async account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: { user: account.user, pass: account.pass }
      })

      const templateFileContent = fs.readFileSync(path).toString('utf-8')

      const templateParse = handlebars.compile(templateFileContent)

      const templateHTML = templateParse(variables)

      const message = await transporter.sendMail({
        to: 'lucas.alves.supus@outlook.com',
        from: 'Rentx <noreplay@rentx.com.br>',
        subject,
        html: templateHTML
      })

      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
    })
    .catch(err => console.error(err))
}

module.exports = NewEmail
