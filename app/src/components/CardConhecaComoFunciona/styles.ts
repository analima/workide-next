import styled from 'styled-components';
import { BRANCO, CINZA_50, PRETO_10 } from '../../styles/variaveis';

export const Container = styled.div`
  background-color: ${BRANCO};
`;

export const ContentHowItWorks = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  .content-title {
    text-align: center;
    margin-top: 39px;

    h1 {
      font-size: 48px;
      color: ${PRETO_10};
    }

    span {
      color: ${CINZA_50};

      a {
        text-decoration: none;
      }
    }
  }

  .content-images {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-top: 210px;
  }

  @media (max-width: 991px) {
    margin-top: 100px;

    .content-images {
      margin-top: 140px;
    }
  }

  @media (max-width: 991px) {
    margin-top: 48px;

    .content-images {
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 20px;
    }
  }
`;

interface ImageProps {
  color: string;
}

export const ImagesHowItWork = styled.div<ImageProps>`
  width: 324px;
  height: 336px;
  display: flex;
  background-color: ${props => props.color};
  border-radius: 8px;
  align-items: center;
  flex-direction: column;
  padding: 48px 20px;
  position: relative;

  img {
    position: absolute;
    top: -164px;
    object-fit: contain;
  }

  h2 {
    color: ${BRANCO};
    font-size: 32px;
    font-weight: bold;
    text-align: center;
  }

  span {
    margin-top: 16px;
    text-align: center;
    color: ${BRANCO};
    font-size: 18px;
  }

  .number-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: ${BRANCO};
    color: ${PRETO_10};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: bold;
    border: 6px solid ${props => props.color};
    box-shadow: 0px -3px 5px 3px rgba(0, 0, 0, 0.11);
    position: absolute;
    bottom: -40px;
  }

  @media (max-width: 991px) {
    margin-top: 116px;

    img {
      width: 120px;
      height: 160px;
      top: -110px;
    }

    h2 {
      font-size: 20px;
    }

    span {
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    img {
      width: 100px;
      height: 140px;
      top: -90px;
    }
  }
`;
