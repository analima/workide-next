import styled from 'styled-components';
import { AZUL, BRANCO, LARANJA, VERDE_40 } from '../../styles/variaveis';

export const Container = styled.section`
  height: 275px;
  background-color: ${LARANJA};

  @media (max-width: 768px) {
    height: auto;
    padding: 16px 0;
  }
`;

export const Content = styled.section`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 64px;
  padding: 0 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 32px;
  }
`;

export const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-family: 'Renner';
    font-style: normal;
    font-weight: 700;
    font-size: 54px;
    line-height: 112%;
    color: ${BRANCO};
    max-width: 576px;
  }

  span {
    font-family: 'Renner';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 134%;
    color: ${BRANCO};
  }

  @media (max-width: 1032px) {
    h1 {
      font-size: 48px;
    }
  }

  @media (max-width: 991px) {
    h1 {
      font-size: 40px;
    }
  }
  @media (max-width: 768px) {
    h1 {
      font-size: 32px;
    }
  }

  @media (max-width: 478px) {
    h1 {
      text-align: center;
    }
    span {
      text-align: center;
    }
  }
`;

export const ContentButton = styled.div`
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
    width: 423px;
    height: 74px;
    background-color: ${AZUL};
    border-radius: 25px;
    padding: 16px 80px;
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

  @media (max-width: 991px) {
    button {
      width: 320px;
      padding: 16px;
    }
  }

  @media (max-width: 468px) {
    button {
      font-size: 24px;
      width: 100%;
      padding: 16px 32px;
    }
  }

  @media (max-width: 320px) {
    button {
      font-size: 22px;
      padding: 16px 24px;
    }
  }
`;
