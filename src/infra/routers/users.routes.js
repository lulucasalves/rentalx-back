const express = require('express')
const userRouter = express.Router()
const multer = require('multer')
const UserAuth = require('../../middlewares/UserAuth')

const CreateUsersService = require('../../services/users/CreateUsersService')
const UpdateUserAvatar = require('../../services/users/UpdateUserAvatar')
const VerifyRefreshToken = require('../../services/users/VerifyRefreshToken')
const UserLogin = require('../../services/users/UserLogin')

const upload = require('../../config/upload')
const ProfileUser = require('../../services/users/ProfileUser')

const uploadAvatar = multer(upload)

userRouter.post('/register', CreateUsersService)
userRouter.post('/login', UserLogin)
userRouter.post('/refresh', VerifyRefreshToken)
userRouter.patch(
  '/avatar',
  UserAuth,
  uploadAvatar.single('avatar'),
  UpdateUserAvatar
)
userRouter.get('/profile', UserAuth, ProfileUser)

module.exports = userRouter
