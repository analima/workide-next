import styled from 'styled-components';
import { BRANCO } from '../../styles/variaveis';

export const ContainerStyled = styled.div`
  background-color: ${BRANCO};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  width: 100%;
  height: 140px;
  padding-bottom: 15px;
  padding-top: 18px;
  padding-left: 15px;
  padding-right: 17px;
  cursor: pointer;
`;

export const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`

export const TypographyDateStyled = styled.p`
  font-weight: 400;
  font-size: 12px;
  color: #494949;
  line-height: 20px;
  margin-bottom: 4px;
`

export const TypographyNameStyled = styled.p`
  font-weight: 400;
  font-size: 16px;
  color: #494949;
  margin-bottom: 4px;
`

export const TypographyValueStyled = styled.p`
  color: #494949;
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 0;
  span{
    font-size: 16px;
  }
`
export const TypographyTypeStyled = styled.p`
  color: #494949;
  font-weight: 500;
  font-size: 12px;
`