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
  height: 102px;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${BRANCO};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 4px;

  .collunm-1,
  .collunm-2,
  .collunm-3,
  .collunm-4 {
    display: flex;
    flex-direction: column;
  }

  .collunm-1 {
    gap: 8px;
    h1 {
      font-weight: 400;
      font-size: 12.8px;
      color: ${AZUL};
      text-decoration-line: underline;
      margin: 0;
    }

    p {
      font-weight: 400;
      font-size: 12.8px;
      color: ${PRETO_10};
      margin: 0;
    }

    span {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 2px 8px;
      gap: 10px;
      border-radius: 8px;

      background-color: ${AMARELO};
      font-weight: 700;
      font-size: 16px;
      color: ${BRANCO};
    }
  }

  .collunm-2 {
    span {
      color: ${PRETO_10};
      font-style: normal;
      font-weight: 400;
      font-size: 12.8px;
    }
  }

  .collunm-3 {
    span {
      font-style: normal;
      color: ${PRETO_10};
      font-weight: 400;
      font-size: 12.8px;
    }

    p {
      font-style: normal;
      color: ${PRETO_10};
      font-weight: 500;
      font-size: 10.24px;
      margin: 0;
    }
  }

  .collunm-4 {
    text-align: right;
    .pago {
      color: ${AZUL};
      font-weight: 400;
      font-size: 12.8px;
    }
    .taxa {
      color: ${VERMELHO};
      font-weight: 500;
      font-size: 10.24px;
    }
    .repasee {
      color: ${VERDE};
      font-weight: 400;
      font-size: 12.8px;
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
