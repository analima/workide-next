import Slider from 'react-slick';
import styled from 'styled-components';
import {
  AZUL,
  BRANCO,
  CINZA_40,
  CINZA_50,
  CINZA_60,
} from '../../../styles/variaveis';

export const Content = styled.section`
  min-height: 530px;
  scroll-behavior: smooth;

  h1 {
    margin-top: 60px;
    color: ${CINZA_40};
    font-size: 36px;
    font-weight: bold;
    text-align: center;
  }

  h2 {
    font-size: 40px;
  }
`;
export const Title = styled.p`
  font-size: 16px;
  color: ${CINZA_60};
  text-align: center;
`;

export const ContentTitles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;

  h1 {
    font-size: 48px;
    color: ${CINZA_50};
    font-weight: bold;
  }
`;
export const CardCarrousel = styled.div`
  padding: 10px 16px;
`;

export const Carrousel = styled(Slider)`
  .slick-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 500px;
  }

  .slick-track {
    display: flex;
    flex-direction: row-reverse;
  }
`;

export const ContainerButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 60px 2px 0px 2px;
`;

export const Button = styled.button`
  width: 224px;
  height: 56px;
  padding: 16px 40px;
  background: ${AZUL};
  border-radius: 80px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  border: 0;
  color: ${BRANCO};
  align-self: center;

  span {
    font-family: 'Renner';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
    text-align: center;
    text-transform: uppercase;
  }
`;
