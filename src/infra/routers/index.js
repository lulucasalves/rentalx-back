const express = require('express')
const router = express.Router()

const carRouter = require('./cars.routes')
const categoryRouter = require('./categories.routes')
const rentalRouter = require('./rentals.routes')
const specificationRouter = require('./specifications.routes')
const userRouter = require('./users.routes')

router.use('/categories', categoryRouter)
router.use('/specifications', specificationRouter)
router.use('/users', userRouter)
router.use('/cars', carRouter)
router.use('/rentals', rentalRouter)

module.exports = router
