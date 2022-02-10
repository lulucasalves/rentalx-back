const express = require('express')
const AdminVerification = require('../../middlewares/AdminVerification')
const UserAuth = require('../../middlewares/UserAuth')
const CreateCarSpecificationsService = require('../../services/carSpecification/createSpecificationService')
const carSpecificationRouter = express.Router()

carSpecificationRouter.post('/:id',UserAuth, AdminVerification, CreateCarSpecificationsService)

module.exports = carSpecificationRouter
