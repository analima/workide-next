import Slider from 'react-slick';
import styled from 'styled-components';
import {
  AZUL,
  BRANCO,
  CINZA_10,
  CINZA_40,
  CINZA_80,
} from '../../styles/variaveis';

export const Content = styled.div``;

interface CarrouselProps {
  size: number;
}

export const Carrousel = styled(Slider)`
  .slick-track {
    display: flex;
    flex-direction: row-reverse;
  }

  .slick-slide {
    display: flex;
    align-items: center;
    justify-content: ${(props: CarrouselProps) =>
      props.size <= 3 ? 'flex-start' : 'center'};
    width: 100%;
    padding: 0 15px;
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
  z-index: 9999;
  &:hover {
    background-color: ${CINZA_40};
  }
`;

export const VitrineContainer = styled.div`
  border-radius: 4px;
  max-width: 180px;
  margin-right: 18px;
  cursor: pointer;
`;

export const DefaultImage = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 8px;
  background-color: ${CINZA_80};
  margin-bottom: 10px;
`;

export const VitrineImagem = styled.div`
  position: relative;

  img {
    width: 180px;
    height: 180px;
    margin-bottom: 10px;
    border-radius: 8px;
    object-fit: cover;
  }

  .label-vitrine {
    visibility: hidden;
    font-weight: bold;
    color: ${BRANCO};
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    transform: translateY(-120%);
    z-index: 1;
    padding: 0 2px;
  }

  svg {
    z-index: 2;
    position: absolute;
    left: 0;
    transform: translateY(100%);
    width: 20px;
    margin-left: 8px;
  }

  .label-preco {
    z-index: 2;
    font-weight: bold;
    border-radius: 8px 0px 0px 8px;
    color: #ccf2ec;
    position: absolute;
    right: 0;
    transform: translateY(60%);
    background-color: ${CINZA_40};
    padding: 8px;
    font-size: 0.9em;
  }

  &:hover {
    img {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      filter: brightness(60%);
    }

    .label-vitrine {
      visibility: visible;
    }

    .label-preco {
      visibility: visible;
    }
  }

  @media (max-width: 478px) {
    img {
      filter: brightness(70%);
    }

    .label-vitrine {
      visibility: visible;
    }

    .label-preco {
      visibility: visible;
    }
  }
`;

export const VitrineTexto = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const NenhumServico = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  gap: 16px;

  h3 {
    font-size: 14px;
    color: ${AZUL};
    font-weight: bold;
  }

  svg {
    cursor: pointer;
  }
`;
