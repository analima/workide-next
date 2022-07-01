import styled from 'styled-components';
import { BRANCO } from '../../styles/variaveis';

export const ContainerStyled = styled.section`
  max-height: 200px;
  overflow-y: auto;
`;
type Props = {
  isItem?: boolean;
};

export const TypographyStyled = styled.p<Props>`
  padding: 8px 16px;
  background: ${props =>
    !props.isItem
      ? 'linear-gradient(0deg, rgba(73, 73, 73, 0.8), rgba(73, 73, 73, 0.8)), #FFFFFF'
      : 'linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), #FFFFFF;'};
  color: ${props => (!props.isItem ? BRANCO : '#000000')};
`;
