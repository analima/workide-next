import { lighten } from 'polished';
import styled from 'styled-components';
import { AZUL, BRANCO, LARANJA, PRETO_10 } from '../../../../styles/variaveis';

const Content = styled.div``;

export const FotoPerfilContainer = styled.div`
  margin-bottom: 8px;

  cursor: pointer;
  -webkit-transition: -webkit-transform 0.5s ease;
  transition: transform 0.5s ease;

  :hover {
    -webkit-transform: scale(1.03);
    transform: scale(1.03);
  }
  @media (max-width: 478px) {
    display: flex;
    justify-content: center;
  }
  @media (max-width: 900px) {
    display: flex;
    justify-content: center;
  }
`;

export const FotoPerfil = styled.div`
  max-width: 152px;
  height: 152px;
  border-radius: 8px;
  object-fit: cover;
`;

export const NomeContainer = styled.div`
  p {
    margin-bottom: 12px;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    color: ${PRETO_10};
    cursor: pointer;

    :hover {
      opacity: 0.8;
    }
  }
`;

export const AvaliacaoContainer = styled.div`
  margin: 4px 0;
  span {
    color: ${LARANJA};
    margin-right: 8px;
  }

  svg {
    width: 22px;
    height: 22px;
  }

  @media (max-width: 478px) {
    display: flex;
    justify-content: center;
  }
`;

export const MedalhasContainer = styled.div`
  display: flex;
  margin: 4px 0;
  svg {
    width: 32px;
  }

  @media (max-width: 478px) {
    justify-content: center;
  }
`;

export const SobreContainer = styled.div``;

export const Sobre = styled.p`
  text-align: left;
  word-wrap: break-word;
`;

export const ContainerAcoes = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 16px 0;

  @media (max-width: 478px) {
    display: block;
  }
`;

export const Button = styled.button`
  width: 280px;
  padding: 16px 42px;
  font-weight: bold;
  color: ${BRANCO};
  background-color: ${AZUL};
  border-radius: 8px;
  border: 2px solid ${AZUL};

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

export default Content;
