import styled from 'styled-components';
import { AZUL, BRANCO, VERDE } from '../../styles/variaveis';

export const Content = styled.div`
  width: 100%;

  .cartao {
    max-width: 400px;
    height: 260px;
    border-radius: 16px;
    background: -webkit-linear-gradient(${AZUL}, ${VERDE});

    @media (max-width: 478px) {
      height: 198px;
    }

    .dados {
      display: flex;
      flex-direction: column;
      padding: 70px;
      font-weight: bold;
      color: ${BRANCO};

      @media (max-width: 478px) {
        padding: 32px;
      }
    }
  }
`;
