const express = require('express')
const AdminVerification = require('../../middlewares/AdminVerification')
const UserAuth = require('../../middlewares/UserAuth')
const specificationRouter = express.Router()
const CreateSpecificationsService = require('../../services/specifications/CreateSpecificationsService')

specificationRouter.post(
  '/',
  UserAuth,
  AdminVerification,
  CreateSpecificationsService
)

module.exports = specificationRouter
