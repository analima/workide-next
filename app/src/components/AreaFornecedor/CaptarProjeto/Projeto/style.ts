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

export const ContainerProjeto = styled.div``;

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
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
  @media (max-width: 578px) {
    width: 100%;
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

  p {
    font-weight: 400;
    font-size: 12.8px;
    color: ${PRETO_10};
    margin: 0;
  }
  @media (max-width: 578px) {
    align-items: flex-start !important;
    justify-content: flex-start !important;
    text-align: left;
  }
`;

export const TextoPublicacao = styled.div`
  display: none !important;

  @media (max-width: 578px) {
    display: flex !important;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    span {
      font-size: 12px;
      color: ${PRETO_60};
      text-align: left;
    }
  }
`;

export const TituloContainer = styled.div`
  display: flex;
  gap: 8px;

  svg {
    cursor: pointer;
    -webkit-transition: -webkit-transform 0.5s ease;
    transition: transform 0.5s ease;

    :hover {
      -webkit-transform: scale(1.05);
      transform: scale(1.05);
    }
  }

  .icon-exclusivo {
    width: 80px;
    height: 80px;
  }

  @media (max-width: 578px) {
    align-items: flex-start !important;
    justify-content: flex-start !important;
    width: 100%;

    svg {
      width: 48px;
      height: 48px;
    }
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
    margin: 0;
  }

  @media (max-width: 768px) {
    margin-top: 16px;
  }

  @media (max-width: 578px) {
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
  justify-content: center;
  align-items: center;
  gap: 4px;

  .icone-voluntario {
    width: 76px;
    height: 51px;
  }

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
      font-size: 18px;
      font-weight: bold;
      color: ${AZUL};
    }
  }

  @media (max-width: 768px) {
    margin-top: 16px;
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
    }
  }

  @media (max-width: 578px) {
    align-items: flex-start;
    justify-content: flex-start;
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
  font-size: 12.8px;
  font-weight: 400;
  color: ${PRETO_10};
  text-align: left;

  &:nth-child(3) {
    font-weight: 500;
    font-size: 10.24px;
  }

  @media (max-width: 578px) {
    display: none;
  }
`;

export const ProjetoBody = styled.div`
  .atividades-requeridas {
    color: ${PRETO_10};
  }
`;

export const ContentLabels = styled.div`
  display: flex;

  .labels,
  .niveis {
    width: 50%;

    span {
      color: ${PRETO_10};
      font-weight: 700;
    }
  }

  label {
    border-radius: 16px;
  }
`;

export const Descricao = styled.p`
  text-align: justify;
  font-size: 16px;
  margin-bottom: 24px;
  margin-top: 16px;
  color: ${PRETO_10};
  word-wrap: break-word;

  @media (max-width: 478px) {
  }
`;

export const AtividadesRequeridas = styled.p`
  text-align: justify;
  font-size: 16px;
  margin-bottom: 24px;
  margin-top: 16px;
  color: ${PRETO_10};
  word-wrap: break-word;

  @media (max-width: 478px) {
  }
`;

export const ProjetoFooter = styled.div`
  margin-top: 16px;
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

export const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContainerName = styled.div`
  display: flex;
  align-items: center;

  h2 {
    margin-right: 5px;
  }
`;

export const Avaliacao = styled.div`
  color: ${LARANJA};
  display: flex;
  align-items: center;

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
    flex-direction: column-reverse;
  }

  @media (max-width: 478px) {
  }
`;

type ButtonProps = {
  notInterested?: boolean;
  isMesmoUsuario?: boolean;
};

export const Compartilhar = styled.button`
  padding: 16px 40px;
  text-decoration: none;
  border-radius: 8px;
  color: ${AZUL};
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: 'Renner';
  font-style: normal;
  font-weight: 700;
  font-size: 12.8px;
  line-height: 150%;
  justify-content: center;
  border: none;
  background-color: ${BRANCO};

  :hover {
    opacity: 0.8;
  }

  svg {
    margin-right: 8px;
  }

  @media (max-width: 1200px) {
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 478px) {
    padding: 8px 16px;
  }
`;

export const Button = styled.button<ButtonProps>`
  padding: 16px 40px;
  color: ${BRANCO};
  background-color: ${props => (props.notInterested ? LARANJA : AZUL)};
  border-radius: 8px;
  border: 1px solid ${props => (props.notInterested ? LARANJA : AZUL)};
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  font-family: 'Renner';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 150%;
  transition: background-color 0.2s;
  display: ${props => {
    return props.isMesmoUsuario ? 'block' : 'none';
  }};

  :hover {
    color: ${BRANCO};
    opacity: 0.8;
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
