import Slider from 'react-slick';
import styled from 'styled-components';
import {
  BRANCO,
  CINZA_10,
  CINZA_40,
  PRETO,
  PRETO_10,
  PRETO_40,
} from '../../../../styles/variaveis';

export const Content = styled.section`
  padding: 0px;
  margin: 0px;
`;

export const Container = styled.div`
  padding: 0px;
  margin: 0px;
`;

export const ActiveMoreInfos = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LabelPrimary = styled.p`
  margin: 4px;
  color: ${PRETO};
  font-size: 12px;
  font-weight: bold;
`;

export const InfoSection = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }

  .info-curso {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    padding: 8px;
    border: 1px solid ${PRETO_40};
    border-radius: 8px;

    strong {
      color: ${PRETO_40};
      margin-bottom: 16px;
    }

    span {
      color: ${PRETO_40};
      margin-bottom: 16px;
    }

    & + div {
      margin-top: 8px;
    }
  }

  @media (max-width: 578px) {
    width: 100%;
    .info-curso {
      height: 75px;
      width: 100%;
      max-width: 312px;
      border-radius: 8px;
      padding: 10px, 20px, 10px, 10px;
    }
  }
`;

export const Ranking = styled.span`
  font-size: 16px;
  color: ${PRETO_10};
  text-align: right;
`;

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .esconderMobile {
    @media (max-width: 578px) {
      display: none;
    }
  }

  span {
    font-size: 16px;
    color: ${PRETO_10};
  }

  .nivel-experiencia {
    text-transform: capitalize;
  }

  .label-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;

    label {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      padding: 6px 20px;
      border-radius: 24px;
      border: solid 2px ${PRETO_40};
    }
  }

  .ver-subarea {
    text-align: right;
    align-self: flex-end;
    justify-self: flex-end;
    font-size: 10px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  .redes {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;

    svg {
      cursor: pointer;
    }
  }
  @media (max-width: 578px) {
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

export const Carrousel = styled(Slider)`
  .slick-track {
    display: flex;
    flex-direction: row-reverse;
    margin: 0;
  }

  .slick-slide {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  }

  @media (max-width: 578px) {
    max-width: 578px;
    width: 100%;
    margin-left: 0 !important;
    .slick-slide {
      width: 80%;
      margin-left: 0 !important;
      align-items: center !important;
      justify-content: center !important;
    }
  }

  @media (max-width: 500px) {
    .slick-slide {
      margin-bottom: 15px;
    }
  }

  img {
    width: 120px;
    height: 120px;
    border-radius: 8px;
  }
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

export const Frame = styled.iframe`
  height: 264px;
`;

export const TitleVideoNotFound = styled.span`
  font-size: 16px;
  color: ${PRETO_10};
  text-align: center;
  margin-top: 16px;
`;

export const CardCertificado = styled.div`
  width: 107px;
  max-width: 107px;
  height: 107px;
  border-radius: 8px;
  padding: 26px 9px;
  overflow: hidden;
  cursor: pointer;
  background: linear-gradient(
      179.65deg,
      rgba(0, 0, 0, 0.2) 0.3%,
      rgba(0, 0, 0, 0) 76.01%
    ),
    #a40000;

  p {
    color: ${BRANCO};
    font-size: 15px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;
