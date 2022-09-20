import styled from 'styled-components';
import { BRANCO, PRETO_10 } from '../../../styles/variaveis';

export const Content = styled.section`
  background-color: ${BRANCO};

  h1 {
    text-align: center;
    font-weight: 400;
    font-size: 39px;
    color: ${PRETO_10};
  }

  @media (max-width: 768px) {
    padding: 0px 20px;

    h1 {
      text-align: center;
    }
  }

  @media (max-width: 478px) {
    padding: 0px 8px;

    h1 {
      text-align: left;
    }
  }
`;

export const ContentConheca = styled.div`
  max-width: 1200px;
  padding-top: 24px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;

  @media (max-width: 991px) {
  }

  @media (max-width: 530px) {
  }
`;

interface ColorProps {
  color: string;
}
export const BoxContent = styled.div<ColorProps>`
  max-width: 372px;
  height: 151px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin-bottom: 40px;

  div {
    background-color: ${({ color }) => color};
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
    display: flex;
    align-items: center;
    gap: 16px;
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    color: ${BRANCO};
    height: 52px;
    width: 100%;

    span {
      background-color: #fff;
      border-radius: 50%;
      border: 1px solid #fff;

      svg {
        border-radius: 50%;
        border: 1px solid #fff;
      }
    }
  }
  p {
    padding: 0 27px;
    color: ${PRETO_10};
    font-size: 18px;
  }

  @media (max-width: 768px) {
    gap: 16px;
    margin-bottom: 20px;

    div {
      font-size: 24px;
    }
  }

  @media (max-width: 478px) {
    div {
      font-size: 20px;
    }
  }
`;
