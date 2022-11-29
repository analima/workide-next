import styled from 'styled-components';
import { AZUL, BRANCO, CINZA_90, PRETO_10 } from '../../../styles/variaveis';

export const Container = styled.section`
  background-color: ${BRANCO};
  z-index: 9;

  @media (max-width: 768px) {
    padding: 0 8px;
  }
`;

export const Content = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 39px;
  gap: 64px;

  h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 61.04px;
    line-height: 120%;
    color: ${PRETO_10};
  }

  @media (max-width: 991px) {
  }
  @media (max-width: 768px) {
  }

  @media (max-width: 630px) {
    h1 {
      font-size: 31px;
    }
  }
`;

export const Box = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 31px;
    font-weight: 400;
    color: ${PRETO_10};
    text-align: center;
  }

  .content-border {
    hr {
      display: block;
      margin: auto;
      height: 13px;
      border-radius: 15px;
      color: ${AZUL};
      opacity: 1;
      max-width: 334px;
    }
  }

  p {
    color: ${PRETO_10};
    font-size: 16px;
    text-align: center;
    margin-top: 40px;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;

    h3 {
      font-size: 28px;
      font-weight: bold;
    }
  }

  @media (max-width: 630px) {
    .descricao {
      padding: 24px 0;
    }

    h3 {
      font-size: 25px;
    }

    p {
      text-align: center;
    }
  }

  @media (max-width: 468px) {
  }
`;

export const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 40px;

  .content-box {
    display: flex;
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

  @media (max-width: 991px) {
    .content-box {
      gap: 40px;
    }
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 478px) {
    .content-box {
      flex-direction: column;
    }
  }
`;
