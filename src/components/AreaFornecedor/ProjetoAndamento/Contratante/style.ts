import styled from 'styled-components';
import { LARANJA, PRETO_10 } from '../../../../styles/variaveis';

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
`;

export const FotoPerfil = styled.div`
img:{
  object-fit: cover;
  max-width: 152px;
  height: 152px;
  object-fit: cover;
  border-radius: 8px;
  background-size: cover;
  background-position: center;

  @media (max-width: 478px) {
    width: 100px;
    height: 100px;
    margin: 16px 0;
  }
}

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
  font-size: 16px;
  color: ${PRETO_10};
  word-wrap: break-word;

  @media (max-width: 478px) {
    margin-top: 0px;
  }
`;

export default Content;
