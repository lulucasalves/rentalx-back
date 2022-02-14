const request = require('supertest')
const connection = require('../../config/database/database')
const app = require('../../infra/app')

describe('Create new specification car', () => {
  it('must be able to create a new specification car', async () => {
    const req = {
      specification_id: '3e634d34-8789-417b-9e75-311f34c3e05f'
    }

    const car_id = 'c09bc332-0c41-469d-9967-72837cbb308e'

    const reqToken = {
      password: '1234',
      email: 'sfdqsdfqqf'
    }

    const getToken = await request(app).post('/users/login').send(reqToken)

    const token = getToken.body.refresh_token

    const refreshToken = await request(app)
      .post('/users/refresh')
      .send({ token: token })

    const res = await request(app)
      .post(`/cars/specifications/${car_id}`)
      .send(req)
      .set({ Authorization: 'Bearer ' + refreshToken.body })

    expect(res.statusCode).toBe(201)

    connection.query(
      'DELETE FROM specifications_cars WHERE specification_id = ? AND car_id = ?',
      [req.specification_id, car_id]
    )
  })
})
