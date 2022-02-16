const request = require('supertest')
const app = require('../../infra/app')

describe('List user', () => {
  it('must send user info', async () => {
    const reqToken = {
      password: '1234',
      email: 'sfdqsdfqqf'
    }

    const getToken = await request(app).post('/users/login').send(reqToken)

    const token = getToken.body.token

    const res = await request(app)
      .get('/users/profile')
      .set({
        Authorization: 'Bearer ' + token
      })

    console.log(res.body)

    expect(res.statusCode).toBe(200)
  })
})
