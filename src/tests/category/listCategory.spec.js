const request = require('supertest')
const app = require('../../infra/server')

describe('List all categories', () => {
  it('must send all categories off database', async () => {
    const res = await request(app).get('/categories')

    expect(res.statusCode).toBe(200)
  })
})
