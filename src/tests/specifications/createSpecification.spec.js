const request = require('supertest')
const app = require('../../infra/app')

describe('Create specification', () => {
  it('must be able to create a new specification', async () => {
    const req = { name: 'vfdfsggr', description: 'test' }

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

    expect(res.statusCode).toBe(400)
  })
})
