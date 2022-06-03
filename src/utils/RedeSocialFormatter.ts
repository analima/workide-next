const tiposDisponiveis = [
  {
    tipo: 'FACEBOOK',
    nome: 'Facebook',
  },
  {
    tipo: 'INSTAGRAM',
    nome: 'Instagram',
  },
  {
    tipo: 'LINKEDIN',
    nome: 'LinkedIn',
  },
  {
    tipo: 'TWITTER',
    nome: 'Twitter',
  },
  {
    tipo: 'YOUTUBE',
    nome: 'Youtube',
  },
];

export function formatarTipoRedeSocial(tipoRedeSocial: string) {
  const tipoEncontrado = tiposDisponiveis.find(
    tipoDisponivel => tipoDisponivel.tipo === tipoRedeSocial,
  );

  return tipoEncontrado?.nome;
}
