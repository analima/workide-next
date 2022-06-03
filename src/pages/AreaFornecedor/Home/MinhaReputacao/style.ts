import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AZUL, AZUL_60, BRANCO } from '../../../../styles/variaveis';

export const Content = styled.section``;

export const Subtitulo = styled.h3`
  color: ${AZUL_60};
  font-size: 32px;

  @media (max-width: 478px) {
    text-align: center;
  }
`;

export const CardReputacao = styled.div`
  padding: 32px;
  border: 1px solid ${AZUL_60};
  border-radius: 8px;
  margin: 16px 0;
  max-height: 662px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  -ms-overflow-style: none; /* IE 10+ */
  scrollbar-width: none; /* Firefox */
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

  > span {
    font-size: 16px;
    color: ${AZUL_60};
  }

  @media (max-width: 478px) {
    flex-direction: column;
    align-items: center;
  }
`;
