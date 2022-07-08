import styled from 'styled-components';
import { AZUL, BRANCO, LARANJA, PRETO_10, VERDE } from '../../styles/variaveis';

export const Container = styled.section`
  background-color: ${BRANCO};
  margin: 0 auto;
  width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const Content = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 63px;

  .info {
    width: 389px;
    display: flex;
    flex-direction: column;
    gap: 48px;

    h1 {
      font-weight: 400;
      font-size: 39.06px;
      line-height: 120%;
      color: ${PRETO_10};

      > span {
        color: ${VERDE};
      }
    }

    span {
      width: 289px;
      color: ${PRETO_10};
      margin-bottom: 16px;
    }
  }
`;

export const ContentConect = styled.section`
  max-width: 927px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  h1 {
    text-align: center;
    font-weight: 400;
    font-size: 39px;
    color: ${PRETO_10};
  }

  span {
    display: block;
    max-width: 673px;
    color: ${PRETO_10};
    text-align: center;

    a {
      text-decoration: none;
    }
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

export const ContentButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    padding: 16px 65.5px;
    color: ${BRANCO};
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
    border-radius: 80px;
    background-color: ${AZUL};
    font-size: 16px;
    font-weight: bold;
    border: none;

    :hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 991px) {
  }

  @media (max-width: 530px) {
  }
`;
