const { verify, sign } = require('jsonwebtoken')
const {
  secret_refresh_token,
  expires_in_refresh_token,
  refresh_token_expires_date,
  secret_token,
  expires_in_token
} = require('../../config/auth/auth')
const userVerification = require('../../utils/userVerification')
const refreshTokenFunc = require('../../config/auth/refreshToken')
const addDays = require('../../config/dates/addDays')
const deleteRefreshToken = require('../../config/auth/deleteRefreshToken')

function VerifyRefreshToken(req, res) {
  const token =
    req.body.token || req.headers['x-access-token'] || req.query.token

  const { sub, email } = verify(token, secret_refresh_token)

  userVerification(sub, results => {
    if (!results[0].user_id || !results[0].refresh_token) {
      return res.status(401).json({
        error: true,
        results: 'invalid user'
      })
    }

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: sub,
      expiresIn: expires_in_refresh_token
    })

    const newToken = sign({}, secret_token, {
      subject: results[0].user_id,
      expiresIn: expires_in_token
    })

    deleteRefreshToken(results[0].user_id)

    const getRefreshTokenDate = addDays(refresh_token_expires_date)

    refreshTokenFunc(getRefreshTokenDate, refresh_token, results[0].user_id)

    return res.status(200).json({ newToken })
  })
}

module.exports = VerifyRefreshToken
