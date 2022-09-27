import styled from 'styled-components';
import { BRANCO_GELO, CINZA_50 } from '../../styles/variaveis';

export const Container = styled.div`
  width: 80%;
  margin: 10px auto;
  background-color: ${BRANCO_GELO};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 8px;

  span {
    font-family: 'Renner';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: ${CINZA_50};
  }

  @media (max-width: 1390px) {
    padding: 8px 10px;

    span {
      font-size: 14px;
    }
  }
`;
