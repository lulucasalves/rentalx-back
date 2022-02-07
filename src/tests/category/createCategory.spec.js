const request = require('supertest')
const app = require('../../infra/server')

describe('Create category', () => {
  it('must be able to create a new category', async () => {
    const req = { name: 'teadssfsssdfdfffsdfee', description: 'test' }
    const res = await request(app).post('/categories').send(req)


    expect(res.statusCode).toBe(201)
  })
})
