const express = require('express')
const CreateCarSpecificationsService = require('../../services/carSpecification/createSpecificationService')
const carSpecificationRouter = express.Router()

carSpecificationRouter.post('/', CreateCarSpecificationsService)

module.exports = carSpecificationRouter
