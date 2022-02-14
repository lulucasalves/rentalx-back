const request = require('supertest')
const app = require('../../infra/app')

describe('List all rentals of user', () => {
  it('must send all categories off database', async () => {
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
      .get('/rentals')
      .set({
        Authorization: 'Bearer ' + refreshToken.body
      })

    expect(res.statusCode).toBe(200)
  })
})
