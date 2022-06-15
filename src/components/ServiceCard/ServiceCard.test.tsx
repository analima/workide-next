import { render } from '@testing-library/react';
import { ServiceCard } from '.';
import { IServicoInfo } from '../../interfaces/IServicoInfo';

import '@testing-library/jest-dom';

const serviceMock: IServicoInfo = {
  areas_atuacao: '',
  arquivo: {
    data_ultima_alteracao: '2022-03-01T14:46:51.120Z',
    id: '1220c386-dd5c-43e3-a49c-2890db01db39',
    nome: '4a56633264bc2ad07308-Magalu_1.png',
    url: 'https://files-gyan-hom.s3.amazonaws.com/4a56633264bc2ad07308-Magalu_1.png',
  },
  ativo: true,
  cases_sucesso: [
    {
      data_hora_criacao: '2022-03-01T14:53:48.467Z',
      data_hora_ultima_alteracao: '2022-03-01T14:53:48.467Z',
      id: 40,
      link: null,
      problema:
        'Aplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo Magaluv',
      resultado:
        'Aplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo Magalu',
      setor: 'Privado',
      solucao:
        'Aplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo MagaluAplicativo Magaluv',
      titulo: 'Aplicativo Magalu',
      total_horas: 30,
      usuario_ultima_alteracao: '58a214b1-7b2c-4331-9737-02cea6b0b615',
    },
  ],
  data_hora_criacao: '2022-03-01T14:52:12.775Z',
  data_hora_ultima_alteracao: '2022-03-01T14:52:12.775Z',
  descricao:
    'Descrição da oferta do serviço Magalu 1. Descrição da oferta do serviço Magalu 1. ',
  habilidades_tecnicas: 'Javascript|3D Sculpting',
  id: 106,
  id_arquivo: '1220c386-dd5c-43e3-a49c-2890db01db39',
  id_pessoa: 361,
  idPessoa: 361,
  itens: [
    {
      avancado: true,
      basico: true,
      data_hora_criacao: '2022-03-02T01:02:52.470Z',
      data_hora_ultima_alteracao: '2022-03-02T01:02:52.470Z',
      descricao: 'Entrega Magalu ',
      id: 236,
      intermediario: true,
      usuario_ultima_alteracao: '58a214b1-7b2c-4331-9737-02cea6b0b615',
    },
  ],
  nome: 'Serviço Magalu',
  pacotes: [
    {
      data_hora_criacao: '2022-03-01T14:52:12.775Z',
      data_hora_ultima_alteracao: '2022-03-02T04:02:52.470Z',
      descricao:
        'Serviço Magalu Avançado Serviço Magalu Avançado Serviço Magalu Avançado Serviço Magalu Avançado ',
      id: 172,
      nome: 'Serviço Magalu Avançado ',
      parcelas: 1,
      prazo: 30,
      preco: '3520.00',
      taxa: '176',
      tempo: 20,
      tipo: 'AVANCADO',
      usuario_ultima_alteracao: '58a214b1-7b2c-4331-9737-02cea6b0b615',
    },
    {
      data_hora_criacao: '2022-03-01T14:52:12.775Z',
      data_hora_ultima_alteracao: '2022-03-02T04:02:52.470Z',
      descricao:
        'Serviço Magalu IntermediárioServiço Magalu IntermediárioServiço Magalu IntermediárioServiço Magalu Intermediário',
      id: 171,
      nome: 'Serviço Magalu Intermediário',
      parcelas: 1,
      prazo: 30,
      preco: '2530.00',
      taxa: '126.5',
      tempo: 20,
      tipo: 'INTERMEDIARIO',
      usuario_ultima_alteracao: '58a214b1-7b2c-4331-9737-02cea6b0b615',
    },
    {
      data_hora_criacao: '2022-03-01T14:52:12.775Z',
      data_hora_ultima_alteracao: '2022-03-02T04:02:52.470Z',
      descricao:
        'Serviço Magalu BasicoServiço Magalu BasicoServiço Magalu BasicoServiço Magalu Basico',
      id: 170,
      nome: 'Serviço Magalu Basico',
      parcelas: 1,
      prazo: 30,
      preco: '1530.00',
      taxa: '76.5',
      tempo: 20,
      tipo: 'BASICO',
      usuario_ultima_alteracao: '58a214b1-7b2c-4331-9737-02cea6b0b615',
    },
  ],
  primeira_reuniao_obrigatoria: false,
  requisitos: [
    {
      data_hora_criacao: '2022-03-01T14:52:25.424Z',
      data_hora_ultima_alteracao: '2022-03-01T14:52:25.424Z',
      descricao: 'Requisito 1 Magalu',
      id: 94,
      usuario_ultima_alteracao: '58a214b1-7b2c-4331-9737-02cea6b0b615',
    },
  ],
  servicos_extra: [],
  subareas: [],
  termo_autoria: true,
  url_apresentacao: 'https://example.com',
  usuario_ultima_alteracao: '58a214b1-7b2c-4331-9737-02cea6b0b615',
  favoritos: 0,
  compartilhamentos: 0,
  projetosIniciados: 0,
  fornecedor: {
    id: 1,
    nome_tratamento: 'John Doe',
    foto: {
      id: '123',
      url: 'htt://example.com',
    },
    ranking: {
      id: 1,
      nota_media: 4,
    },
  },
};

describe('service card tests', () => {
  it('should service is favorite', async () => {
    let [isFavorite, setIsFavorite] = [true, jest.fn()];

    const componentFavorite = render(
      <ServiceCard
        service={serviceMock}
        isFavorite={isFavorite}
        setIsFavorite={setIsFavorite}
      />,
    );

    const heartElementOn = componentFavorite.getByTestId('content__heart--on');
    expect(heartElementOn).toBeInTheDocument();
  });

  it('should service is not favorite', async () => {
    let [isFavorite, setIsFavorite] = [false, jest.fn()];

    const componentNotFavorite = render(
      <ServiceCard
        service={serviceMock}
        isFavorite={isFavorite}
        setIsFavorite={setIsFavorite}
      />,
    );

    const heartElementOff = componentNotFavorite.getByTestId(
      'content__heart--off',
    );

    expect(heartElementOff).toBeInTheDocument();
  });

  it('should show service name', async () => {
    const { getByTestId } = render(
      <ServiceCard service={serviceMock} isFavorite={false} />,
    );

    const nameElement = getByTestId('content__name');
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveTextContent(serviceMock.nome);
  });

  it('should show service description', async () => {
    const { getByTestId } = render(
      <ServiceCard service={serviceMock} isFavorite={false} />,
    );

    const descriptionElement = getByTestId('content__description');

    expect(descriptionElement).toBeInTheDocument();
  });
});
