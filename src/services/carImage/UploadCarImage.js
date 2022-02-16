const { v4: uuid } = require('uuid')
const connection = require('../../config/database/database')
const addCarImages = require('../../config/filesAdjustments/addCarImages')
const verifyCarImages = require('../../config/filesAdjustments/verifyCarImages')
const saveLocalStorage = require('../../config/storage/SaveLocalStorage')

function UploadImagesService(req, res) {
  const id = uuid()
  const image = req.files
  const { id: car_id } = req.params

  const upload = image.map(file => file.filename)
  const uploadImageName = JSON.stringify(upload)

  verifyCarImages(car_id)

  const sql = 'DELETE FROM cars_image WHERE car_id = ?'
  connection.query(sql, [car_id], err => {
    if (err) {
      return res.status(400).json({ error: true, result: error })
    }

    const sql = 'INSERT INTO cars_image(id,images_name,car_id) VALUES (?,?,?)'
    const values = [id, uploadImageName, car_id]

    connection.query(sql, values, async error => {
      if (error) {
        return res.status(400).json({ error: true, result: error })
      }

      addCarImages(uploadImageName, 'cars')

      return res.status(201).send()
    })
  })
}

module.exports = UploadImagesService
