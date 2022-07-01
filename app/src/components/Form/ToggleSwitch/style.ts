import styled from 'styled-components';
import { AZUL, PRETO_60 } from '../../../styles/variaveis';

export const Content = styled.div`
  .form-check {
    display: flex;
    align-items: center;
    padding: 0;

    .form-check-input {
      width: 62px;
      height: 30px;
      margin: 0 16px 0 0;

      &:checked {
        background-color: ${AZUL};
      }
    }
  }

  label {
    color: ${PRETO_60};
  }
`;
