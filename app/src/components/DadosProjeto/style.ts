import styled from 'styled-components';
import {
  VERDE,
  BRANCO,
  BRANCO_GELO,
  AZUL_60,
  LARANJA,
  PRETO_60,
  CINZA_40,
  CINZA_10,
  AZUL,
} from '../../styles/variaveis';
import { Table } from 'react-bootstrap';

export const Content = styled.div`
  height: 100%;
  display: flex;

  .selected-items__container-icons-export {
    margin-left: auto;
    background: ${CINZA_10};
    width: 40px;
    height: 40px;
    border-radius: 10px;
    border: 1px solid ${AZUL};
    display: flex;
    max-width: 50px;
    justify-content: center;
    align-items: center;

    > div {
      cursor: pointer;
    }
  }

  @media (max-width: 478px) {
    .headerDadosProjeto {
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .dadosProjeto {
      display: flex;
      flex-direction: column;
    }
  }
`;

export const FaixaPreco = styled.span`
  color: ${VERDE};
  font-weight: bold;
  font-size: 20px;
`;

export const ContainerAnexos = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
`;

export const Anexo = styled.a`
  text-decoration: none;
  color: ${BRANCO};
  font-size: 14px;
  text-align: center;
  width: 80px;
  border-radius: 5px;
  padding: 5px;
  background-color: ${AZUL_60};
  &:hover {
    color: ${BRANCO_GELO};
  }
`;
type Props = {
  color: string;
  recused?: boolean;
};

export const ButtonMainStyled = styled.button<Props>`
  background-color: ${props =>
    props.color !== 'DEFAULT' ? props.color : '#FFF'};
  transition: all 0.2s ease-in-out;
  padding: 16px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid
    ${props => (props.color !== 'DEFAULT' ? props.color : AZUL_60)};
  color: ${props => (props.color !== 'DEFAULT' ? BRANCO : AZUL_60)};
  font-weight: bold;
  font-size: 10px;
  text-transform: uppercase;

  &:hover {
    color: ${props => (props.color !== 'DEFAULT' ? AZUL_60 : BRANCO)};
    color: ${props => props.recused && LARANJA};
    background-color: ${props =>
      props.color !== 'DEFAULT' ? BRANCO : AZUL_60};
  }

  @media (max-width: 478px) {
    width: 100%;
    font-size: 12px;
  }
`;

export const ContainerBody = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${AZUL_60};
  border-radius: 8px;
  padding: 16px;
  margin-top: 42px;
  gap: 40px;
`;

export const TableItens = styled(Table)`
  display: flex;
  margin-top: 40px;

  border-collapse: separate;
  border-spacing: 0 8px;
  margin-top: -8px;

  tr {
    border: 1px solid ${BRANCO};

    > td {
      &:last-child {
        width: auto;
      }
    }
  }

  td {
    width: 200px;
    padding: 10px;
    color: ${PRETO_60};

    strong {
      color: ${VERDE};
    }
  }

  @media (max-width: 768px) {
    tr {
      display: flex;
      flex-direction: column;
    }
  }
`;

export const LabelDefault = styled.label`
  padding: 4px 16px;
  border: solid 1px ${CINZA_40};
  border-radius: 8px;
  margin: 4px;
  color: ${CINZA_40};
  font-size: 12px;
  font-weight: bold;
`;

export const TextoDescricao = styled.span`
  word-break: break-word;
`;
