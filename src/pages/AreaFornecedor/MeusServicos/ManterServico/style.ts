import styled from 'styled-components';
import { AZUL, PRETO_40, VERDE } from '../../../../styles/variaveis';

export const Content = styled.section`
  .aba-ja-preenchida {
    a {
      background-color: ${VERDE} !important;
    }
  }

  .aba-selecionada {
    a {
      background-color: ${AZUL} !important;
    }
  }

  .aba-nao-selecionada {
    a {
      background-color: ${PRETO_40};
    }
  }
`;
