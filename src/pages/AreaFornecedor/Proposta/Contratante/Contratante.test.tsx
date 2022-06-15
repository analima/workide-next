import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { Contratante } from './index';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

const projectMock = {
  arquivos: [],
  causaSocial: null,
  dataHoraCriacao: '2022-03-02T02:02:56.972Z',
  dataHoraFim: null,
  dataHoraInicio: null,
  dataHoraUltimaAtualizacao: '2022-03-02T02:14:15.558Z',
  dataInicioEstimada: '2022-03-03T00:00:00.000Z',
  descricao:
    'Validando duplicidade no pagamentoValidando duplicidade no pagamentoValidando duplicidade no pagamentoValidando duplicidade no pagamentoValidando duplicidade no pagamento',
  exclusivo: true,
  fornecedoresSelecionados: [],
  habilidadesComportamentais: 'Boa comunicação',
  habilidadesTecnicas: 'HTML|CSS',
  id: 280,
  idPessoaConsumidor: 313,
  idPessoaFornecedor: 358,
  niveisExperiencia: 'INTERMEDIARIO',
  nome: 'Validando duplicidade no pagamento',
  origemServico: false,
  permitePerguntas: true,
  pessoaConsumidor: {
    arquivo: {
      id: '58b83e87-35e0-44f1-aa5d-685cdbd2e48a',
      url: 'https://files-gyan-hom.s3.amazonaws.com/99e1f05dd57633c1da70-Capalinkedin.png',
    },
    ativo: true,
    consumidor: true,
    fornecedor: true,
    id: 313,
    nome: 'Alexandra Albuquerque',
    nomeTratamento: 'Ale Freelancer',
  },
  pessoaFornecedor: {
    arquivo: {
      id: '77feda6e-0412-4e29-9786-d58edb8de820',
      url: 'https://files-gyan-hom.s3.amazonaws.com/d77c3dbda3756299da77-Rafa.png',
    },
    ativo: true,
    consumidor: true,
    fornecedor: true,
    id: 358,
    nome: 'Raphael Tartaruga Ninja',
    nomeTratamento: 'RAPHAEL PREMIUM',
  },
  pessoasAtendidas: 0,
  prazoConclusao: 7,
  precoMaximo: '1600.00',
  precoMinimo: '1000.00',
  proBono: false,
  propostaAceita: null,
  status: {
    codigo: 'AGUARDANDO_PAGAMENTO',
    descricao: 'Aguardando pagamento',
  },
  subareas: [],
  usuarioUltimaAtualizacao: '99200565-f211-4a7a-8636-2c6bfe8dc904',
};

jest.mock('../../../../hooks/propostaFornecedor', () => {
  return {
    usePropostaFornecedor: () => {
      return {
        project: projectMock,
      };
    },
  };
});

describe('Contratante test', () => {
  it('should redirect to consumer profile when clicked on consumer name', async () => {
    const history = createMemoryHistory();
    history.push = jest.fn();
    const component = render(
      <Router history={history}>
        <Contratante />
      </Router>,
    );

    const consumerNameElement = component.getByTestId('consumer-name');

    expect(consumerNameElement).toBeInTheDocument();
    expect(consumerNameElement).toHaveTextContent(
      projectMock.pessoaConsumidor.nomeTratamento,
    );
    userEvent.click(consumerNameElement);
    expect(history.push).toHaveBeenCalledWith('/consumidor/perfil-publico', {
      id: undefined,
    });
  });
});
