import styled from 'styled-components';
import { AZUL, AZUL_60 } from '../../../../styles/variaveis';

export const Content = styled.div`
  .form-switch > label {
    font-size: 24px;
    font-weight: bold;
    color: ${AZUL};

    @media (max-width: 478px) {
      font-size: 16px;
    }
  }
`;

export const Card = styled.div`
  padding: 10px;
  border: 1px solid ${AZUL_60};
  border-radius: 7px;
`;

export const ContainerTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RequisitoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 10px;

  .form-check-input {
    width: 24px;
    height: 24px;
    margin: 0 12px;
  }

  @media (max-width: 478px) {
    padding: 16px 12px;
  }
`;

export const RequisitoLabel = styled.div``;
