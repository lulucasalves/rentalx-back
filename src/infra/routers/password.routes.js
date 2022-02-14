const express = require('express')
const ResetPassword = require('../../services/forgotPassword/ResetPassword')
const SendEmail = require('../../services/forgotPassword/SendEmail')
const passwordRouter = express.Router()

passwordRouter.post('/forgot', SendEmail)
passwordRouter.post('/reset', ResetPassword)

module.exports = passwordRouter
