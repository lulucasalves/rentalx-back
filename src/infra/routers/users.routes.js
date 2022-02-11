const express = require('express')
const userRouter = express.Router()
const multer = require('multer')
const UserAuth = require('../../midlewares/UserAuth')

const CreateUsersService = require('../../services/users/CreateUsersService')
const UpdateUserAvatar = require('../../services/users/UpdateUserAvatar')
const UserLogin = require('../../services/users/UserLogin')

const upload = require('../../config/upload')

const uploadAvatar = multer(upload('./tmp/avatar'))

userRouter.post('/register', CreateUsersService)
userRouter.post('/login', UserLogin)
userRouter.patch(
  '/avatar',
  UserAuth,
  uploadAvatar.single('avatar'),
  UpdateUserAvatar
)

module.exports = userRouter
