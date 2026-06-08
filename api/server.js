const express = require('express');
const cors = require('cors');
const path = require('path');
const { calcularIMC } = require('./imc');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API de IMC está funcionando!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

app.post('/api/imc', (req, res) => {
  const { peso, altura } = req.body;

  if (peso === undefined || altura === undefined) {
    return res.status(400).json({
      erro: 'Parâmetros obrigatórios: peso (kg) e altura (metros)',
    });
  }

  const pesoNum = parseFloat(peso);
  const alturaNum = parseFloat(altura);

  if (isNaN(pesoNum) || isNaN(alturaNum)) {
    return res.status(400).json({
      erro: 'Peso e altura devem ser valores numéricos',
    });
  }

  try {
    const resultado = calcularIMC(pesoNum, alturaNum);
    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
});

app.get('/api/tabela', (req, res) => {
  res.status(200).json([
    { faixa: 'Menor que 18.5', classificacao: 'Abaixo do peso', cor: '#3b82f6' },
    { faixa: '18.5 – 24.9', classificacao: 'Peso normal', cor: '#22c55e' },
    { faixa: '25.0 – 29.9', classificacao: 'Sobrepeso', cor: '#f59e0b' },
    { faixa: '30.0 – 34.9', classificacao: 'Obesidade Grau I', cor: '#f97316' },
    { faixa: '35.0 – 39.9', classificacao: 'Obesidade Grau II', cor: '#ef4444' },
    { faixa: '40.0 ou mais', classificacao: 'Obesidade Grau III', cor: '#991b1b' },
  ]);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

module.exports = app;