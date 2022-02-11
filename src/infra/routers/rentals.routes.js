const express = require('express')
const UserAuth = require('../../midlewares/UserAuth')
const CreateRentalsService = require('../../services/rental/CreateRentalsService')
const rentalRouter = express.Router()

rentalRouter.post('/:id', UserAuth, CreateRentalsService)

module.exports = rentalRouter
