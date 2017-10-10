import request from 'supertest'
import app from '../../../src/app.js'

describe('GET /list', () => {
  it('should render properly with valid parameters', async () => {
    await request(app)
      .get('/list')
      .query({ title: 'List title' })
      .expect(200)
  })

  it('should error without a valid parameter', async () => {
    await request(app).get('/list').expect(422)
  })
})