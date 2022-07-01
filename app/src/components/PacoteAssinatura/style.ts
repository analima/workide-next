import styled from 'styled-components';
import { AZUL, BRANCO } from '../../styles/variaveis';

export const Content = styled.div`
  display: flex;
  justify-content: center;
  min-height: 633px;
  background-color: ${BRANCO};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  border-radius: 8px;

  .plano {
    margin-top: -15px;
    position: absolute;
    background-color: ${AZUL};
    color: ${BRANCO};
    border-radius: 8px;
    padding: 12px 85px;
    font-weight: bold;
  }
`;
