import styled from 'styled-components';
import { AZUL, BRANCO, LARANJA, PRETO_10, VERDE } from '../../styles/variaveis';

export const Container = styled.section`
  background-color: ${BRANCO};
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const Content = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;

  .image-container {
    width: 683px;
    height: 683px;
    position: relative;
    padding: 8px;
  }

  .info {
    max-width: 389px;
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

    h4 {
      font-family: 'Renner';
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 150%;
      color: ${PRETO_10};
    }

    span {
      width: 289px;
      color: ${PRETO_10};
      margin-bottom: 16px;

      .emphasis {
        color: ${LARANJA};
      }
    }
  }

  @media (max-width: 1060px) {
    gap: 20px;

    .image-container {
      width: 660px;
      height: 660px;
    }

    .info {
      max-width: 350px;
    }
  }

  @media (max-width: 991px) {
    gap: 20px;

    .image-container {
      width: 540px;
      height: 540px;
    }

    .info {
      max-width: 300px;

      h1 {
        font-size: 32px;
      }
    }
  }

  @media (max-width: 870px) {
    gap: 20px;

    .image-container {
      width: 480px;
      height: 480px;
    }

    .info {
      max-width: 280px;

      h1 {
        font-size: 28px;
      }

      span {
        width: 200px;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .image-container {
      width: 600px;
      height: 600px;
    }

    .info {
      max-width: 100%;
      padding: 0 8px;

      h1 {
        font-size: 31.25px;
      }

      span {
        width: 100%;
      }
    }
  }

  @media (max-width: 630px) {
    .image-container {
      width: 480px;
      height: 480px;
    }
  }

  @media (max-width: 500px) {
    .image-container {
      width: 400px;
      height: 400px;
    }
  }

  @media (max-width: 420px) {
    .image-container {
      width: 360px;
      height: 360px;
    }
  }

  @media (max-width: 380px) {
    .image-container {
      width: 320px;
      height: 320px;
    }
  }

  @media (max-width: 340px) {
    .image-container {
      width: 280px;
      height: 280px;
    }
  }

  @media (max-width: 300px) {
    .image-container {
      width: 260px;
      height: 260px;
    }
  }
`;

export const ContentButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    width: 100%;
    max-width: 338px;
    height: 56px;
    background-color: transparent;
    border-radius: 8px;
    padding: 16px, 40px;
    text-transform: uppercase;
    color: ${AZUL};
    font-family: 'Renner';
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: center;
    border: 2px solid ${AZUL};

    :hover {
      opacity: 0.8;
    }
  }
`;
