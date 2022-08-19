import styled from 'styled-components';
import {
  AZUL,
  BRANCO,
  CINZA_40,
  CINZA_60,
  LARANJA,
} from '../../styles/variaveis';

import Slider from 'react-slick';

export const Content = styled.section`
  padding: 100px 60px 0px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1320px;
  margin: 0 auto;

  h1 {
    font-size: 40px;
    font-weight: bold;
    color: ${CINZA_40};
  }

  span {
    font-size: 16px;
    color: ${CINZA_60};

    a {
      text-decoration: none;
      margin-left: 8px;
      color: ${AZUL};
    }
  }

  @media (max-width: 768px) {
    padding: 40px 24px;

    h1 {
      font-size: 36px;
      font-weight: 400;
    }
  }

  @media (max-width: 530px) {
    /* max-width: 500px; */
    margin: 0;
    h1 {
      font-size: 36px;
      font-weight: 400;
    }
  }

  @media (max-width: 478px) {
    padding: 20px 8px;

    > h1 {
      font-size: 31.25px;
      font-weight: 400;
      text-align: center;
      margin-bottom: 32px;
    }

    span {
      font-size: 16px;
      font-weight: 400;
      text-align: center;
    }
  }
`;

export const ContentCard = styled.div`
  margin-top: 48px;
  padding-bottom: 22px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  align-items: center;
  justify-content: center;

  li {
    list-style: none;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  padding: 15px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  }

  @media (max-width: 840px) {
    grid-template-columns: 1fr 1fr;
    margin: 40px 0;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 478px) {
    margin: 32px 0;
  }
`;

export const CardArea = styled.div`
  padding: 20px;
  width: 244px;
  height: 150px;
  background-color: ${LARANJA};
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  -webkit-transition: -webkit-transform 0.5s ease;
  transition: transform 0.5s ease;

  :hover {
    -webkit-transform: scale(1.03);
    transform: scale(1.03);
    .labels {
      visibility: visible;
      opacity: 1;
    }
  }

  h2 {
    color: ${BRANCO};
    font-size: 22px;
    font-weight: bold;
  }

  span {
    color: ${BRANCO};
    font-size: 14px;
  }

  @media (max-width: 1200px) {
    h2 {
      font-size: 18px;
    }
  }

  @media (max-width: 991px) {
    h2 {
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    .content-star {
      svg {
        width: 16px;
        height: 16px;
        filter: brightness(1.3) contrast(1.4);
      }
    }
  }

  @media (max-width: 576px) {
  }
`;

export const Carrousel = styled(Slider)`
  width: 100%;
  padding: 20px 0;

  li {
    text-decoration: none;
    list-style: none;
    display: none;
  }

  .slick-slider .container-slider .slick-initialized {
    display: flex;
  }

  .slick-track {
    display: flex;
    flex-direction: row-reverse;
  }

  .slick-list {
  }

  .slick-dots {
    position: absolute;
    bottom: 0px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  .slick-arrow .slick-next {
    display: none;
  }

  .slick-next {
    display: none;
    right: 0;
    bottom: 0;
  }

  .slick-next:before {
    display: none;
  }
`;
