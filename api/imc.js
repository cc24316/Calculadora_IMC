function calcularIMC(peso, altura) {
  if (typeof peso !== 'number' || typeof altura !== 'number') {
    throw new Error('Peso e altura devem ser números');
  }

  if (peso <= 0 || altura <= 0) {
    throw new Error('Peso e altura devem ser maiores que zero');
  }

  if (altura > 3) {
    throw new Error('Altura deve ser informada em metros (ex: 1.75)');
  }

  if (peso > 600) {
    throw new Error('Peso inválido');
  }

  const imc = peso / (altura * altura);
  const imcArredondado = parseFloat(imc.toFixed(2));
  const classificacao = obterClassificacao(imcArredondado);

  return {
    imc: imcArredondado,
    classificacao: classificacao.label,
    cor: classificacao.cor,
    descricao: classificacao.descricao,
  };
}

function obterClassificacao(imc) {
  if (imc < 18.5) {
    return {
      label: 'Abaixo do peso',
      cor: '#3b82f6',
      descricao: 'Seu peso está abaixo do recomendado. Consulte um nutricionista.',
    };
  } else if (imc < 25) {
    return {
      label: 'Peso normal',
      cor: '#22c55e',
      descricao: 'Parabéns! Seu peso está dentro da faixa ideal.',
    };
  } else if (imc < 30) {
    return {
      label: 'Sobrepeso',
      cor: '#f59e0b',
      descricao: 'Seu peso está levemente acima do recomendado.',
    };
  } else if (imc < 35) {
    return {
      label: 'Obesidade Grau I',
      cor: '#f97316',
      descricao: 'Obesidade grau I. Recomendamos acompanhamento médico.',
    };
  } else if (imc < 40) {
    return {
      label: 'Obesidade Grau II',
      cor: '#ef4444',
      descricao: 'Obesidade grau II. Procure orientação médica.',
    };
  } else {
    return {
      label: 'Obesidade Grau III',
      cor: '#991b1b',
      descricao: 'Obesidade grau III (mórbida). Necessário acompanhamento médico urgente.',
    };
  }
}

module.exports = { calcularIMC, obterClassificacao };