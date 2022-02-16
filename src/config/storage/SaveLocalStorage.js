const fs = require('fs')
const { resolve } = require('path')
const upload = require('../upload')
const { SaveS3Storage } = require('./S3Storage')

async function saveLocalStorage(file, folder) {
  await fs.promises.rename(
    resolve(upload.tmpFolder, file),
    resolve(`${upload.tmpFolder}/${folder}`, file)
  )

  SaveS3Storage(file, folder)

  return file
}

module.exports = saveLocalStorage
