const multer = require('multer')
const { resolve } = require('path')
const crypto = require('crypto')

const tmpFolder = resolve(__dirname, '..', '..', 'tmp')

module.exports = {
  tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    }
  })
}
