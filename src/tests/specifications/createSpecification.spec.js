const request = require('supertest')
const connection = require('../../config/database/database')
const app = require('../../infra/app')

describe('Create specification', () => {
  it('must be able to create a new specification', async () => {
    const req = { name: 'test', description: 'this is a javascript test' }

    const reqToken = {
      password: 'tste',
      email: 'sfdqsdfqqf'
    }

    const getToken = await request(app).post('/users/login').send(reqToken)

    const { token } = getToken.body

    const res = await request(app)
      .post('/specifications')
      .send(req)
      .set({ Authorization: 'Bearer ' + token })

    expect(res.statusCode).toBe(201)

    connection.query('DELETE FROM specifications WHERE name = ?', [req.name])
  })
})
