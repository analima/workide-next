import styled from 'styled-components';
import { VERDE } from '../../../../styles/variaveis';

const Content = styled.div``;

export const ContainerServicoExtra = styled.div`
  display: flex;
  gap: 40px;
  padding: 4px 48px;

  .form-check-input {
    width: 24px;
    height: 24px;
    margin: 0 12px;
  }

  @media (max-width: 478px) {
    padding: 16px 12px;
  }
`;

export const ServicoExtraDetalhes = styled.div``;

export const Descricao = styled.p`
  margin: 16px 0;

  @media (max-width: 478px) {
    text-align: justify;
  }
`;

export const TituloAcrescimo = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: ${VERDE};

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export default Content;
