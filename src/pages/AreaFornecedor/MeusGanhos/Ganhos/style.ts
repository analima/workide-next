import styled from 'styled-components';

import {
  AZUL,
  CINZA_10,
  PRETO_10,
  PRETO_60,
  VERDE,
} from '../../../../styles/variaveis';

const Content = styled.div``;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .dados {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
      font-size: 32px;
      font-weight: bold;
      color: ${AZUL};

      @media (max-width: 478px) {
        font-size: 18px;
      }
    }

    span {
      font-size: 14px;
      font-weight: bold;
      color: ${PRETO_10};

      @media (max-width: 478px) {
        font-size: 12px;
        text-align: center;
      }
    }
  }
`;

export const CardBody = styled.div`
  padding: 32px 64px 0;

  .descricao {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .valores {
    height: 180px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-direction: column;

    h3 {
      font-size: 16px;
      font-weight: bold;
      color: ${PRETO_60};

      :last-child {
        border-top: solid 2px ${PRETO_60};
        color: ${VERDE};
        padding-top: 12px;
      }
    }

    @media (max-width: 478px) {
      align-items: flex-start;
      margin-top: 32px;
    }
  }
`;

export const CardContent = styled.div`
  height: 300px;
  overflow-x: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar-track {
    background-color: #f4f4f4;
  }
  ::-webkit-scrollbar {
    width: 4px;
    background: #f4f4f4;
  }
  ::-webkit-scrollbar-thumb {
    background: ${CINZA_10};
  }
`;

export default Content;
