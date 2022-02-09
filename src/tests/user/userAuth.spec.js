const request = require('supertest')
const app = require('../../infra/server')

describe('Create user', () => {
  it('must be able to register a user', async () => {
    const reqUser = {
      name: 'tetaadsffgfdfaee',
      password: 'tste',
      email: 'sfdqqqf',
      driver_license: '444444'
    }

    await request(app).post('/users/register').send(reqUser)

    const req = {
      password: reqUser.password,
      email: reqUser.email
    }

    const res = await request(app).post('/users/login').send(req)

    const { token } = res.body

    console.log(token)

    expect(res.statusCode).toBe(200)
  })
})
