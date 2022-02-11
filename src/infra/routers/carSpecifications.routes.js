const express = require('express')
const AdminVerification = require('../../midlewares/AdminVerification')
const UserAuth = require('../../midlewares/UserAuth')
const CreateCarSpecificationsService = require('../../services/carSpecification/createSpecificationService')
const carSpecificationRouter = express.Router()

carSpecificationRouter.post(
  '/:id',
  UserAuth,
  AdminVerification,
  CreateCarSpecificationsService
)

module.exports = carSpecificationRouter
