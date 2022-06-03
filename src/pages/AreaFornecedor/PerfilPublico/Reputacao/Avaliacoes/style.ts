import styled from 'styled-components';

export const Content = styled.section`
  .header-recomendacao {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @media (max-width: 478px) {
    .header-recomendacao {
      display: flex;
      flex-direction: column;
    }
  }
`;

export const Avaliacao = styled.div`
  padding: 16px;
`;

export const AvaliacaoTitulo = styled.p`
  font-weight: bold;

  @media (max-width: 478px) {
    text-align: center;
  }
`;

export const AvaliacaoTexto = styled.p`
  font-style: italic;
  text-align: justify;
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

  img {
    height: 32px;
    width: 32px;
    border-radius: 50%;
    margin-right: 22px;
  }
`;

export const NenhumaAvaliacaoContent = styled.div`
  margin-top: 16px;
`;