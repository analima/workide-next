import styled from 'styled-components';
import { AZUL, BRANCO, PRETO_10 } from '../../styles/variaveis';

export const Container = styled.div`
  background-color: ${BRANCO};
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
  gap: 48px;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    font-size: 39px;
    color: ${PRETO_10};
    text-align: center;
    font-weight: 400;
  }

  > div {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 129px;
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
      flex-wrap: nowrap;
      flex-direction: column;
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
