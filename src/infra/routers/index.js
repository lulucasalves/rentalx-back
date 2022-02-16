const express = require('express')
const upload = require('../../config/upload')
const router = express.Router()

const carRouter = require('./cars.routes')
const categoryRouter = require('./categories.routes')
const passwordRouter = require('./password.routes')
const rentalRouter = require('./rentals.routes')
const specificationRouter = require('./specifications.routes')
const userRouter = require('./users.routes')

router.use('/categories', categoryRouter)
router.use('/specifications', specificationRouter)
router.use('/users', userRouter)
router.use('/cars', carRouter)
router.use('/rentals', rentalRouter)
router.use('/password', passwordRouter)
router.use('/avatar', express.static(`${upload.tmpFolder}/avatar`))
router.use('/cars', express.static(`${upload.tmpFolder}/cars`))

module.exports = router
