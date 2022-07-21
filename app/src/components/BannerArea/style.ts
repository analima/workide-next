import styled from 'styled-components';
import { BRANCO, LARANJA, PRETO_10 } from '../../styles/variaveis';

export const Container = styled.section`
  background-color: ${BRANCO};
  text-align: center;

  @media (max-width: 768px) {
    padding: 0 8px;
  }
`;

export const Content = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-top: 54px;
  gap: 87px;

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
  background-color: ${BRANCO};
  max-width: 516px;
  z-index: 9999;

  h1 {
    font-size: 39px;
    color: ${BRANCO};
    padding: 22px 39px;
    background-color: ${LARANJA};
    border-radius: 37px;
    display: inline-block;
    margin-bottom: 72px;
  }

  .breach-chumb {
    color: ${PRETO_10};
    font-size: 12.8px;
    display: flex;
    gap: 7px;
    margin-bottom: 72px;

    span {
      color: ${PRETO_10};
      font-size: 12.8px;
    }
  }

  h2 {
    text-align: left;
    font-size: 48.83px;
    color: ${PRETO_10};
  }

  p {
    color: ${PRETO_10};
    font-size: 16px;
    max-width: 426px;
    text-align: left;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 16px;

    .breach-chumb {
      margin-bottom: 24px;
    }

    h1 {
      font-size: 20px;
      padding: 12px 39px;
      font-weight: bold;
      margin-bottom: 24px;
    }

    h2 {
      text-align: left;
      font-size: 39px;
    }

    p {
    }
  }

  @media (max-width: 630px) {
    margin-top: 0;
  }
`;

export const ContentBox = styled.div`
  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 478px) {
    z-index: 9999;
  }
`;

export const ContentBoxMobile = styled.div`
  display: none;
  position: relative;

  @media (max-width: 768px) {
    display: block;
  }
`;
