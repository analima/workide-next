import styled from 'styled-components';
import { AZUL, BRANCO, PRETO_10 } from '../../../styles/variaveis';

export const Container = styled.section`
  background-color: ${BRANCO};

  @media (max-width: 768px) {
    padding: 0 8px;
  }
`;

export const Content = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-top: 64px;
  gap: 64px;

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

export const ContentDescription = styled.div`
  width: 60%;
  h1 {
    font-size: 61px;
    font-weight: bold;
    color: ${PRETO_10};
    line-height: 54px;
    font-family: Renner;
  }

  hr {
    height: 13px;
    border-radius: 9px;
    color: ${AZUL};
    opacity: 1;
    max-width: 490px;
  }

  .descricao {
    padding: 48px 0;
  }

  p {
    color: ${PRETO_10};
    font-family: 'Renner';
    font-size: 16px;
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

  @media (max-width: 630px) {
    .descricao {
      padding: 24px 0;
    }

    h1 {
      font-size: 31px;
      font-weight: 400;
      text-align: center;
    }

    p {
      text-align: center;
    }
  }
`;

export const ContentBox = styled.div`
  .imag {

    width: 587px !important;
    height: 631px !important;
    object-fit: cover !important;

  }

  @media (max-width: 991px) {
    img {
    }
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 478px) {
      imag{
         width: 100% !important;
        height: auto !important;
        object-fit: contain !important;
    }
  }
`;
