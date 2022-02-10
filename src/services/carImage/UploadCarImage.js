const { v4: uuid } = require('uuid')
const connection = require('../../config/database/database')
const verifyCarImages = require('../../config/filesAdjustments/verifyCarImages')

function UploadImagesService(req, res) {
  const id = uuid()
  const image = req.files
  const { id: car_id } = req.params

  const upload = image.map(file => file.filename)
  const uploadImageName = JSON.stringify(upload)

  connection.query(
    'SELECT car_id FROM cars_image WHERE car_id = ?',
    [car_id],
    (err, results) => {
      if (results.length < 1) {
        const sql =
          'INSERT INTO cars_image(id,images_name,car_id) VALUES (?,?,?)'
        const values = [id, uploadImageName, car_id]

        connection.query(sql, values, error => {
          if (error) {
            return res.status(400).json({ error: true, result: error })
          }

          return res.status(204).send()
        })
      } else {
        verifyCarImages(car_id)

        const sql = 'DELETE FROM cars_image WHERE car_id = ?'
        connection.query(sql, [car_id], err => {
          if (err) {
            return res.status(400).json({ error: true, result: error })
          }

          const sql =
            'INSERT INTO cars_image(id,images_name,car_id) VALUES (?,?,?)'
          const values = [id, uploadImageName, car_id]

          connection.query(sql, values, error => {
            if (error) {
              return res.status(400).json({ error: true, result: error })
            }

            return res.status(204).send()
          })
        })
      }
    }
  )
}

module.exports = UploadImagesService
