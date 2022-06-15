import { Form } from 'react-bootstrap';
import styled from 'styled-components';

import { CINZA_40, VERMELHO } from '../../../styles/variaveis';

interface InputProps {
  isInvalid: boolean;
}

interface LabelProps {
  required: boolean;
}

export const Container = styled.div<InputProps>`
  .form-check {
    padding: 0;
    display: flex;
    align-items: center;
  }

  .form-check-input {
    min-width: 20px;
  }

  .form-check-label {
    margin-left: 10px;
  }

  .form-control {
    border-color: ${props => props.isInvalid && VERMELHO};
  }

  .error-message {
    color: ${props => props.isInvalid && VERMELHO};
  }

  .form-check-input {
    width: 20px;
    height: 20px;
    border-radius: 8px;
    /* min-width: 20px; */
  }
`;

export const Label = styled(Form.Label)<LabelProps>``;

export const ContentStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .form-check {
    align-items: flex-start;
    margin: 4px 0;
  }

  svg {
    cursor: pointer;

    :hover {
      fill: ${CINZA_40};
    }
  }
`;
