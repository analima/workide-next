import styled from 'styled-components';

import { VERMELHO } from '../../styles/variaveis';

interface InputProps {
  isInvalid: boolean;
}

export const Container = styled.div<InputProps>`
  textarea {
    height: 150px;
  }

  .form-control {
    border-color: ${props => props.isInvalid && VERMELHO};
  }

  .error-message {
    color: ${props => props.isInvalid && VERMELHO};
  }
`;
