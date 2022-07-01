const etapasMock = [
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

export default etapasMock;
