const connection = require('../database/database')
const saveLocalStorage = require('../storage/SaveLocalStorage')

async function addCarImages(file, folder) {
  const files = JSON.parse(file)

  for (let i = 0; i < files.length; i++) {
    const uploadImageName = files[i]

    await saveLocalStorage(uploadImageName, folder)
  }
}

module.exports = addCarImages
