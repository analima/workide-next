import styled from 'styled-components';
import { lighten } from 'polished';

import { AZUL, BRANCO } from '../../styles/variaveis';

interface LabelCheckProps {
  checked: boolean;
}

export const Container = styled.div<LabelCheckProps>`
  input {
    display: none;
  }

  label {
    cursor: pointer;
    background-color: ${props => (props.checked ? AZUL : BRANCO)};
    color: ${props => (props.checked ? BRANCO : AZUL)};
    padding: 16px 32px;
    border-radius: 5px;
    font-weight: bold;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out;

    &:hover {
      box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
    }

    &:active {
      background-color: ${props =>
        props.checked ? lighten(0.5, BRANCO) : lighten(0.5, AZUL)};
    }
  }
`;
