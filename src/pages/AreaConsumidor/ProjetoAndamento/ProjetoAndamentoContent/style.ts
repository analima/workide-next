import styled from 'styled-components';
import { AZUL, BRANCO } from '../../../../styles/variaveis';

const Content = styled.div``;

export const Button = styled.button`
  padding: 16px 40px;
  width: 142px;
  font-weight: bold;
  color: ${AZUL};
  background-color: ${BRANCO};
  border-radius: 8px;
  border: 1px solid ${AZUL};
  font-size: 12px;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${AZUL};
    color: ${BRANCO};
  }

  @media (max-width: 478px) {
    width: 100%;
    margin-top: 16px;
  }
`;

export default Content;
