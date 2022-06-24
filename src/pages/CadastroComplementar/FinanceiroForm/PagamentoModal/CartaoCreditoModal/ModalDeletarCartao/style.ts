import {
  LARANJA,
  CINZA_30,
  PRETO_10,
} from './../../../../../../styles/variaveis';

import styled from 'styled-components';

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1rem;
  height: 30rem;

  h1 {
    font-weight: bold;
    color: ${PRETO_10};
  }

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

export const ButtonAccept = styled.button`
  min-width: 10rem;
  padding: 1rem 3rem;
  background-color: ${LARANJA};
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 6px;
`;

export const ButtonCancel = styled(ButtonAccept)`
  background-color: ${CINZA_30};
`;

export default Content;
