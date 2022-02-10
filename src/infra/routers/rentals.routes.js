const express = require('express')
const UserAuth = require('../../middlewares/UserAuth')
const CreateRentalsService = require('../../services/rental/CreateRentalsService')
const rentalRouter = express.Router()

rentalRouter.post('', UserAuth, CreateRentalsService)

module.exports = rentalRouter
