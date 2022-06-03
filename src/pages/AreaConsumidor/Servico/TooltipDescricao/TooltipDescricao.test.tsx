import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { TooltipDescricao } from './index';

const cases_sucessoMock = [
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
];

describe('success case', () => {
  it('should show the presentation link', async () => {
    const { getByText, getByTestId } = render(
      <TooltipDescricao
        open={cases_sucessoMock.length > 0}
        item={cases_sucessoMock}
        servicoLink="https://example.com"
      />,
    );

    const pElement = getByText(/Mais informações acesse:/i);
    const aElement = getByTestId('more-info__link');

    expect(pElement).toBeInTheDocument();

    expect(aElement).toBeInTheDocument();
    expect(aElement).toHaveAttribute('target', '__blank');
  });
});
