const connection = require('../../config/database/database')
const passwordhash = require('password-hash')
const compareIfBefore = require('../../config/dates/compareIfBefore')
const deleteRefreshTokenByToken = require('../../config/auth/deleteRefreshTokenById')
const tokenVerification = require('../../utils/tokenVerification')

function ResetPassword(req, res) {
  const { token } = req.query
  const { password } = req.body

  tokenVerification(token, (resultsTokens, resultsUsers) => {
    if (!resultsTokens[0]) {
      return res.status(400).json({ error: true, results: 'Invalid Token' })
    }

    if (compareIfBefore(resultsTokens[0].expires_date, new Date())) {
      return res.status(400).json({ error: true, results: 'Token expired' })
    }

    if (passwordhash.verify(password, resultsUsers[0].password)) {
      return res
        .status(400)
        .json({ error: true, results: 'The password need to be different' })
    }

    const passwordHash = passwordhash.generate(password)

    const sql = `UPDATE users SET password = ? WHERE id = "${resultsTokens[0].user_id}"`

    connection.query(sql, [passwordHash], async error => {
      if (error) {
        return res.status(400).json({ error: true, results: error })
      }

      deleteRefreshTokenByToken(resultsTokens[0].id)

      return res.status(201).send()
    })
  })
}

module.exports = ResetPassword
