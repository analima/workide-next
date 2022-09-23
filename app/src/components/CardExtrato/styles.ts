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
  height: 120px;
  padding: 10px 16px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
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
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;
      letter-spacing: 0.5px;
      color: ${AZUL};
      margin: 0;

      :hover {
        text-decoration: underline;
      }
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

      font-weight: 700;
      font-size: 16px;
      color: ${BRANCO};
    }

    .andamento {
      background-color: ${AMARELO};
    }

    .aguardando-inicio {
      background-color: #159700;
    }

    .parcialmente {
      background-color: ${AZUL};
    }

    .concluido {
      background-color: ${AZUL};
    }

    .cancelado {
      color: ${PRETO_10};
      background-color: #c8c8c8;
    }
  }

  .collunm-2 {
    text-align: center;
    span,
    p {
      color: ${PRETO_10};
      font-style: normal;
      font-weight: 400;
      font-size: 12.8px;
    }
  }

  .collunm-3 {
    text-align: right;
    span {
      font-style: normal;
      color: ${PRETO_10};
      font-weight: 600;
      font-size: 12.8px;
    }
  }

  .collunm-4 {
    text-align: right;
    .pago {
      color: ${AZUL};
      font-weight: 600;
      font-size: 12.8px;
    }
    .taxa {
      color: ${VERMELHO};
      font-weight: 600;
      font-size: 12.8px;
    }
    .repasee {
      color: ${VERDE};
      font-weight: 600;
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
