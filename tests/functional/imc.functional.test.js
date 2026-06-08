const request = require('supertest');
const app = require('../../api/server');

describe('Testes Funcionais', () => {

  test('Pessoa com peso normal retorna classificação correta', async () => {
    const res = await request(app)
      .post('/api/imc')
      .send({ peso: 70, altura: 1.75 });

    expect(res.statusCode).toBe(200);
    expect(res.body.classificacao).toBe('Peso normal');
  });

  test('Pessoa abaixo do peso retorna classificação correta', async () => {
    const res = await request(app)
      .post('/api/imc')
      .send({ peso: 45, altura: 1.70 });

    expect(res.statusCode).toBe(200);
    expect(res.body.classificacao).toBe('Abaixo do peso');
  });

  test('Pessoa com sobrepeso retorna classificação correta', async () => {
    const res = await request(app)
      .post('/api/imc')
      .send({ peso: 90, altura: 1.80 });

    expect(res.statusCode).toBe(200);
    expect(res.body.classificacao).toBe('Sobrepeso');
  });

});