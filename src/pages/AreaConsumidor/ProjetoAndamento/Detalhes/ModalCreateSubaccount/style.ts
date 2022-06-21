import { AZUL } from '../../../../../styles/variaveis';
import styled from 'styled-components';

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 30rem;
  padding: 30px;
  padding-left: 0;

  h1 {
    color: ${AZUL};
    font-size: 28px;
    font-weight: bold;
  }

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

export const ContainerButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
