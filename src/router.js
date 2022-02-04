const express = require('express')
const router = express.Router()
const multer = require('multer')

const ListCategoriesService = require('./services/categories/ListCategoriesService')
const CreateCategoriesService = require('./services/categories/CreateCategoriesService')
const CreateSpecificationsService = require('./services/specifications/CreateSpecificationsService')
const ImportCategoriesService = require('./services/categories/ImportCategoriesService')
const CreateUsersService = require('./services/users/CreateUsersService')
const UserLogin = require('./services/users/UserLogin')
const UserAuth = require('./middlewares/UserAuth')
const UpdateUserAvatar = require('./services/users/UpdateUserAvatar')
const upload = require('./config/upload')

const uploadTemp = multer({
  dest: './tmp'
})

const uploadAvatar = multer(upload('./tmp/avatar'))

//Categorias
router.get('/categories', ListCategoriesService)
router.post('/categories', CreateCategoriesService)
router.post(
  '/categories/import',
  uploadTemp.single('file'),
  ImportCategoriesService
)

//Especificações
router.post('/specifications', CreateSpecificationsService)

//Usuários
router.post('/register', CreateUsersService)
router.post('/login', UserLogin)
router.patch(
  '/avatar',
  UserAuth,
  uploadAvatar.single('avatar'),
  UpdateUserAvatar
)

module.exports = router
