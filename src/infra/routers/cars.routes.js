const express = require('express')
const AdminVerification = require('../../middlewares/AdminVerification')
const UserAuth = require('../../middlewares/UserAuth')
const CreateCarsService = require('../../services/cars/CreateCarsService')
const ListCarsService = require('../../services/cars/ListCarsService')
const carSpecificationRouter = require('./carSpecifications.routes')
const carRouter = express.Router()

carRouter.post('/', CreateCarsService)
carRouter.get('/', ListCarsService)

carRouter.use('/specifications', carSpecificationRouter)

module.exports = carRouter
