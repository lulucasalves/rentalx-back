const express = require('express')
const AdminVerification = require('../../middlewares/AdminVerification')
const UserAuth = require('../../middlewares/UserAuth')
const CreateCarsService = require('../../services/cars/CreateCarsService')
const ListCarsService = require('../../services/cars/ListCarsService')
const carImagesRouter = require('./carImages.routes')
const carSpecificationRouter = require('./carSpecifications.routes')
const carRouter = express.Router()

carRouter.post('/', CreateCarsService)
carRouter.get('/', ListCarsService)

carRouter.use('/specifications', carSpecificationRouter)
carRouter.use('/images', carImagesRouter)

module.exports = carRouter
