import styled from 'styled-components';
import { LARANJA } from '../../../../styles/variaveis';

const Content = styled.section``;

export const ContentSkeleton = styled.div`
  width: 310px;
  height: 342px;
`;

export const ErrorMessage = styled.h1`
  font-size: 22px;
  color: ${LARANJA};
  width: 100%;
  text-align: center;
  font-weight: bold;
`;

export default Content;
