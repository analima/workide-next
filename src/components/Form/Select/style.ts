import styled from 'styled-components';

import { VERMELHO } from '../../../styles/variaveis';

interface InputTextProps {
  isInvalid: boolean;
}

export const Container = styled.div<InputTextProps>`
  .form-control {
    border-color: ${props => props.isInvalid && VERMELHO};
  }

  .error-message {
    color: ${props => props.isInvalid && VERMELHO};
  }
`;
