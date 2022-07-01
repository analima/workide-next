import { Form } from 'react-bootstrap';
import styled from 'styled-components';

import { VERMELHO } from '../../../styles/variaveis';

interface InputProps {
  isInvalid: boolean;
}

interface LabelProps {
  required: boolean;
}

export const Container = styled.div<InputProps>`
  .form-control {
    border-color: ${props => props.isInvalid && VERMELHO};
  }

  .error-message {
    color: ${props => props.isInvalid && VERMELHO};
  }
`;

export const Label = styled(Form.Label)<LabelProps>``;
