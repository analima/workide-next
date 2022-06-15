import styled from 'styled-components';

import { lighten } from 'polished';
import { AZUL, BRANCO, CINZA_10 } from '../../../../styles/variaveis';

export const Content = styled.div``;

export const ContainerAcoes = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 478px) {
    display: block;
  }
`;

export const Button = styled.button`
  width: 250px;
  padding: 16px 42px;
  font-weight: bold;
  color: ${BRANCO};
  background-color: ${AZUL};
  border-radius: 8px;
  border: 2px solid ${AZUL};
  white-space: nowrap;

  &:hover {
    background-color: ${lighten(0.1, AZUL)};
    color: ${BRANCO};
  }

  @media (max-width: 478px) {
    width: 100%;
    margin-top: 16px;
    font-size: 12px;
  }
`;

export const GhostButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;
  width: 250px;
  padding: 16px 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid ${AZUL};
  color: ${AZUL};
  font-weight: bold;
  margin-right: 16px;

  &:hover {
    color: ${BRANCO};
    background-color: ${AZUL};
    border-color: ${BRANCO};
  }

  @media (max-width: 478px) {
    width: 100%;
    font-size: 12px;
  }
`;

export const BarraProgresso = styled.div`
  background-color: ${CINZA_10};
  width: 100%;
  border-radius: 10px;
`;

interface IProgressoProps {
  porcentagem: number | string | undefined;
  cor: string;
}

export const Progresso = styled.div<IProgressoProps>`
  background-color: ${props => props.cor};
  width: ${props => props.porcentagem + '%'};
  border-radius: 10px;
`;

export const Porcentagem = styled.p`
  font-weight: bold;
  text-align: right;
  margin-right: 42px;
  margin-left: 25%;
  color: ${BRANCO};
`;
