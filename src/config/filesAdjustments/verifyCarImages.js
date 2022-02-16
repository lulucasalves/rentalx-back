const connection = require('../database/database')
const deleteLocalStorage = require('../storage/DeleteLocalStorage')

function verifyCarImages(id) {
  connection.query(
    'SELECT images_name FROM cars_image WHERE car_id = ?',
    [id],
    (err, results) => {
      if (results.length > 0) {
        results.map(async val => {
          for (let i = 0; val.images_name.length > i; i++) {
            await deleteLocalStorage(val.images_name[i], 'cars')
          }
        })
      }
    }
  )
}

module.exports = verifyCarImages
