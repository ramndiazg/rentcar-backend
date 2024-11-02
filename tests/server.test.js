const request = require('supertest');
const app = require('../server');

describe('GET /api', () => {
  it('should return a 200 status code', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toBe(200);
  });
});