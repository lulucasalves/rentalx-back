const request = require('supertest')
const connection = require('../../config/database/database')
const app = require('../../infra/app')

describe('Create new car', () => {
  it('must be able to create a new car', async () => {
    const req = {
      name: 'Corsa',
      description: 'Corsa test car',
      daily_rate: 199.99,
      license_plate: 'test-1043',
      fine_amount: 50.21,
      brand: 'Test brand',
      category_id: '24b15116-9f78-4e48-ba9b-51cb54aec9c0',
      specification: {}
    }

    const reqToken = {
      password: '1234',
      email: 'sfdqsdfqqf'
    }

    const getToken = await request(app).post('/users/login').send(reqToken)

    const token = getToken.body.token

    const refreshToken = await request(app)
      .post('/users/refresh')
      .send({ token })

    const res = await request(app)
      .post('/cars')
      .send(req)
      .set({
        Authorization: `Bearer ${refreshToken.body}`
      })

    expect(res.statusCode).toBe(201)

    connection.query('DELETE FROM cars WHERE license_plate = ?', [
      req.license_plate
    ])
  })
})
