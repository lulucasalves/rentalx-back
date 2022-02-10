const request = require('supertest')
const app = require('../../infra/app')

describe('List all cars', () => {
  it('must send all cars off database', async () => {
    const res = await request(app).get('/cars')

    expect(res.statusCode).toBe(200)
    expect(res.body.result[0]).toHaveProperty('id')
  })
})
