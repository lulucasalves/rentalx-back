const express = require('express')
const categoryRouter = express.Router()
const multer = require('multer')

const CreateCategoriesService = require('../../services/categories/CreateCategoriesService')
const ImportCategoriesService = require('../../services/categories/ImportCategoriesService')
const ListCategoriesService = require('../../services/categories/ListCategoriesService')

const uploadTemp = multer({
  dest: './tmp'
})

categoryRouter.get('/', ListCategoriesService)
categoryRouter.post('/', CreateCategoriesService)
categoryRouter.post(
  '/import',
  uploadTemp.single('file'),
  ImportCategoriesService
)

module.exports = categoryRouter
