import styled from 'styled-components';
import { PRETO_60, VERDE } from '../../../../styles/variaveis';

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

export const CardReputacao = styled.div`
  padding: 32px;
  border: 1px solid ${VERDE};
  border-radius: 8px;
  margin: 16px 0;
  max-height: 662px;
  overflow: scroll;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  -ms-overflow-style: none; /* IE 10+ */
  scrollbar-width: none; /* Firefox */
`;

export const Avaliacao = styled.div`
  padding: 16px;
`;

export const AvaliacaoTitulo = styled.p`
  font-weight: bold;
  font-size: 18px;
  color: ${PRETO_60};
  margin: 0;
`;

export const AvaliacaoTexto = styled.p`
  font-style: italic;
  color: ${PRETO_60};
`;

export const AvaliacaoRodape = styled.div`
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
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;
