const connection = require('../../config/database/database')
const deleteSpecifications = require('../../utils/deleteSpecifications')
const verifyCarSpecifications = require('../../utils/verifyCarSpecifications')

function updateCarSpecifications(carId, currentId) {
  verifyCarSpecifications(carId, results => {
    if (results.length > 0) {
      console.log('feito')

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
