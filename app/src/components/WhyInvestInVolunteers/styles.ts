import styled from 'styled-components';
import { AZUL, LARANJA, PRETO_10 } from '../../styles/variaveis';

export const Content = styled.section`
  margin-bottom: 80px;
  h1 {
    color: ${AZUL};
    margin-top: 107px;
    font-weight: 700;
    font-size: 44px;
    line-height: 66px;
    text-align: center;
  }

  @media (max-width: 991px) {
    height: auto;

    h1 {
      font-size: 32px;
    }
  }

  @media (max-width: 550px) {
    padding: 0 16px;

    h1 {
      font-size: 28px;
      line-height: 40px;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  @media (max-width: 991px) {
    margin-bottom: 40px;
  }
`;

export const CardInfo = styled.div`
  width: 1150px;
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    border: 2px solid #ff8a00;
    color: ${LARANJA};
    font-weight: 700;
    border-radius: 24px;
    padding: 16px 48px;
    font-size: 34px;
    margin: 0;
    width: 535px;
    text-align: center;
  }

  hr {
    color: ${LARANJA};
    width: 80px;
  }

  .linha-vertical {
    display: none;
  }

  span {
    border: 2px solid #ff8a00;
    color: ${PRETO_10};
    border-radius: 27px;
    width: 535px;
    padding: 20px 32px;
  }

  @media (max-width: 1200px) {
    width: 100%;

    h2 {
      padding: 16px;
      font-size: 32px;
    }

    hr {
      width: 32px;
    }
  }

  @media (max-width: 991px) {
    flex-direction: column;

    hr {
      display: none;
    }

    .linha-vertical {
      display: flex;
      height: 24px;
      border-left: 2px solid ${LARANJA};
    }
  }

  @media (max-width: 550px) {
    h2 {
      width: 100%;
      text-align: center;
      font-size: 24px;
      padding: 16px 8px;
    }

    span {
      width: 100%;
      padding: 16px;
    }

    .linha-vertical {
      height: 16px;
    }
  }
`;
