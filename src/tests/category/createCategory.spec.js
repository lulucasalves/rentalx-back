const request = require('supertest')
const connection = require('../../config/database/database')
const app = require('../../infra/app')

describe('Create category', () => {
  it('must be able to create a new category', async () => {
    const req = { name: 'test', description: 'new category test' }

    const reqToken = {
      password: 'tste',
      email: 'sfdqsdfqqf'
    }

    const getToken = await request(app).post('/users/login').send(reqToken)

    const { token } = getToken.body

    const res = await request(app)
      .post('/categories')
      .send(req)
      .set({
        Authorization: 'Bearer ' + token
      })

    expect(res.statusCode).toBe(201)

    connection.query('DELETE FROM categories WHERE name = ?', [req.name])
  })
})
