import styled from 'styled-components';
import { AZUL, BRANCO, CINZA_40 } from '../../../../styles/variaveis';

export const Content = styled.div``;

export const AvaliacaoContainer = styled.div`
  display: flex;
  margin-top: 8px;

  svg {
    width: 32px;
    height: 32px;
    cursor: pointer;

    &:hover {
      filter: brightness(1.8);
    }
  }
`;

interface ILabelHabilidade {
  checked: boolean;
}

export const LabelHabilidade = styled.label<ILabelHabilidade>`
  margin: 8px 8px 0 0;

  label {
    padding: 8px 16px;
    border-radius: 24px;
    color: ${props => (props.checked ? BRANCO : CINZA_40)};
    background-color: ${props => (props.checked ? AZUL : BRANCO)};
    border: solid 1px ${props => (props.checked ? AZUL : CINZA_40)};
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    text-align: center;

    @media (max-width: 478px) {
      display: flex;
      justify-content: center;
    }
  }

  input {
    display: none;
  }
`;
