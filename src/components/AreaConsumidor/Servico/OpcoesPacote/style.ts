import styled, { css } from 'styled-components';
import {
  AZUL,
  BRANCO,
  LARANJA,
  PRETO_60,
  VERDE,
} from '../../../../styles/variaveis';

interface CorBotao {
  cor?: string;
}

interface ItemTipoProps {
  name?: string;
}

const Content = styled.section`
  .center {
    text-align: -webkit-center;
  }

  table {
    td {
      min-width: 264px;
      padding: 16px 8px;

      .check-pacote {
        display: flex;
        justify-content: center;
      }
    }
  }
`;

export const ItemTipo = styled.td<ItemTipoProps>`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  text-align: center;

  ${({ name }) =>
    name === 'BASICO' &&
    css`
      background-color: ${AZUL}!important;
    `}

  ${({ name }) =>
    name === 'INTERMEDIARIO' &&
    css`
      background-color: ${VERDE}!important;
    `}

    ${({ name }) =>
    name === 'AVANCADO' &&
    css`
      background-color: ${LARANJA}!important;
    `}
`;

export const ValoresFornecedor = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${VERDE};
  padding: 0 32px;
`;

export const ValoresGyan = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 0 32px;
`;

export const ValorTotal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${VERDE};
  font-weight: bold;

  .valor-fornecedor {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    width: 150px;

    span {
      font-size: 12px;
      color: ${PRETO_60};
    }
  }

  .taxa-adm {
    display: flex;
    justify-content: space-between;

    width: 150px;

    span {
      font-size: 12px;
      color: ${PRETO_60};
    }
  }

  p {
    font-size: 24px;
    margin: 0px;
  }

  span {
    font-size: 12px;
    color: ${PRETO_60};
  }
`;

export const Button = styled.button<CorBotao>`
  display: flex;
  align-items: center;
  padding: 16px 32px;
  font-weight: bold;
  color: ${BRANCO};
  background-color: ${props => (props.cor ? props.cor : AZUL)};
  border-radius: 8px;
  border: none;

  @media (max-width: 478px) {
    width: 100%;
    margin-top: 16px;
  }
`;

export default Content;
