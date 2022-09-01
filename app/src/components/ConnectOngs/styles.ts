import styled from 'styled-components';
import { BRANCO, LARANJA, PRETO_10 } from '../../styles/variaveis';

export const Container = styled.section`
  background-color: ${BRANCO};
  margin: 0 auto;
  padding: 24px 16px;
`;

export const Content = styled.section`
  max-width: 1440px;
  display: flex;
  align-items: center;
  gap: 52px;
  justify-content: space-between;

  .image-container {
    flex: 1;
  }

  .info {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    gap: 29px;

    h1 {
      font-weight: 700;
      font-size: 34px;
      line-height: 134%;
      color: ${PRETO_10};
    }

    span {
      color: ${PRETO_10};
    }
  }

  @media (max-width: 991px) {
    gap: 20px;

    .info {
      gap: 16px;
      h1 {
        font-size: 32px;
      }
    }
  }

  @media (max-width: 870px) {
    gap: 20px;

    .info {
      h1 {
        font-size: 28px;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .info {
      h1 {
        font-size: 31.25px;
      }

      span {
        width: 100%;
      }
    }
  }
`;

export const ContentButton = styled.div`
  display: flex;
  width: 100%;

  button {
    padding: 18px;
    width: 100%;
    color: ${BRANCO};
    border-radius: 23px;
    border: 0;
    text-transform: uppercase;
    background-color: ${LARANJA};
    font-family: 'Renner';
    font-size: 22px;
    font-weight: 400;
    text-align: center;

    :hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 991px) {
    button {
      font-size: 18px;
    }
  }
`;
