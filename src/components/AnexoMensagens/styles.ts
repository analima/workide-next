import styled from 'styled-components';
import { AZUL, BRANCO, CINZA_40, VERMELHO } from '../../styles/variaveis';

interface InputProps {
  isInvalid: boolean;
}

export const Container = styled.div<InputProps>`
  .error-message {
    margin-top: 16px;
    color: ${props => props.isInvalid && VERMELHO};
  }

  .div-label {
    line-height: 32px;
    display: flex;
    align-items: center;

    input {
      display: none;
    }
  }
`;

export const Label = styled.label``;

export const Titulo = styled.div`
  padding: 0 4px;
  border: solid 1px ${CINZA_40};
  border-radius: 8px;
  color: ${CINZA_40};
  margin: 8px 4px;
`;

export const ContainerIcone = styled.div`
  padding: 10px 12px;
  margin-right: 16px;
  background-color: ${AZUL};
  border-radius: 8px;
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;

  svg {
    color: ${BRANCO};
    font-size: 20px;
  }
`;
