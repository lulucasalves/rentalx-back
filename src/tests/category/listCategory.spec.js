const request = require('supertest')
const app = require('../../infra/app')

describe('List all categories', () => {
  it('must send all categories off database', async () => {
    const res = await request(app).get('/categories')

    expect(res.statusCode).toBe(200)

    expect(res.body.result[0]).toHaveProperty('id')
  })
})
