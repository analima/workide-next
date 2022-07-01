import Slider from 'react-slick';
import styled from 'styled-components';
import { BRANCO, CINZA_10, CINZA_40, PRETO_10 } from '../../styles/variaveis';

export const CardRecomendacao = styled.div`
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
  padding: 16px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
  height: 224px;

  span {
    color: ${PRETO_10};
    font-size: 10px;
    text-align: right;
  }

  @media (max-width: 468px) {
    width: 340px;
  }

  @media (max-width: 400px) {
    width: 280px;
  }
`;

export const RecomendacaoTexto = styled.p`
  color: ${PRETO_10};
  font-size: 12px;
  word-wrap: break-word;
`;

export const ContentLabel = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  label {
    padding: 4px 8px;
    background-color: ${PRETO_10};
    border-radius: 4px;
    color: ${BRANCO};
    font-size: 10px;
  }
`;

export const RecomendacaoRodape = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100%;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    font-size: 12.8px;
    font-weight: bold;
    color: ${PRETO_10};
  }

  li::before {
    content: '•';
    color: ${PRETO_10};
    margin-right: 8px;
  }
`;

export const NenhumaRecomendacaoContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: 16px;
    color: ${PRETO_10};
    text-align: center;
    margin-top: 16px;
  }
`;

export const ContentRecomendacao = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 8px;

  @media (max-width: 478px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Carrousel = styled(Slider)`
  .slick-track {
    display: flex;
    flex-direction: row-reverse;
    margin-left: 20px;
  }

  .slick-slide {
    height: 248px;
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
