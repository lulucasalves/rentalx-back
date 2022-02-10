const connection = require('../database/database')
const deleteFile = require('./file')

function verifyCarImages(id) {
  connection.query(
    'SELECT images_name FROM cars_image WHERE car_id = ?',
    [id],
    (err, results) => {
      if (results.length > 0) {
        results.map(async val => {
          for (let i = 0; val.images_name.length > i; i++) {
            await deleteFile(`./tmp/cars/${val.images_name[i]}`)
          }
        })
      }
    }
  )
}

module.exports = verifyCarImages
