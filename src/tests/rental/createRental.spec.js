const request = require('supertest')
const connection = require('../../config/database/database')
const app = require('../../infra/app')

describe('Create a rental', () => {
  it('Must be able to create a new rental', async () => {
    const req = { expected_return_date: '2022-07-02' }

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
      .post(`/rentals/${car_id}`)
      .send(req)
      .set({
        Authorization: 'Bearer ' + refreshToken.body
      })

    expect(res.statusCode).toBe(201)

    connection.query('DELETE FROM rentals WHERE car_id = ?', [car_id])
    connection.query(`UPDATE cars SET available = ${true} WHERE id = ?`, [
      car_id
    ])
  })
})
