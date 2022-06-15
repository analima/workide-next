import styled from 'styled-components';
import { BRANCO, PRETO_10, VERDE } from '../../../../styles/variaveis';

export const Content = styled.div``;

export const NumeroRegistros = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: ${VERDE};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${BRANCO};
  font-weight: bold;
  font-size: 24px;
`;

export const LabelStyled = styled.label`
  font-size: 16px;
  font-weight: 700;
  color: ${PRETO_10};
`;
