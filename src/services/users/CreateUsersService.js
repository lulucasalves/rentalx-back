const { v4: uuid } = require('uuid')
const passwordhash = require('password-hash')
const connection = require('../../database/database')

function CreateUsersService(req, res) {
  const id = uuid()
  const { name, password, email, driver_license } = req.body

  const passwordHash = passwordhash.generate(password)

  const sql =
    'INSERT INTO users(id,name,password,email,driver_license) VALUES (?,?,?,?,?)'
  const values = [id, name, passwordHash, email, driver_license]

  connection.query(sql, values, error => {
    if (error) {
      return res.status(400).json({ error: true, result: error })
    }

    return res.status(201).send()
  })
}

module.exports = CreateUsersService
