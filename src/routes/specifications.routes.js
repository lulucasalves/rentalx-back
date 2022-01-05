const express = require('express')
const SpecificationsService = require('../modules/cars/services/SpecificationsService')
const router = express.Router()

router.post('', SpecificationsService)

module.exports = router