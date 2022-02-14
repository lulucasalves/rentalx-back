const request = require('supertest')
const connection = require('../../config/database/database')
const app = require('../../infra/app')

describe('Create category', () => {
  it('must be able to create a new category', async () => {
    const req = { name: 'test', description: 'new category test' }

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
      .post('/categories')
      .send(req)
      .set({
        Authorization: 'Bearer ' + refreshToken.body
      })

    expect(res.statusCode).toBe(201)

    connection.query('DELETE FROM categories WHERE name = ?', [req.name])
  })
})
