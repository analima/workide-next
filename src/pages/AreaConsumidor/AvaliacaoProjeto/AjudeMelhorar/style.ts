import styled from 'styled-components';
import {
  AZUL,
  BRANCO,
  CINZA_40,
  VERDE,
  VERMELHO,
} from '../../../../styles/variaveis';

const Content = styled.div``;

export const IndicacaoContainer = styled.div`
  margin-top: 8px;
`;

interface ILabelIndicacao {
  checked?: boolean;
}

export const LabelIndicacao = styled.div<ILabelIndicacao>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: solid 1px ${AZUL};
  margin: 8px 8px 0 0;
  background-color: ${props => (props.checked ? AZUL : BRANCO)};
  color: ${props => (props.checked ? BRANCO : AZUL)};
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    background-color: ${AZUL};
    color: ${BRANCO};
  }
`;

export const AvaliacaoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
`;

export const LabelAvaliacao = styled.label`
  font-size: 24px;
  font-weight: bold;
  color: ${CINZA_40};
`;

export const Avaliacao = styled.div`
  svg {
    font-size: 24px;
    cursor: pointer;

    :hover {
      fill: ${VERDE};
    }
  }

  svg:last-child {
    :hover {
      fill: ${VERMELHO};
    }
  }
`;

export default Content;
