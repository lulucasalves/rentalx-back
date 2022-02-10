const request = require('supertest')
const app = require('../../infra/app')

describe('Create user', () => {
  it('must be able to register a user', async () => {
    const reqUser = {
      name: 'tetaadsffgfdfaee',
      password: 'tse',
      email: 'sfdqsdfqqf',
      driver_license: '44adt4444'
    }

    await request(app).post('/users/register').send(reqUser)

    const req = {
      password: reqUser.password,
      email: reqUser.email
    }

    const res = await request(app).post('/users/login').send(req)

    expect(res.statusCode).toBe(400)
  })
})
