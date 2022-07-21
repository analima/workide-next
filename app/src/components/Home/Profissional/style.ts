import Slider from 'react-slick';
import styled from 'styled-components';
import {
  CINZA_40,
  CINZA_10,
  PRETO_10,
  AZUL,
  BRANCO,
} from '../../../styles/variaveis';

export const Content = styled.section`
  width: 100vw;
  padding-bottom: 0;
  scroll-behavior: smooth;
`;

export const Carrousel = styled(Slider)`
  .slick-track {
    display: flex;
    flex-direction: 'row-reverse';
    gap: 4px;
  }

  .slick-slide {
    margin-bottom: 20px;
  }
  padding: 16px;
  
`;

export const ArrowSlider = styled.div`
  font-size: 30px;

  background-color: ${CINZA_10};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  text-align: center;
  display: flex;
  padding: 10px;

  &:hover {
    background-color: ${CINZA_40};
  }
`;

export const ContentFeedback = styled.div`
  width: 183px;
  height: 320px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);

  img {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    width: 183px;
    height: 189px;
  }
  div {
    padding: 8px;

    p {
      font-size: 14px;
      color: ${PRETO_10};
    }
  }
`;

export const CardCarrousel = styled.div`
  padding: 10px;
`;

export const ContentTitles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 0;

  h1 {
    font-size: 24px;
    color: ${AZUL};
    margin: 0;
    font-weight: normal;
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 20px;
      padding: 0 16px;
    }
  }
`;

export const ComoFunciona = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 32px;
`;

export const CardComoFunciona = styled.div`
  width: 311px;
  height: 176px;
  padding: 16px;
  text-align: center;

  img {
    width: 50px;
    height: 50px;
  }

  h1 {
    font-size: 20px;
    color: ${AZUL};
  }

  p {
    font-size: 12px;
    color: ${PRETO_10};
  }
`;
export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const Drapper = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 12px;
    color: ${PRETO_10};
  }
`;

export const ContentButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;

  a {
    width: 222px;
    height: 48px;
    padding: 8px;

    :first-child {
      background-color: ${AZUL};
      border: 2px solid ${BRANCO};
      color: ${BRANCO};
    }

    &:hover {
      background-color: ${BRANCO};
      color: ${AZUL};
      border: 2px solid ${AZUL};

      :first-child {
        opacity: 0.8;
        background-color: ${AZUL};
        border: 2px solid ${BRANCO};
        color: ${BRANCO};
      }
    }
  }

  @media (max-width: 480px) {
    padding: 16px;
    flex-direction: column;
    gap: 20px;
    margin-top: 0;
  }
`;
