export const etapasMock = [
  { concluida: true, data: '28/09/2021', descricao: 'Projeto criado' },
  { concluida: false, data: '28/09/2021', descricao: 'Proposta Enviada' },
  { concluida: false, descricao: 'Solicitou revisão' },
  { concluida: false, descricao: 'Aceitou a proposta' },
  { concluida: false, descricao: 'Pagamento efetuado' },
  { concluida: false, descricao: 'Projeto em andamento' },
  { concluida: false, descricao: 'Projeto concluido' },
];

export const projetoMock = {
  sobre:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor in amet arcu imperdiet facilisi tellus sed eu. Consectetur accumsan, aliquam malesuada faucibus eu sagittis purus.',
  area: 'Tecnologia da Informação',
  subarea: ['Design de Interfaces', 'Web Desin', 'Criação de Sites'],
  experiencia: 'Intermediário',
  inicio: 'Imediato',
  conclusao: '15 dias',
  habilidades: [
    'Figma',
    'Design System',
    'Paleta de Cores',
    'Componentização',
    'Pontualidade',
    'Figma',
    'Design System',
    'Paleta de Cores',
    'Componentização',
    'Pontualidade',
  ],
  anexos: [
    {
      nome: 'IMG_6413.jpg',
      url: 'https://www.petlove.com.br/images/breeds/193223/profile/original/golden_retriever-p.jpg?1532539102',
    },
    {
      nome: 'IMG_6614.jpg',
      url: 'https://t2.ea.ltmcdn.com/pt/images/5/3/3/img_coisas_a_ter_em_conta_antes_de_adotar_um_golden_retriever_21335_orig.jpg',
    },
    {
      nome: 'IMG_6919.jpg',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7F7J_reQ9O72Zuolnh_ZihlgZecHS3F4n1BVODQisXvyQx7xBdEYSN4K-J6_j2orzzt4&usqp=CAU',
    },
  ],
  preco: 'R$ 50,00 à R$ 100,00',
};

export const perguntasMock = [
  {
    pergunta: {
      id: 1,
      data: '26/11/2021',
      texto: 'Como isso foi feito?',
      autor: 'Lizandro Kenedy',
    },
    resposta: {
      id: 1,
      id_resposta: 1,
      data: '26/11/2021',
      texto: 'Componentizando tudo :D',
      autor: 'Lizandro Kenedy',
    },
  },
  {
    pergunta: {
      id: 2,
      data: '26/11/2021',
      texto: 'Como isso foi feito?',
      autor: 'Lizandro Kenedy',
    },
    resposta: {
      id: 2,
      id_resposta: 2,
      data: '26/11/2021',
      texto: 'Componentizando tudo :D',
      autor: 'Lizandro Kenedy',
    },
  },
  {
    pergunta: {
      id: 3,
      data: '26/11/2021',
      texto: 'Como isso foi feito?',
      autor: 'Lizandro Kenedy',
    },
  },
];

export const propostasMock = [
  {
    id: 1,
    type: 'PF',
    portion: 3,
    value: 50,
    status: 'Analisar',
    name: 'Gabriel Brune',
    date: '2021-11-28T15:15:00.000Z',
  },
  {
    id: 2,
    type: 'PF',
    portion: 3,
    value: 50,
    status: 'Recusado',
    name: 'Gabriel Brune',
    date: '2021-11-28T15:15:00.000Z',
  },
  {
    id: 3,
    type: 'PF',
    portion: 3,
    value: 50,
    status: 'Aguardando',
    name: 'Gabriel Brune',
    date: '2021-11-28T15:15:00.000Z',
  },
];

export const requisitosMock = [
  { status: 'entregue', data_envio: '07/12/2021', descricao: 'Requisito 1' },
  { status: 'entregue', data_envio: '08/12/2021', descricao: 'Requisito 2' },
  { status: 'em_analise', data_envio: '09/12/2021', descricao: 'Requisito 3' },
  { status: 'pendente', descricao: 'Requisito 4' },
];

export const metodosMock = [
  { status: 'entregue', data_envio: '07/12/2021', descricao: 'Requisito 1' },
  { status: 'em_analise', data_envio: '08/12/2021', descricao: 'Requisito 2' },
  { status: 'pendente', descricao: 'Requisito 3' },
  { status: 'pendente', descricao: 'Requisito 4' },
];
