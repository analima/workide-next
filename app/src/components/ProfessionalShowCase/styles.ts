import Slider from 'react-slick';
import styled from 'styled-components';
import { AZUL, BRANCO, PRETO_10 } from '../../styles/variaveis';

export const Content = styled.section`
  background-color: ${BRANCO};

  h1 {
    text-align: center;
    font-weight: 700;
    font-size: 39px;
    color: ${PRETO_10};
  }
  .container {
  }
  button {
    padding: 16px 65.5px;
    color: ${BRANCO};
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
    border-radius: 80px;
    background-color: ${AZUL};
    font-size: 16px;
    font-weight: bold;
    border: none;

    :hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 768px) {
    padding: 0px 20px;

    h1 {
      font-size: 31px;
      font-weight: 400;
    }
  }

  @media (max-width: 478px) {
    padding: 0px 8px;

    h1 {
      text-align: left;
    }
  }
`;

export const ContentButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 991px) {
  }

  @media (max-width: 530px) {
  }
`;

export const CardCarrousel = styled.div`
  padding: 10px 8px;
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
