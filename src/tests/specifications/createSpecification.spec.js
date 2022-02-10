const request = require('supertest')
const app = require('../../infra/server')

describe('Create specification', () => {
  it('must be able to create a new specification', async () => {
    const req = { name: 'vfdfsggr', description: 'test' }
    const res = await request(app).post('/specifications').send(req)

    expect(res.statusCode).toBe(201)
  })
})
