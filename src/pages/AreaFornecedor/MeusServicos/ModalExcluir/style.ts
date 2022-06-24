import styled from 'styled-components';

import { lighten } from 'polished';
import { AZUL, BRANCO, LARANJA } from '../../../../styles/variaveis';

const Content = styled.div``;

export const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  width: 250px;
  padding: 16px 42px;
  font-weight: bold;
  color: ${BRANCO};
  background-color: ${LARANJA};
  border-radius: 8px;
  border: none;

  &:hover {
    background-color: ${lighten(0.1, LARANJA)};
    color: ${BRANCO};
  }

  @media (max-width: 478px) {
    width: 100%;
    margin-top: 16px;
    font-size: 12px;
  }
`;

export const GhostButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;
  width: 250px;
  padding: 16px 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid ${AZUL};
  color: ${AZUL};
  font-weight: bold;

  &:hover {
    color: ${BRANCO};
    background-color: ${AZUL};
    border-color: ${BRANCO};
  }

  @media (max-width: 478px) {
    width: 100%;
    font-size: 12px;
  }
`;

export default Content;
