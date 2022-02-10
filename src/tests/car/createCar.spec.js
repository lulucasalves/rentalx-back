const request = require('supertest')
const app = require('../../infra/server')

describe('Create new car', () => {
  it('must be able to create a new car', async () => {
    const req = {
      name: 'fwrfrf',
      description: 'dfsdfsdfdf',
      daily_rate: 102.22,
      license_plate: 'btc-123',
      fine_amount: 10.11,
      brand: '124fndfknsf',
      category_id: '24b15116-9f78-4e48-ba9b-51cb54aec9c0',
      specification: {}
    }

    const res = await request(app).post('/cars').send(req)

    console.log(req)

    expect(res.statusCode).toBe(201)
  })
})
