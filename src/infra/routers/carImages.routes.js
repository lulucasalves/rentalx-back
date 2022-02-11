const express = require('express')
const UploadImagesService = require('../../services/carImage/UploadCarImage')
const carImagesRouter = express.Router()
const multer = require('multer')
const upload = require('../../config/upload')
const UserAuth = require('../../midlewares/UserAuth')
const AdminVerification = require('../../midlewares/AdminVerification')

const uploadImages = multer(upload('./tmp/cars'))

carImagesRouter.post(
  '/:id',
  UserAuth,
  AdminVerification,
  uploadImages.array('image'),
  UploadImagesService
)

module.exports = carImagesRouter
