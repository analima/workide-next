import styled from 'styled-components';
import {
  AZUL,
  BRANCO,
  LARANJA,
  PRETO_10,
  PRETO_60,
  VERDE,
} from '../../../../styles/variaveis';
import { lighten } from 'polished';

const Content = styled.div`
  .mobile-align {
    display: flex;
    align-items: center;

    @media (max-width: 478px) {
      display: flex;
      flex-direction: column;
    }
  }
`;

export const ContainerProjeto = styled.div`
  padding: 8px;
`;

export const ProjetoHeader = styled.div`
  div {
    display: flex;

    @media (max-width: 478px) {
      justify-content: center;
      text-align: center;
    }
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const HeaderSecondary = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 16px;
    font-weight: bold;
    color: ${PRETO_10};
    margin: 0;
  }
`;

export const TituloContainer = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 16px;
    cursor: pointer;
  }

  .icon-exclusivo {
    width: 80px;
    height: 80px;
  }

  @media (max-width: 478px) {
    .icon-exclusivo {
      width: 64px;
      height: 64px;
    }
  }
`;

export const FaixaPrecoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;

  p {
    font-weight: 600;
    font-size: 12px;
    color: ${PRETO_10};
  }

  @media (max-width: 768px) {
    margin-top: 16px;
  }
`;

type EscopoProps = {
  escopo: string;
};

export const ContentFaixa = styled.div<EscopoProps>`
  display: flex;
  width: 100%;
  justify-content: ${(props: EscopoProps) =>
    props.escopo === 'ABERTO' ? 'space-between' : 'flex-start'};

  @media (max-width: 768px) {
    width: 200px;
    justify-content: flex-start;
  }
`;

export const FaixaProBono = styled.div`
  display: flex;
  gap: 16px;

  .voluntariado {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    p {
      margin: 0;
      font-weight: 600;
      font-size: 10px;
      color: ${PRETO_10};
    }

    svg {
      width: 76px;
    }

    span {
      font-size: 20px;
      font-weight: bold;
      color: ${AZUL};
    }
  }
`;

export const ValorServico = styled.div`
  display: flex;
  flex-direction: row;

  h1 {
    white-space: nowrap;
    font-size: 20px;
    color: ${VERDE};
    font-weight: bold;

    @media (max-width: 478px) {
      font-size: 16px;
    }
  }
`;

type FaixaProps = {
  right?: boolean;
};

export const FaixaPrecoLabel = styled.label<FaixaProps>`
  font-size: 10px;
  text-align: ${(props: FaixaProps) => (props.right ? 'right' : 'left')};
  width: 100%;
  font-weight: 600;
  color: ${PRETO_10};

  @media (max-width: 478px) {
    text-align: center;
  }
`;

export const DataPublicacao = styled.span`
  font-size: 12px;
  color: ${PRETO_60};
`;

export const ProjetoBody = styled.div``;

export const Descricao = styled.p`
  text-align: justify;
  font-size: 16px;
  margin-bottom: 24px;
  margin-top: 16px;
  word-wrap: break-word;

  @media (max-width: 478px) {
    padding: 0 16px;
  }
`;

export const ProjetoFooter = styled.div`
  margin-top: 32px;
`;

export const Consumidor = styled.div`
  display: flex;
`;

export const FotoPerfil = styled.img`
  object-fit: cover;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 12px;
`;

export const Info = styled.div``;

export const Avaliacao = styled.div`
  color: ${LARANJA};

  span {
    margin-right: 4px;
  }
`;
export const ContentButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 478px) {
    margin-top: 16px;
    flex: 1;
  }
`;

type ButtonProps = {
  notInterested?: boolean;
  isMesmoUsuario?: boolean;
};

export const Compartilhar = styled.a`
  padding: 16px 40px;
  width: 236px;
  font-weight: bold;
  font-size: 16px;
  border: none;
  text-decoration: none;
  border-radius: 8px;
  color: ${AZUL};
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    margin-right: 8px;
  }

  @media (max-width: 1200px) {
    padding: 16px 24px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 16px 40px;
  }

  @media (max-width: 478px) {
    padding: 8px 16px;

    svg {
      display: none;
    }
  }
`;

export const Button = styled.button<ButtonProps>`
  padding: 16px 40px;
  font-weight: bold;
  color: ${BRANCO};
  background-color: ${props => (props.notInterested ? LARANJA : AZUL)};
  border-radius: 8px;
  border: 1px solid ${props => (props.notInterested ? LARANJA : AZUL)};
  font-size: 12px;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  transition: background-color 0.2s;
  display: ${props => {
    return props.isMesmoUsuario ? 'block' : 'none';
  }};

  &:hover {
    color: ${BRANCO};
    background-color: ${props =>
      props.notInterested ? lighten(0.1, LARANJA) : lighten(0.1, AZUL)};
  }

  @media (max-width: 478px) {
    display: flex;
    justify-content: center;
    border-radius: 4px;
    padding: 12px 30px;
  }
`;

export const ContentFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 478px) {
    flex-direction: column-reverse;
    gap: 16px;
  }
`;

export const AnuncioComErro = styled.button`
  color: ${AZUL};
  border: none;
  font-weight: bold;
  background-color: ${BRANCO};
  font-size: 12px;

  @media (max-width: 478px) {
    display: flex;
    justify-content: center;
  }
`;

export const ContainerInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  p {
    color: ${PRETO_60};
    margin: 0;
  }
`;

export const ContentTrash = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  span {
    text-align: right;
    padding: 8px;
  }

  svg {
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export default Content;
