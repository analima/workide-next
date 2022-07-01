import styled from 'styled-components';

export const Avaliacao = styled.div`
  padding: 16px;
`;

export const AvaliacaoTitulo = styled.p`
  font-weight: bold;
`;

export const AvaliacaoTexto = styled.p`
  font-style: italic;
`;

export const AvaliacaoRodape = styled.div`
  margin-top: 32px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 478px) {
    display: grid;
    grid-template-columns: 1fr;

    span {
      margin-bottom: 16px;
    }
  }
`;

export const AvaliacaoCliente = styled.div`
  display: flex;
  justify-content: space-between;

  Image {
    height: 32px;
    width: 32px;
    border-radius: 50%;
    margin-right: 22px;
  }
`;
export const NenhumaAvaliacaoContent = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;
