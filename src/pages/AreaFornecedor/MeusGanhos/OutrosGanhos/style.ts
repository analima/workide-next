import styled from 'styled-components';

import { AZUL, CINZA_10, PRETO_10 } from '../../../../styles/variaveis';

export const Content = styled.div`
  .detalhes {
    display: flex;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

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
    }
  }
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 60px 0;

  @media (max-width: 478px) {
    padding: 24px 0;
  }

  .descricao {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
  }

  .detalhes {
    display: flex;
    justify-content: space-between;
    gap: 24px;

    span {
      font-size: 16px;
      color: ${PRETO_10};
    }
  }

  .detalhes-mes {
    flex: 1;
    margin-bottom: 14px;
  }

  .detalhes-valor {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 14px;

    span {
      font-size: 16px;
      font-weight: bold;
      color: ${PRETO_10};
    }
  }
`;

export const CardContent = styled.div`
  height: 400px;

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

  .total {
    margin-top: 20px;
    text-align: center;

    span {
      font-size: 16px;
      font-weight: bold;
      color: ${PRETO_10};
  }
`;
