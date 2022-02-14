const express = require('express')
const UserAuth = require('../../middlewares/UserAuth')
const CreateRentalsService = require('../../services/rental/CreateRentalsService')
const ListRentalUser = require('../../services/rental/ListRentalUser')
const ReturnRentalsService = require('../../services/rental/ReturnRentalService')
const rentalRouter = express.Router()

rentalRouter.post('/:id', UserAuth, CreateRentalsService)
rentalRouter.post('/devolution/:id', UserAuth, ReturnRentalsService)
rentalRouter.get('/', UserAuth, ListRentalUser)

module.exports = rentalRouter
