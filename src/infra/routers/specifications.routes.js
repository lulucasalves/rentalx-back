const express = require('express')
const AdminVerification = require('../../midlewares/AdminVerification')
const UserAuth = require('../../midlewares/UserAuth')
const specificationRouter = express.Router()
const CreateSpecificationsService = require('../../services/specifications/CreateSpecificationsService')

specificationRouter.post(
  '/',
  UserAuth,
  AdminVerification,
  CreateSpecificationsService
)

module.exports = specificationRouter
