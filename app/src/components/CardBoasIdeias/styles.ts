import styled from 'styled-components';
import IMG from '../../assets/banner-group.png';
import IMG2 from '../../assets/banner-group2.png';
import { BRANCO, VERDE_40 } from '../../styles/variaveis';

export const Container = styled.div`
  background-color: ${BRANCO};
`;

export const Content = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-image: url(${IMG.src});
  background-size: auto;
  background-position: center;
  background-repeat: no-repeat;
  height: 202px;
  max-width: 1320px;
  border-radius: 8px;

  .content-info {
    width: 536px;

    h1 {
      font-size: 40px;
      font-weight: bold;
      color: ${BRANCO};
      margin-bottom: 16px;
    }

    span {
      margin-bottom: 16px;
      font-size: 18px;
      color: ${BRANCO};
    }
  }

  .content-button {
    display: flex;
    align-items: center;
    gap: 16px;

    button {
      width: 196px;
      height: 51px;
      border-radius: 8px;
      background-color: ${BRANCO};
      color: ${VERDE_40};
      font-size: 12px;
      font-weight: bold;
      border: none;
      cursor: pointer;

      &:hover {
        filter: contrast(0.8);
      }
    }

    svg {
      cursor: pointer;

      &:hover {
        filter: contrast(0.8);
      }
    }
  }

  @media (max-width: 991px) {
    padding: 20px;

    .content-info {
      h1 {
        font-size: 32px;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 576px) {
    padding: 10px;
    flex-direction: column;

    .content-info {
      width: 100%;
      h1 {
        font-weight: 400;
        text-align: center;
      }

      span {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }

  @media (max-width: 478px) {
    height: 100%;
    flex-direction: column;
    background-image: url(${IMG2});
    background-size: 100%;
    background-position: center;
    padding: 16px;
    border-radius: 24px;

    .content-info {
      width: 100%;
    }

    .content-button {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        width: 196px;
        height: 50px;
        font-size: 12px;
        margin-top: 10px;
      }
    }
  }

  @media (max-width: 390px) {
    .content-info {
      h1 {
        font-size: 24px;
      }
    }

    .content-button {
      button {
        width: 100%;
        height: 40px;
        font-size: 12px;
      }
    }
  }

  @media (max-width: 320px) {
    .content-info {
      h1 {
        font-size: 20px;
      }

      span {
        font-size: 14px;
      }
    }
  }
`;
