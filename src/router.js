const express = require('express')
const router = express.Router()
const ListCategoriesService = require('./modules/cars/services/categories/ListCategoriesService')
const CreateCategoriesService = require('./modules/cars/services/categories/CreateCategoriesService')
const CreateSpecificationsService = require('./modules/cars/services/specifications/CreateSpecificationsService')

router.get('/categories', ListCategoriesService)
router.post('/categories', CreateCategoriesService)

router.post('/specifications', CreateSpecificationsService)

module.exports = router
