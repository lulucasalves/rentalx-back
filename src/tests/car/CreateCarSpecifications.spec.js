const request = require('supertest')
const app = require('../../infra/server')

describe('Create new specification car', () => {
  it('must be able to create a new specification car', async () => {
    const req = {
      specification_id: '3e634d34-8789-417b-9e75-311f34c3e05f'
    }

    const res = await request(app)
      .post('/cars/specifications/c09bc332-0c41-469d-9967-72837cbb308e')
      .send(req)

    expect(res.statusCode).toBe(204)
  })
})
