const express = require('express')
const specificationRouter = express.Router()
const CreateSpecificationsService = require('../../services/specifications/CreateSpecificationsService')

specificationRouter.post('/', CreateSpecificationsService)

module.exports = specificationRouter
