const express = require('express')
const AdminVerification = require('../../midlewares/AdminVerification')
const UserAuth = require('../../midlewares/UserAuth')
const CreateCarsService = require('../../services/cars/CreateCarsService')
const ListCarsService = require('../../services/cars/ListCarsService')
const carImagesRouter = require('./carImages.routes')
const carSpecificationRouter = require('./carSpecifications.routes')
const carRouter = express.Router()

carRouter.post('/', UserAuth, AdminVerification, CreateCarsService)
carRouter.get('/', ListCarsService)

carRouter.use('/specifications', carSpecificationRouter)
carRouter.use('/images', carImagesRouter)

module.exports = carRouter
