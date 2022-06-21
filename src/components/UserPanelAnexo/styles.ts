import styled from 'styled-components';
import { BRANCO, AZUL_60, BRANCO_GELO } from '../../styles/variaveis';

export const ContainerStyled = styled.div`
  background-color: ${BRANCO};
  display: flex;
  grid-gap: 15px;
`;

export const ContentImageStyled = styled.div`
  img {
    border-radius: 50%;
    width: 58px;
    height: 58px;
  }
`;
export const ContentInfoStyled = styled.div`
  max-width: 378px;
`;

export const TypographyNameStyled = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #494949;
  margin-bottom: 0px;
`;

export const ContainerAnexos = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
`;

export const Anexo = styled.a`
  text-decoration: none;
  color: ${BRANCO};
  font-size: 14px;
  text-align: center;
  border-radius: 5px;
  padding: 5px;
  background-color: ${AZUL_60};
  &:hover {
    color: ${BRANCO_GELO};
  }
`;
