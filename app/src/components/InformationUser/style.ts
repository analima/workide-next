import { AZUL, VERDE } from 'src/styles/variaveis';
import styled from 'styled-components';

export const Content = styled.div`
  padding: 24px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .infos {
    display: flex;
    align-items: center;
    gap: 20px;

    img {
      width: 91px;
      height: 91px;
      border-radius: 50%;
      border: 2px solid ${AZUL};
    }

    .info-user {
      span {
        color: #767676;
        font-size: 28px;
        font-weight: 700;
      }
      strong {
        color: ${VERDE};
        border: 2px solid ${VERDE};
        border-radius: 4px;
        padding: 0 4px;
      }

      p {
        margin: 0;
        color: #767676;
        font-size: 18px;
      }
    }
  }
  .buttons {
    display: flex;
    gap: 12px;

    > span {
      color: #767676;
      width: 237px;
    }

    button {
      border-radius: 80px;
    }
  }

  @media (max-width: 991px) {
    .buttons {
      flex-direction: column;
    }
  }

  @media (max-width: 768px) {
    gap: 8px;
    .infos {
      img {
        width: 72px;
        height: 72px;
      }
      .info-user {
        span,
        strong {
          font-size: 16px;
        }

        p {
          font-size: 14px;
        }
      }
    }

    .buttons {
      > span {
        font-size: 12.8px;
      }
      button {
        margin-top: 0;
        font-size: 10px;
      }
    }
  }

  @media (max-width: 530px) {
    padding: 0;
    flex-direction: column;
    align-items: flex-start;

    .buttons {
      width: 100%;
      > span {
        font-size: 12.8px;
      }
      button {
        margin-top: 0;
        font-size: 10px;
      }
    }
  }
`;
