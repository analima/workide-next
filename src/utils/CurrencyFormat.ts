export const formatarValor = (valor: number) => {
  return valor?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
};

export const formatarValorParaReais = (valor: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
};
