import { AZUL, BRANCO, VERDE } from 'src/styles/variaveis';
import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 52px;

  h1 {
    text-align: center;
    background: -webkit-linear-gradient(${AZUL}, ${VERDE});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 39px;
  }

  p {
    text-align: center;
    font-size: 22px;
  }

  .content-logo {
    margin-top: 40px;
  }

  .content-cards {
    display: flex;
    gap: 40px;
  }

  .info-footer {
    margin-bottom: 40px;
    p,
    a {
      font-size: 18px;
    }

    a {
      font-weight: 700;
      color: ${AZUL};
    }
  }

  @media (max-width: 1200px) {
    .content-cards {
      gap: 16px;
    }
  }

  @media (max-width: 991px) {
    padding: 20px 8px;
    gap: 32px;

    .content-cards {
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  @media (max-width: 630px) {
    h1 {
      font-size: 32px;
    }
  }
`;

interface CardProps {
  color: string;
}
export const Card = styled.div<CardProps>`
  width: 355px;
  height: 235px;
  background-color: ${({ color }) => color};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  :hover {
    opacity: 0.9;
  }

  h2 {
    font-weight: 700;
    font-size: 24px;
    color: ${BRANCO};
  }

  span {
    text-align: center;
    font-size: 18px;
    line-height: 20px;
  }

  @media (max-width: 1200px) {
    width: 284px;
    height: 188px;
  }
`;
