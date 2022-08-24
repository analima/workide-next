import styled from 'styled-components';
import { AZUL, BRANCO, PRETO_10 } from '../../../styles/variaveis';
import IMG from '../../../assets/banner-quem-somos.webp';
import IMG2 from '../../../assets/banner-quem-somos2.webp';

export const Content = styled.section`
  margin: 0 auto;
  max-width: 1440px;
  @media (max-width: 768px) {
    padding: 0px 20px;
  }

  @media (max-width: 478px) {
    padding: 0px;
  }
`;

export const ContentConheca = styled.div`
  margin: 0px auto;
  margin-top: 60px;
  max-width: 1200px;

  h1 {
    font-size: 40px;
    color: ${PRETO_10};
    font-weight: 400;
  }

  @media (max-width: 991px) {
    h1 {
      font-size: 32px;
    }
  }

  @media (max-width: 530px) {
    margin: 0;
  }

  @media (max-width: 478px) {
    margin-top: 24px;
    padding: 0 8px;

    h1 {
      font-size: 25px;
      font-weight: bold;
    }
  }
`;

export const ContentComents = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 24px;
  gap: 24px;

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

interface CardComentProps {
  color: string;
}
export const CardComent = styled.div<CardComentProps>`
  width: 384px;
  height: 292px;
  background-color: ${props => props.color};
  padding: 40px 22px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 16px;
    color: ${BRANCO};
    font-weight: bold;
    margin-bottom: 20px;
  }

  p {
    font-size: 16px;
    color: ${BRANCO};
    font-family: 'Renner';
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
  }

  @media (max-width: 1100px) {
    p {
      font-size: 15px;
    }
  }

  @media (max-width: 991px) {
    padding: 16px;

    h2 {
      font-size: 14px;
      margin-bottom: 16px;
    }

    p {
      font-size: 14px;
    }
  }

  @media (max-width: 768px) {
    padding: 10px;

    p {
      font-size: 13px;
    }
  }

  @media (max-width: 630px) {
    padding: 24px 16px;
    p {
      font-size: 12px;
    }
  }

  @media (max-width: 576px) {
    padding: 24px;
    width: 100%;

    h2 {
      font-size: 16px;
    }

    p {
      font-size: 16px;
    }
  }

  @media (max-width: 478px) {
    padding: 16px;

    h2 {
      font-size: 16px;
    }

    p {
      font-size: 14px;
    }
  }
`;

export const Title = styled.p`
  font-size: 16px;
  text-align: justify;
  color: ${AZUL};
  font-weight: bold;
  margin: 0;
`;

export const DataProjects = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-top: 46px;

  h1 {
    font-size: 40px;
    color: ${PRETO_10};
    text-align: center;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 60px;
  }

  @media (max-width: 991px) {
    h1 {
      font-size: 32px;
    }

    > div {
      gap: 40px;
    }
  }

  @media (max-width: 576px) {
    h1 {
      font-size: 24px;
      font-weight: bold;
    }

    > div {
      gap: 20px;
    }
  }
`;

export const ContentData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${AZUL};

  img {
    width: 82px;
    height: 82px;
    object-fit: cover;
    margin-bottom: 24px;
  }

  strong {
    font-size: 16px;
    color: ${AZUL};
  }

  @media (max-width: 991px) {
    gap: 8px;

    img {
      width: 36px;
      height: 36px;
      margin: 0;
    }

    strong {
      font-size: 14px;
    }

    p {
      font-size: 13px;
    }
  }

  @media (max-width: 768px) {
    .data-projects {
      gap: 4px;

      span {
        width: 100px;
        height: 100px;

        img {
          width: 24px;
          height: 24px;
          margin: 0;
        }

        strong {
          font-size: 12px;
        }

        hr {
          margin: 2px;
        }

        strong {
          font-size: 13px;
        }

        p {
          font-size: 10px;
          color: ${PRETO_10};
        }
      }
    }
  }

  @media (max-width: 510px) {
    .data-projects {
      gap: 1px;

      span {
        width: 86px;
        height: 86px;
        justify-content: flex-start;

        img {
          width: 20px;
          height: 20px;
          margin: 0;
        }

        hr {
          display: none;
        }

        strong {
          font-size: 10px;
        }

        p {
          text-align: center;
          width: 72px;
          margin: 0;
          font-size: 10px;
        }
      }
    }
  }

  @media (max-width: 420px) {
    .data-projects {
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      img {
        width: 25px;
        height: 25px;
      }

      span {
        width: 100px;
        height: 100px;
        margin-bottom: 10px;
      }

      p {
        width: 65px;
        padding: 2px;
        font-size: 13px;
      }
    }
  }
`;

export const Contador = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 16px;
  font-weight: bold;
`;
