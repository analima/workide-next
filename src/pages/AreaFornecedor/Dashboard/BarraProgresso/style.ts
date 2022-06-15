import styled from 'styled-components';

import { BRANCO, LARANJA } from '../../../../styles/variaveis';

interface BarraProgressoPropsProps {
  porcentagem?: number;
}

export const Content = styled.div<BarraProgressoPropsProps>`
  width: 100%;
  margin-top: 16px;

  .barra {
    background-color: ${BRANCO};
    margin-bottom: 8px;
    height: 32px;
    border-radius: 16px;

    .progresso {
      background-color: ${LARANJA};
      width: ${props => props.porcentagem}%;
      height: 32px;
      border-radius: 16px;
    }
  }
`;
