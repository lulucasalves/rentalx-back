const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({
  dest: './tmp'
})

const ListCategoriesService = require('./modules/cars/services/categories/ListCategoriesService')
const CreateCategoriesService = require('./modules/cars/services/categories/CreateCategoriesService')
const CreateSpecificationsService = require('./modules/cars/services/specifications/CreateSpecificationsService')
const ImportCategoriesService = require('./modules/cars/services/categories/ImportCategoriesService')

router.get('/categories', ListCategoriesService)
router.post('/categories', CreateCategoriesService)
router.post('/categories/import', upload.single('file'), ImportCategoriesService)

router.post('/specifications', CreateSpecificationsService)

module.exports = router
