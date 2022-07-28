import styled from 'styled-components';
import { BRANCO, PRETO_10 } from '../../../styles/variaveis';

export const Content = styled.section`
  background-color: ${BRANCO};

  h1 {
    text-align: center;
    font-weight: 400;
    font-size: 39px;
    color: ${PRETO_10};
  }

  @media (max-width: 768px) {
    padding: 0px 20px;

    h1 {
      font-size: 31px;
    }
  }

  @media (max-width: 478px) {
    padding: 0px 8px;

    h1 {
      text-align: left;
    }
  }
`;

export const ContentConheca = styled.div`
  max-width: 1200px;
  padding-top: 48px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  @media (max-width: 991px) {
    display: grid;
    grid-template-columns: 2fr 2fr;
    justify-items: center;
  }

  @media (max-width: 530px) {
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 32px;
  }
`;

interface ColorProps {
  color: string;
}
export const BoxContent = styled.div<ColorProps>`
  width: 250px;
  height: 181px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 39px;

  button {
    background-color: ${({ color }) => color};
    height: 46px;
    display: flex;
    align-items: center;
    padding: 8px 42px;
    border: none;
    border-radius: 7px;
    font-size: 25px;
    color: ${BRANCO};
    font-weight: bold;
  }

  span {
    margin: 0;
    font-family: 'Renner';
    font-size: 16px;
    color: ${PRETO_10};
    text-align: center;
  }
`;
