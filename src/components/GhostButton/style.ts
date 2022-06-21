import styled from 'styled-components';

import { AZUL_60, BRANCO } from '../../styles/variaveis';

export const Button = styled.a`
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;
  height: 60px;
  padding: 16px 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid ${AZUL_60};
  color: ${AZUL_60};
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${BRANCO};
    background-color: ${AZUL_60};
    border-color: ${BRANCO};
  }
`;
