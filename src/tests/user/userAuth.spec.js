const request = require('supertest')
const connection = require('../../config/database/database')
const app = require('../../infra/app')

describe('Create user', () => {
  it('must be able to register a user', async () => {
    const reqUser = {
      name: 'tetaadsffgfdfaee',
      password: 'tste',
      email: 'sfdqsdfqqf',
      driver_license: '44adt4444'
    }

    await request(app).post('/users/register').send(reqUser)

    const req = {
      password: reqUser.password,
      email: reqUser.email
    }

    const res = await request(app).post('/users/login').send(req)

    const getToken = await request(app)
      .get('/users/refresh')
      .send({ token: res.body.refresh_token })

    expect(getToken.statusCode).toBe(200)

    connection.query('DELETE FROM users_tokens WHERE user_id = ?', [
      res.body.user.id
    ])
  })
})
