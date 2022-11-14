import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import styled from 'styled-components';
import {
  AZUL,
  AZUL_60,
  BRANCO,
  CINZA_10,
  CINZA_40,
  LARANJA,
  PRETO_10,
} from '../../styles/variaveis';

export const Avaliacao = styled.div`
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
  padding: 16px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  width: 400px;
  height: 340px;
  margin-top: 10px !important;

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

export const AvaliacaoTitulo = styled.p`
  font-weight: bold;
  color: ${PRETO_10};

  @media (max-width: 468px) {
    font-size: 14px;
  }
`;

export const AvaliacaoTexto = styled.p`
  color: ${PRETO_10};
  font-size: 12px;
  word-break: break-word;
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

export const ContentNota = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-right: 4px;
    font-size: 10px;
    color: ${LARANJA};
  }

  svg {
    width: 12px;
    height: 12px;
  }
`;

export const AvaliacaoRodape = styled.div`
  margin-top: 32px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 478px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;

export const AvaliacaoCliente = styled.div`
  display: flex;
  justify-content: space-between;

  img {
    height: 32px;
    width: 32px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 22px;
  }
`;

export const CardRecomendacao = styled.div`
  padding: 32px;
  border: 1px solid ${AZUL_60};
  border-radius: 8px;
  margin: 16px 0;
  max-height: 662px;

  .header-recomendacao {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @media (max-width: 578px) {
    .header-recomendacao {
      display: flex;
      flex-direction: column;
    }
  }
`;

export const Recomendacao = styled.div`
  padding: 16px;
  max-height: 500px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  -ms-overflow-style: none; /* IE 10+ */
  scrollbar-width: none; /* Firefox */
`;

export const RecomendacaoTexto = styled.p`
  font-style: italic;
`;

export const RecomendacaoRodape = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const BtnSolicitarRecomendacao = styled(Link)`
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;
  padding: 16px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 8px;
  border: 2px solid ${AZUL};
  color: ${AZUL};
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: ${BRANCO};
    background-color: ${AZUL_60};
    border-color: ${BRANCO};
  }

  @media (max-width: 478px) {
    font-size: 12px;
    padding: 16px 20px;
    margin-top: 16px;
  }
`;

export const ContainerAvaliation = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1200px) {
    flex-direction: column;
  }

  div.skills,
  div.ponctuation {
    width: 48%;

    @media (max-width: 1200px) {
      width: 100%;
    }
  }
`;

export const NenhumaAvaliacaoContent = styled.div`
  margin-top: 24px;
`;

export const ContentRecomendacao = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;

  @media (max-width: 478px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ContainerCardUsuario = styled.div`
  display: flex;
  min-width: 250px;
  flex-direction: row;
  padding: 2px;
  align-items: center;
  justify-content: flex-start;
`;

export const Carrousel = styled(Slider)`
  .slick-track {
    display: flex;
    flex-direction: row-reverse;
    margin-left: 20px;
  }

  .slick-slide {
    height: 360px;
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
