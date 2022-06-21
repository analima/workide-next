import Slider from 'react-slick';
import styled from 'styled-components';
import {
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
    font-size: 10px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Carrousel = styled(Slider)`
  .slick-track {
    display: flex;
    flex-direction: row-reverse;
  }

  .slick-slide {
    display: flex;
    /* align-items: center;
    justify-content: center; */
    width: 480px;
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
