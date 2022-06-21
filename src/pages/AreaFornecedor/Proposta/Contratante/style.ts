import styled from 'styled-components';
import { LARANJA } from '../../../../styles/variaveis';

export const Content = styled.div``;

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

export const FotoPerfil = styled.img`
  object-fit: cover;
  max-width: 152px;
  height: 152px;
  border-radius: 8px;
`;

export const NomeContainer = styled.div`
  cursor: pointer;
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
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  svg {
    width: 32px;
  }

  @media (max-width: 478px) {
    justify-content: center;
  }
`;

export const SobreContainer = styled.div``;

export const Sobre = styled.p`
  text-align: flex-start;
  word-break: break-word;
`;
