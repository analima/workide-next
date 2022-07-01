import styled from 'styled-components';
import { lighten } from 'polished';

import { BRANCO, CINZA_10, VERMELHO } from '../../../styles/variaveis';

import { Form } from 'react-bootstrap';

export const Content = styled.div``;

export const Button = styled.button`
  margin-left: 16px;
  width: 51px;
  height: 51px;
  border: 0;
  border-radius: 3px;
  background-color: ${props => props.color};
  color: ${BRANCO};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${props => lighten(0.1, `${props.color}`)};
  }
`;

export const Values = styled.div``;

export const Item = styled.div`
  margin-top: 8px;
  padding: 8px;
  border-radius: 3px;
  display: flex;
  background-color: ${CINZA_10};
`;

export const ItemLabel = styled.div`
  flex: 1;
`;

export const ItemAction = styled.button`
  margin-left: 16px;
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: ${VERMELHO};
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${lighten(0.1, VERMELHO)};
  }
`;

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
