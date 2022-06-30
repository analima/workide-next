import { lighten } from 'polished';
import styled from 'styled-components';
import { AZUL_60, BRANCO } from '../../../../../styles/variaveis';

const Content = styled.section``;

export const Recomendacao = styled.div`
  padding: 16px;
`;

export const RecomendacaoTexto = styled.p`
  font-style: italic;
  text-align: justify;
`;

export const RecomendacaoRodape = styled.div`
  margin-top: 32px;
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-weight: bold;
`;

export const BtnSolicitarRecomendacao = styled.a`
  border: none;
  background-color: ${BRANCO};
  text-decoration: none;
  color: ${AZUL_60};
  cursor: pointer;

  &:hover {
    color: ${lighten(0.1, AZUL_60)};
  }
`;

export const NenhumaRecomendacaoContent = styled.div`
  display: flex;
  margin-top: 32px;
`;

export default Content;
