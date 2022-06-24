import styled from 'styled-components';
import {
  AZUL,
  AZUL_60,
  BRANCO,
  LARANJA,
  PRETO_10,
  VERDE,
} from '../../../../styles/variaveis';

const Content = styled.div`
  min-height: 100%;
  flex: 2;
  background-color: ${BRANCO};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ul {
    li {
      display: flex;
      justify-content: space-between;

      span {
        padding-top: 32px;
        padding-right: 22px;
        font-weight: bold;
        font-size: 20px;
        text-align: left;
      }
    }
  }

  span.success {
    color: ${VERDE};
  }

  @media (max-width: 478px) {
    padding: 8px 0;
  }
`;

export const CardPercentage = styled.div`
  min-height: 500px;

  div {
    padding: 32px 32px;
    cursor: pointer;
  }

  .card-msg-percentage {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 500px;

    img {
      width: 240px;
      height: 240px;
    }

    div {
      padding-left: 32px;

      p {
        font-size: 20px;
        font-weight: bold;
        color: ${LARANJA};

        :last-child {
          margin-top: 32px;
        }
      }

      .msg-segundo-passo {
        font-size: 20px;
        font-weight: bold;
        color: ${PRETO_10};
      }

      .msg-ultimo-passo {
        font-size: 20px;
        font-weight: bold;
        color: ${VERDE};
      }
    }
  }

  @media (max-width: 1200px) {
    .card-msg-percentage {
      padding: 16px;
      gap: 8px;

      div {
        p {
          font-size: 18px;
        }

        .msg-segundo-passo {
          font-size: 18px;
        }

        .msg-ultimo-passo {
          font-size: 18px;
        }
      }

      img {
        width: 200px;
        height: 200px;
      }
    }
  }
`;

export const ContentButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
  padding: 32px 32px;

  @media (max-width: 478px) {
    justify-content: center;
  }
`;

export const Button = styled.button`
  padding: 16px 0;
  font-weight: bold;
  color: ${AZUL};
  background-color: ${BRANCO};
  border-radius: 8px;
  border: 2px solid ${AZUL};
  font-size: 16px;
  height: 56px;
  width: 192px;
  text-decoration: none;
  transition: background-color 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 478px) {
    margin-top: 16px;
  }

  @media (max-width: 1200px) {
    padding: 8px 20px;
  }
  &:hover {
    color: ${BRANCO};
    background-color: ${AZUL_60};
    border-color: ${BRANCO};
  }
`;

export default Content;
