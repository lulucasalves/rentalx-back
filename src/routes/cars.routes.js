const express = require('express')
const CategoriesService = require('../modules/cars/services/CategoriesService')
const router = express.Router()

router.get('', CategoriesService)

module.exports = router
