import styled from 'styled-components';
import {
  AMARELO,
  AZUL,
  BRANCO,
  CINZA_10,
  LARANJA,
  PRETO_10,
  VERDE,
  VERDE_100,
  VERMELHO,
} from '../../styles/variaveis';

interface IStatusProps {
  status: boolean;
}

export const Content = styled.section<IStatusProps>`
  width: 100%;
  height: 120px;
  padding: 10px 16px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ status }) => (status ? CINZA_10 : BRANCO)};
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
      /* cursor: pointer; */
      font-weight: 600;
      font-size: 14px;
      letter-spacing: 0.5px;
      color: ${AZUL};
      margin: 0;

      /* :hover {
        text-decoration: underline;
      } */
    }

    p {
      font-weight: 400;
      font-size: 12.8px;
      color: ${PRETO_10};
      margin: 0;
    }

    > span {
      text-align: center;

      width: auto;
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

    .conclusao-solicitada {
      background-color: ${VERDE_100};
    }

    .desistencia-andamento {
      background-color: ${LARANJA};
    }
  }

  .collunm-2 {
    flex-direction: row;
    justify-content: center;
    gap: 20px;
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
      color: ${({ status }) => (status ? PRETO_10 : AZUL)};
      font-weight: 600;
      font-size: 12.8px;
      text-decoration: ${({ status }) => (status ? 'line-through' : 'none')};
    }
    .taxa {
      color: ${({ status }) => (status ? PRETO_10 : VERMELHO)};
      font-weight: 600;
      font-size: 12.8px;
      text-decoration: ${({ status }) => (status ? 'line-through' : 'none')};
    }
    .repase {
      color: ${({ status }) => (status ? PRETO_10 : VERDE)};
      font-weight: 600;
      text-decoration: ${({ status }) => (status ? 'line-through' : 'none')};
      font-size: 12.8px;
    }
  }

  @media (max-width: 768px) {
    height: auto;
    grid-template-columns: 1fr 1fr;
    grid-gap: 8px;

    .collunm-1 {
      > span {
        font-size: 12px;
      }
    }

    .collunm-2 {
      flex-direction: column;
    }

    .collunm-3 {
      text-align: left;
      margin-top: 16px;
    }

    .collunm-4 {
      margin-top: 16px;
      text-align: left;
    }
  }

  @media (max-width: 530px) {
  }

  @media (max-width: 478px) {
  }
`;

export const ContentCard = styled.div``;
