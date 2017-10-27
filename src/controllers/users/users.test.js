import request from 'supertest'
import app from '../../../src/app.js'

describe('GET /token', () => {
  it('should render properly', async () => {
    await request(app).get('/token').expect(200)
  })
})