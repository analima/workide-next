import styled from 'styled-components';
import { BRANCO, CINZA_10, LARANJA } from '../../styles/variaveis';

export const ContainerStyled = styled.div``;

export const ProgressBarStyled = styled.div`
  background-color: ${CINZA_10};
  width: 100%;
  /* min-width: 360px; */
  border-radius: 10px;
`;
type PropsPercentage = {
  percentage: number | string | undefined;
};

export const BarStyled = styled.div<PropsPercentage>`
  background-color: ${LARANJA};
  width: ${props => props.percentage + '%'};
  border-radius: 10px;
`;

export const TypographyStyled = styled.p`
  margin-left: 88%;
  margin-bottom: 0;
  font-weight: bold;
  color: ${BRANCO};
`;

export const DataStyled = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #494949;
`;
