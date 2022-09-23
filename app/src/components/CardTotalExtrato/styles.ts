import styled from 'styled-components';
import {
  AMARELO,
  AZUL,
  BRANCO,
  CINZA_40,
  CINZA_60,
  LARANJA,
  PRETO_10,
  VERDE,
  VERMELHO,
} from '../../styles/variaveis';

export const Content = styled.section`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 24px;

  > span {
    color: ${PRETO_10};
  }

  .info-total {
    display: flex;
    gap: 70px;

    .textos,
    .valores {
      display: flex;
      flex-direction: column;
      text-align: end;

      span {
        font-weight: 700;
        font-size: 16px;
        line-height: 150%;
      }

      .total-liberado {
        color: ${VERDE};
      }

      .total-previsto,
      .total-aguardando {
        color: ${AZUL};
      }

      .total-taxa {
        color: ${PRETO_10};
      }
    }
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 530px) {
  }

  @media (max-width: 478px) {
  }
`;

export const ContentCard = styled.div``;
