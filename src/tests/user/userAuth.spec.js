const request = require('supertest')
const app = require('../../infra/server')

describe('Create user', () => {
  it('must be able to register a user', async () => {
    const reqUser = {
      name: 'tetaadsffaaaee',
      password: 'tste',
      email: 'tefgcdddfrvssffdgfddsfdffgdt',
      driver_license: '114cvvcv32fdsd99fds4234'
    }

    await request(app).post('/register').send(reqUser)

    const req = {
      password: reqUser.password,
      email: reqUser.email
    }

    const res = await request(app).post('/login').send(req)

    const { token } = res.body

    expect(res.statusCode).toBe(200)
  })
})
