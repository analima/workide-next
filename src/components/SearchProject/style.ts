import styled from 'styled-components';
import { AZUL, BRANCO } from '../../styles/variaveis';

export const ContainerStyled = styled.section`
  background: #ffffff;
  border-radius: 24px;
  padding: 16px;
  border: 2px solid #b2b3b2;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TypographyStyled = styled.p`
  font-weight: 400;
  font-size: 16px;
  color: #808080;

  margin: 0;

  @media (max-width: 478px) {
    font-size: 12px;
  }
`;

export const ButtonMainStyled = styled.button`
  background-color: ${AZUL};
  transition: all 0.2s ease-in-out;
  padding: 16px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid ${AZUL};
  color: ${BRANCO};
  font-weight: bold;
  font-size: 10px;
  text-transform: uppercase;

  &:hover {
    color: ${AZUL};
    background-color: ${BRANCO};
  }

  @media (max-width: 478px) {
    width: 100%;
    font-size: 12px;
    padding: 8px 16px;
  }
`;
