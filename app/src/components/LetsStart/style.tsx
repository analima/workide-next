import { AZUL, BRANCO, PRETO_10 } from 'src/styles/variaveis';
import styled from 'styled-components';

export const Content = styled.section`
  margin: 0 auto;
  max-width: 1440px;
  display: flex;
  padding: 0px 60px;
  gap: 90px;

  @media (max-width: 768px) {
    padding: 0px 20px;
    gap: 20px;
  }

  @media (max-width: 630px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ContentImage = styled.div`
  max-width: 820px;
  /* display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 24px;
  gap: 24px; */

  @media (max-width: 991px) {
  }

  @media (max-width: 690px) {
    max-width: 360px;
  }
`;

export const ContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  width: 407px;

  h1 {
    font-size: 44px;
    color: #767676;
    font-weight: 700;
    text-align: left;
    margin: 0;
  }

  span {
    font-size: 18px;
    color: #767676;
    text-align: left;
  }

  button > span {
    font-family: 'Renner';
    color: #fff;
    font-size: 16px;
  }

  @media (max-width: 991px) {
    width: 540px;

    h1 {
      font-size: 32px;
    }
  }

  @media (max-width: 576px) {
    width: 100%;
    h1 {
      font-size: 24px;
      font-weight: bold;
    }
  }
`;
