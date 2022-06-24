import { lighten } from 'polished';
import styled from 'styled-components';
import {
  AZUL,
  BRANCO,
  CINZA_40,
  LARANJA_10,
  VERDE,
  PRETO_10,
  AMARELO,
} from '../../../../styles/variaveis';

const Content = styled.div`
  .reprovado {
    color: ${LARANJA_10};
  }
  .expirado {
    color: ${AMARELO};
  }
  .aprovado {
    color: ${VERDE};
  }

  button {
    background-color: transparent;
    border: none;
  }

  h4 {
    font-size: 20px;
  }
`;

export const ComprasContainer = styled.div`
  background-color: ${BRANCO};
  padding: 16px 32px;
  border-radius: 8px;
  border: solid 1px ${lighten(0.3, AZUL)};
  margin-top: 16px;

  @media (max-width: 478px) {
    padding: 16px;
    min-width: 100%;
  }
`;

export const CompraDescricao = styled.h4`
  font-weight: bold;
  color: ${CINZA_40};

  @media (max-width: 478px) {
    display: flex;
    justify-content: center;
  }
`;

export const CompraVencimento = styled.p`
  @media (max-width: 478px) {
    display: flex;
    justify-content: center;
  }
`;

export const CompraStatus = styled.h4`
  font-weight: bold;
  color: ${CINZA_40};

  @media (max-width: 478px) {
    display: flex;
    justify-content: center;
  }
`;

export const CompraFormaPagamento = styled.p`
  color: ${CINZA_40};

  @media (max-width: 478px) {
    display: flex;
    justify-content: center;
  }
`;

export const AcoesContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 478px) {
    flex-direction: column-reverse;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  padding: 16px 42px;
  font-weight: bold;
  color: ${BRANCO};
  background-color: ${AZUL};
  border-radius: 8px;
  border: 2px solid ${AZUL};
  margin-bottom: 10px;

  &:hover {
    background-color: ${lighten(0.1, AZUL)};
    color: ${BRANCO};
  }

  @media (max-width: 478px) {
    font-size: 12px;
    width: 100%;
    margin: 16px 0;
  }
`;

export const GhostButton = styled.a`
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;
  padding: 16px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid ${AZUL};
  color: ${AZUL};
  font-weight: bold;
  text-decoration: none;

  svg {
    margin-right: 16px;
    font-size: 24px;
  }

  &:hover {
    color: ${BRANCO};
    background-color: ${AZUL};
    border-color: ${BRANCO};
  }

  @media (max-width: 478px) {
    width: 100%;
    font-size: 12px;
    margin: 16px 0;
  }
`;

export const StatusContainer = styled.div`
  margin: 24px 0;
`;

export const ContainerLoading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const EmptyList = styled.h2`
  width: 100%;
  text-align: center;
  font-weight: bold;
  color: ${PRETO_10};
`;

export const DownloadLink = styled.a`
  text-decoration: none;
  cursor: pointer;
`;

export const ContainerButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default Content;
