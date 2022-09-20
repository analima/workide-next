import styled from 'styled-components';
import { BRANCO } from '../../styles/variaveis';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 54px;
  background-color: ${BRANCO};

  @media (max-width: 468px) {
    gap: 32px;
  }
`;
