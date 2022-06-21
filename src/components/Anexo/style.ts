import { lighten } from 'polished';
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

export const ContainerAnexos = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;

  @media (max-width: 478px) {
    grid-template-columns: auto;
  }
`;

export const LabelAnexo = styled.a`
  padding: 4px 8px;
  border: solid 1px ${AZUL};
  border-radius: 8px;
  text-decoration: none;
  color: ${AZUL};
  margin: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  svg {
    margin-left: 8px;
  }

  &:hover {
    color: ${lighten(0.1, AZUL)};
  }
`;
