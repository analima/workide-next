import styled from 'styled-components';
import { lighten } from 'polished';

import { BRANCO, CINZA_10, VERMELHO } from '../../../styles/variaveis';

import { Form } from 'react-bootstrap';

export const Content = styled.div``;

export const ContentLabel = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  width: 51px;
  height: 51px;
  border: 0;
  flex: none;
  border-radius: 3px;
  background-color: ${props => props.color};
  color: ${BRANCO};
  transition: background-color 0.2s ease-in-out;
  margin-top: auto;

  &:hover {
    background-color: ${props => lighten(0.1, `${props.color}`)};
  }
`;

export const ContentInput = styled.div`
  display: flex;
  gap: 8px;

  > div {
    display: flex;
    flex-direction: column;
  }
`;

export const InputStyled = styled.input<{ width?: string }>`
  display: flex;
  width: ${props => props.width || '100%'};
  max-width: ${props => props.width || '85px'};
  display: block;
  padding: 0.75rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  @media (max-width: 660px) {
    max-width: 100%;
    width: 100%;
  }
`;

export const Values = styled.div``;

export const Item = styled.div`
  margin-top: 8px;
  padding: 8px;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  background-color: ${CINZA_10};
`;

interface ItemProps {
  visao: string;
}

export const ItemLabel = styled.div<ItemProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  flex: 1;

  > div {
    display: flex;
    gap: 10px;
  }

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:last-child {
      overflow: visible;
      text-overflow: clip;
    }
  }
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
