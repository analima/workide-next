import { lighten } from 'polished';
import styled from 'styled-components';
import {
  AZUL,
  BRANCO,
  CINZA_10,
  CINZA_40,
  VERDE,
} from '../../styles/variaveis';

export const Container = styled.div``;

export const RequisitoContainer = styled.div`
  .cursor-pointer > * {
    cursor: pointer;
  }
`;

interface IRequisitoTitulo {
  cor?: string;
}

export const RequisitoTitulo = styled.div<IRequisitoTitulo>`
  padding: 16px;
  background-color: ${props => (props.cor ? props.cor : AZUL)};
  margin: 8px 0;
  color: ${BRANCO};
  font-weight: bold;

  @media (max-width: 478px) {
    text-align: center;
  }
`;

export const RequisitoProgresso = styled.div``;

export const RequisitoDescricao = styled.div`
  color: ${CINZA_40};
`;

export const Requisito = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  margin: 8px 0;
  background-color: ${CINZA_10};
`;

export const ContentRequisitos = styled.div``;

export const RequisitoStatus = styled.div``;

interface ILabelStatus {
  cor: string;
}

export const LabelStatus = styled.label<ILabelStatus>`
  color: ${props => props.cor};
  font-weight: bold;
`;

export const LabelData = styled.label`
  margin: 0 8px;
  font-size: 12px;
  color: ${CINZA_40};
`;

export const LabelIcone = styled.label``;

export const BarraProgresso = styled.div`
  background-color: ${CINZA_10};
  width: 100%;
  border-radius: 10px;
`;

interface IProgressoProps {
  porcentagem: number | string;
  cor: string;
}

export const Progresso = styled.div<IProgressoProps>`
  background-color: ${props => props.cor};
  width: ${props => props.porcentagem + '%'};
  border-radius: 10px;
  text-align: center;
`;

export const Porcentagem = styled.p`
  font-weight: bold;
  text-align: right;
  margin-right: 42px;
  margin-left: 25%;
  color: ${BRANCO};
`;

export const EnviarRequisito = styled.span`
  color: ${VERDE};
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: ${lighten(0.1, VERDE)};
  }
`;

export const ContainerAcoes = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0;
  gap: 8px;

  @media (max-width: 478px) {
    justify-content: center;
  }

  svg {
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  .dropdown {
    display: flex;
    justify-content: flex-end;

    button {
      box-shadow: none;
      padding: 0;
    }

    .dropdown-toggle::after {
      content: none;
    }
  }
`;

type CorProps = {
  cor: string;
};
export const TitleStatus = styled.span`
  color: ${(props: CorProps) => props.cor};
  font-weight: bold;
  margin-right: 8px;
  font-size: 12px;
`;
