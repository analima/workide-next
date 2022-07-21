import { lighten } from 'polished';
import styled from 'styled-components';
import { AZUL, BRANCO, LARANJA, VERDE } from '../../../styles/variaveis';

export const Content = styled.section`
  width: 100vw;
  mim-height: 530px;
  padding: 40px 0;
  background-image: linear-gradient(${AZUL}, ${VERDE});
  text-align: center;
  color: ${BRANCO};
  align-items: center;

  div {
    max-width: 500px;

    h2 {
      font-size: 39px;
    }

    p {
      margin: 24px 0;
    }

    .button {
      font-size: 1rem;
      width: 200px;
      background-color: ${LARANJA};
      color: ${BRANCO};
      padding: 16px 0;
      font-weight: bold;
      border-radius: 8px;
      margin-right: 8px;
      font-weight: bold;

      &:hover {
        background-color: ${lighten(0.05, LARANJA)};
        color: ${BRANCO};
      }
    }
  }
`