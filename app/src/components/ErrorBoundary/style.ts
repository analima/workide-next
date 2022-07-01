import { AZUL, PRETO_10 } from './../../styles/variaveis';
import styled from 'styled-components';

export const ErrorContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    color: ${AZUL};
    font-size: 38px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  p {
    font-weight: bold;
    color: ${PRETO_10};
    font-size: 20px;
  }
`;
