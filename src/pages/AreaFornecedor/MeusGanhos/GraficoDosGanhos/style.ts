import styled from 'styled-components';

import {
  AZUL_60,
  BRANCO,
  CINZA_10,
  PRETO_10,
} from '../../../../styles/variaveis';

export const Content = styled.div`
  @media (max-width: 478px) {
    margin-top: 32px;
  }
  .detalhes {
    display: flex;
  }
`;

export const FiltrosContainer = styled.div`
  display: flex;
  align-items: center;

  p {
    margin: 0;
  }
`;

interface IFiltro {
  checked: boolean;
}

export const Filtro = styled.label<IFiltro>`
  margin: 8px;
  padding: 8px 16px;
  color: ${props => (props.checked ? BRANCO : AZUL_60)};
  background-color: ${props => (props.checked ? AZUL_60 : BRANCO)};
  border-radius: 24px;
  border: solid 1px ${AZUL_60};
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;

  input {
    display: none;
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

    span {
      font-size: 14px;
      font-weight: bold;
      color: ${PRETO_10};
    }
  }
`;

export const CardBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 60px 0;

  .descricao {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: red;
    white-space: nowrap;
  }

  .detalhes-mes {
    margin-bottom: 32px;

    span {
      font-size: 16px;
      color: ${PRETO_10};
    }
  }

  .detalhes-valor {
    margin-bottom: 20px;

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
