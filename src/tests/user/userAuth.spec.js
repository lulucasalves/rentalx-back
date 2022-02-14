const request = require('supertest')
const connection = require('../../config/database/database')
const app = require('../../infra/app')

describe('Create user', () => {
  it('must be able to register a user', async () => {
    const reqUser = {
      name: 'tetaadsffgfdfaee',
      password: '1234',
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
      .post('/users/refresh')
      .send({ token: res.body.refresh_token })

    expect(getToken.statusCode).toBe(200)
  })
})
