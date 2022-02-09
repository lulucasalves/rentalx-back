const express = require('express')
const router = express.Router()

const carRouter = require('./cars.routes')
const categoryRouter = require('./categories.routes')
const specificationRouter = require('./specifications.routes')
const userRouter = require('./users.routes')

router.use('/categories', categoryRouter)
router.use('/specifications', specificationRouter)
router.use('/users', userRouter)
router.use('/cars', carRouter)

module.exports = router
