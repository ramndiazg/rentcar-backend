const request = require('supertest');
const app = require('../server'); // Asegúrate de que la ruta es correcta

describe('GET /', () => {
  it('should return a 200 status code', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});