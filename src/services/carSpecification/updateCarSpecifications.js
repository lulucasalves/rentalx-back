const connection = require('../../config/database/database')
const deleteSpecifications = require('../../utils/deleteSpecifications')
const getCarSpecifications = require('../../utils/getCarSpecifications')

function updateCarSpecifications(carId, currentId) {
  getCarSpecifications(carId, results => {
    if (results.length > 0) {

      connection.query(
        `UPDATE cars SET specifications = ? WHERE id = "${carId}"`,
        [JSON.stringify({ ...results })],
        error => {
          if (error) {
            deleteSpecifications(currentId)
            throw new Error(error)
          }
        }
      )
    }
  })
}

module.exports = updateCarSpecifications
