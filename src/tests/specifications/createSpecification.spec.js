const request = require('supertest')
const connection = require('../../config/database/database')
const app = require('../../infra/app')

describe('Create specification', () => {
  it('must be able to create a new specification', async () => {
    const req = { name: 'test', description: 'this is a javascript test' }

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
      .post('/specifications')
      .send(req)
      .set({ Authorization: 'Bearer ' + refreshToken.body })

    expect(res.statusCode).toBe(201)

    connection.query('DELETE FROM specifications WHERE name = ?', [req.name])
  })
})
