const express = require('express')
const categoryRouter = express.Router()
const multer = require('multer')
const AdminVerification = require('../../middlewares/AdminVerification')
const UserAuth = require('../../middlewares/UserAuth')

const CreateCategoriesService = require('../../services/categories/CreateCategoriesService')
const ImportCategoriesService = require('../../services/categories/ImportCategoriesService')
const ListCategoriesService = require('../../services/categories/ListCategoriesService')

const uploadTemp = multer({
  dest: './tmp'
})

categoryRouter.get('/', ListCategoriesService)
categoryRouter.post('/', UserAuth, AdminVerification, CreateCategoriesService)
categoryRouter.post(
  '/import',
  UserAuth,
  AdminVerification,
  uploadTemp.single('file'),
  ImportCategoriesService
)

module.exports = categoryRouter
