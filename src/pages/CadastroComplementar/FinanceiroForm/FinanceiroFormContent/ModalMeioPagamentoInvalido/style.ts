import styled from 'styled-components';
import { AZUL } from '../../../../../styles/variaveis';

export const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30rem;

  padding: 2rem;

  h1 {
    text-align: center;
    width: 100%;
    color: ${AZUL};
    font-weight: bold;
  }

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;
