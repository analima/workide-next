import styled from 'styled-components';
import { BRANCO, PRETO_10 } from '../../styles/variaveis';

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
    font-size: 39px;
    color: ${PRETO_10};
  }

  span {
    font-size: 16px;
    display: block;
    color: ${PRETO_10};

    a {
      text-decoration: none;
    }
  }

  .container {
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

    span {
      font-size: 14px;
      word-wrap: break-word;
    }
  }
`;

export const ContentCategory = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-top: 48px;
  gap: 8px;
  width: 100%;

  span {
    font-size: 16px;
    color: ${PRETO_10};
    line-height: 24px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 478px) {
    display: none;
  }
`;

export const ContentCategoryMobile = styled.div`
  display: none;
  margin-top: 16px;

  span {
    font-size: 16px;
    color: ${PRETO_10};
    line-height: 24px;
  }

  @media (max-width: 478px) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;
