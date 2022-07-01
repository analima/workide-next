const categoriasDisponiveis = [
  {
    id: 1,
    descricao: 'CONSULTOR',
  },
  {
    id: 2,
    descricao: 'COACH',
  },
  {
    id: 3,
    descricao: 'MENTOR',
  },
  {
    id: 4,
    descricao: 'ESPECIALISTA',
  },
  {
    id: 5,
    descricao: 'FREELANCER',
  },
];

export const getCategoriaEspecialidade = (id: number) => {
  const categoriaEspecialidadeEncontrada = categoriasDisponiveis.find(
    cd => cd.id === id,
  );

  return categoriaEspecialidadeEncontrada?.descricao;
};
