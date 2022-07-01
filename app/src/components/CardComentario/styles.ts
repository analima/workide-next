import Slider from 'react-slick';
import styled from 'styled-components';
import { AZUL, CINZA_10, CINZA_40, PRETO_10 } from '../../styles/variaveis';

export const Content = styled.div``;

export const Avaliacao = styled.div`
  padding: 8px;
  border: 1px solid ${AZUL};
  border-radius: 8px;
  max-width: 260px;
  max-height: 186px;

  min-width: 260px;
  min-height: 186px;
  position: relative;

  span {
    font-size: 12px;
    color: ${PRETO_10};
  }
`;

export const AvaliacaoTexto = styled.p`
  font-style: italic;
  display: flex;
  font-size: 12px;
  color: ${PRETO_10};
`;

export const NenhumaAvaliacaoContent = styled.div`
  margin-top: 24px;
`;

export const ContainerCardUsuario = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;

  div {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  img {
    height: 32px;
    width: 32px;
    border-radius: 50%;
  }

  span {
    font-size: 12px;
    color: ${PRETO_10};
  }
`;

interface SizeProps {
  size: number;
}

export const Carrousel = styled(Slider)<SizeProps>`
  .slick-track {
    padding: ${props => (props.size > 2 ? '0 0 0 60px' : '0px')};
    display: flex;
    gap: 4px;

    @media (max-width: 768px) {
      padding: 0;
    }
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
