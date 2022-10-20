import { AZUL, LARANJA } from 'src/styles/variaveis';
import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
`;

export const Content = styled.section`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 0px 54px;
  gap: 56px;
  background-color: #008fe54d;
  border-radius: 16px;

  @media (max-width: 768px) {
    padding: 0px 20px;
    border-radius: 0px;
  }

  @media (max-width: 478px) {
  }
`;

export const ContentImage = styled.div`
  max-width: 644px;
  height: 624px;
  display: flex;
  align-items: center;

  .content-img {
    padding: 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 576px) {
  }
`;

export const ContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  width: 604px;
  position: relative;

  h1 {
    font-weight: 900;
    font-size: 48px;
    color: #606060;
    text-align: left;
    margin: 0;
  }

  span {
    max-width: 425px;
    font-size: 18px;
    color: #767676;
    text-align: left;
  }

  .orange,
  .blue {
    background-color: ${LARANJA};
    font-family: 'Renner';
    color: #fff;
    font-size: 18px;
    border: none;
    padding: 16px;
    border-radius: 4px;
    transition: all 0.3s;

    :hover {
      opacity: 0.8;
    }
  }

  .blue {
    background-color: ${AZUL};
  }

  p {
    font-weight: 500;
    position: absolute;
    font-size: 12px;
    bottom: 0;
    a {
      color: ${LARANJA};
    }
  }

  @media (max-width: 1200px) {
    width: 504px;

    h1 {
      font-size: 40px;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    padding: 40px 0;

    h1 {
      font-size: 24px;
      font-weight: bold;
    }

    p {
      position: relative;
      margin-top: 16px;
    }
  }
`;
