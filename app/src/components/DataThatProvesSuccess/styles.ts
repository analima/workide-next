import styled from 'styled-components';
import { AZUL, BRANCO, PRETO_10 } from '../../styles/variaveis';

export const Content = styled.section`
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 68px;

  h1 {
    max-width: 683px;
    color: ${PRETO_10};
    margin-top: 80px;
    font-weight: 700;
    font-size: 40px;
    line-height: 134.6%;
    text-align: center;
  }

  h3 {
    max-width: 785px;
    color: ${PRETO_10};
    font-weight: 700;
    font-size: 40px;
    line-height: 134.6%;
    text-align: center;

    strong {
      font-weight: 700;
      border-bottom: 1px solid ${AZUL};
      color: ${AZUL};
    }
  }

  @media (max-width: 768px) {
    padding: 0 16px;
    h1,
    h3 {
      font-size: 32px;
    }
  }

  @media (max-width: 550px) {
    padding: 0 16px;

    h1,
    h3 {
      font-size: 28px;
      line-height: 40px;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;

  @media (max-width: 768px) {
    gap: 24px;
  }

  @media (max-width: 530px) {
    flex-wrap: wrap;
    gap: 40px;
  }
`;

export const CardInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  .icon-info {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  h2 {
    color: ${PRETO_10};
    font-weight: 700;
    font-size: 48px;
    text-align: center;
    margin: 0;
  }

  span {
    color: ${PRETO_10};
    font-weight: 700;
    font-size: 32px;
    text-align: center;
  }

  @media (max-width: 1200px) {
  }

  @media (max-width: 991px) {
  }

  @media (max-width: 550px) {
  }
`;

export const ContentButton = styled.div`
  button {
    height: 74px;
    background-color: ${AZUL};
    border-radius: 25px;
    padding: 20px 80px;
    color: ${BRANCO};
    font-family: 'Renner';
    font-size: 30px;
    font-weight: 700;
    line-height: 24px;
    text-align: center;
    border: 0;
  }

  :hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    button {
      padding: 20px 40px;
    }
  }

  @media (max-width: 530px) {
    width: 100%;
    button {
      font-size: 18px;
      width: 100%;
      padding: 16px;
    }
  }
`;
