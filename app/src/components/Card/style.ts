import styled from 'styled-components';
import { BRANCO } from '../../styles/variaveis';

export const Content = styled.div<{ padding?: string; isShadow?: boolean }>`
  background-color: ${BRANCO};
  padding: ${props => props.padding || '32px 32px'};
  box-shadow: ${props => props.isShadow && '0px 2px 4px rgba(0, 0, 0, 0.25)'};
  border-radius: 8px;
  /* margin: 32px 0; */
  width: 100%;
`;
