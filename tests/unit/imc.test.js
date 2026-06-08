const request = require('supertest');
const app = require('../../api/server');

describe('Testes Unitários', () => {

  test('API está no ar', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
  });

  test('Cálculo retorna IMC correto', async () => {
    const res = await request(app)
      .post('/api/imc')
      .send({ peso: 70, altura: 1.75 });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('imc');
    expect(res.body).toHaveProperty('classificacao');
  });

});