import styled from 'styled-components';
import { AZUL, BRANCO, CINZA_90, PRETO_10 } from '../../../styles/variaveis';

export const Container = styled.section`
  background-color: ${BRANCO};

  @media (max-width: 768px) {
    padding: 0 8px;
  }
`;

export const Content = styled.section`
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    font-weight: 400;
    font-size: 31px;
    color: ${PRETO_10};
    text-align: center;
    margin-bottom: 48px;
  }

  @media (max-width: 991px) {
    gap: 24px;
  }
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: center;
  }

  @media (max-width: 630px) {
    padding-top: 0;
    align-items: flex-start;
  }
`;

interface ColorProps {
  color: string;
}

export const Box = styled.div<ColorProps>`
  max-width: 262px;
  height: 503px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;

  h3 {
    font-size: 20px;
    font-weight: 700;
    color: ${({ color }) => color};
    text-align: center;
    margin-top: 32px;
    height: 72px;
    display: flex;
    align-items: center;
  }

  span {
    color: ${PRETO_10};
    font-size: 16px;
    margin-top: 16px;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;

    h1 {
      width: 100%;
      font-size: 30px;
      line-height: 40px;
    }
  }

  @media (max-width: 540px) {
    h3 {
      margin-top: 0px;
    }
  }

  @media (max-width: 468px) {
    max-width: 90%;

    .content-img {
      width: 161px;
      height: 161px;
    }

    h3 {
      font-size: 20px;
      text-align: center;
    }

    span {
      margin-top: 0;
    }
  }
`;

export const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  .content-box {
    display: flex;
    align-items: center;
    gap: 60px;
  }

  svg {
    border: 1px solid ${CINZA_90};
    border-radius: 50%;
    background-color: ${CINZA_90};
    width: 55px;
    height: 55px;
    padding: 12px;
    cursor: pointer;
    transition: all 0.1s ease-in-out;

    :hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 1048px) {
    justify-content: center;
    gap: 16px;
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 478px) {
  }
`;
