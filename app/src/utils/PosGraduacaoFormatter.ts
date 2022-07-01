const sentidos = [
  {
    raw: 'STRICTO_SENSU',
    formatted: 'Stricto Sensu',
  },
  {
    raw: 'LATO_SENSU',
    formatted: 'Lato Sensu',
  },
];

const tipos = [
  {
    raw: 'MBA',
    formatted: 'MBA',
  },
  {
    raw: 'ESPECIALIZACAO',
    formatted: 'Especialização',
  },
  {
    raw: 'MESTRADO',
    formatted: 'Mestrado',
  },
  {
    raw: 'DOUTORADO',
    formatted: 'Doutorado',
  },
  {
    raw: 'POS_DOC',
    formatted: 'Pós-doutorado',
  },
];

export function formatarSentido(sentido: string) {
  const sentidoEncontrado = sentidos.find(s => s.raw === sentido);

  return sentidoEncontrado ? sentidoEncontrado.formatted : sentido;
}

export function formatarTipo(tipo: string) {
  const tipoEncontrado = tipos.find(t => t.raw === tipo);

  return tipoEncontrado ? tipoEncontrado.formatted : tipo;
}
