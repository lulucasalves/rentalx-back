const fs = require('fs')
const { resolve } = require('path')
const upload = require('../upload')
const { DeleteS3Storage } = require('./S3Storage')

async function deleteLocalStorage(file, folder) {
  DeleteS3Storage(file, folder)

  const filename = resolve(`${upload.tmpFolder}/${folder}`, file)


  try {
    await fs.promises.stat(filename)
  } catch {
    return
  }

  await fs.promises.unlink(filename)
}

module.exports = deleteLocalStorage
