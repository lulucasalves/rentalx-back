const express = require('express')
const UploadImagesService = require('../../services/carImage/UploadCarImage')
const carImagesRouter = express.Router()
const multer = require('multer')
const upload = require('../../config/upload')

const uploadImages = multer(upload('./tmp/cars'))

carImagesRouter.post('/:id', uploadImages.array('image'), UploadImagesService)

module.exports = carImagesRouter
