import { lighten } from 'polished';
import styled from 'styled-components';
import {
  AZUL,
  BRANCO,
  CINZA_40,
  LARANJA,
  PRETO_10,
} from '../../../../styles/variaveis';

interface Props {
  isActive?: boolean;
}

const Content = styled.section`
  .text-grey {
    color: ${CINZA_40};
  }

  .fechar {
    top: 0;
    right: 0;
    margin: 16px;
    cursor: pointer;
    position: absolute;

    &:hover {
      opacity: 0.7;
    }
  }
`;

export const ContentImg = styled.div`
  position: relative;
`;

export const Avaliacao = styled.div`
  display: flex;
  align-items: center;
  margin: 4px 0;

  span {
    color: ${LARANJA};
    margin-right: 8px;
    font-weight: bold;
    font-size: 25px;
  }

  .estrela {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 478px) {
    display: flex;
    justify-content: center;
  }
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1000px) {
    flex-direction: column;
    margin-top: 16px;
  }
`;

export const Acoes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  gap: 30px;

  svg {
    cursor: pointer;
  }

  .coracao {
    width: 40px;
    height: 40px;
    cursor: pointer;
  }

  @media (max-width: 991px) {
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 16px;
    margin-bottom: 16px;
  }
`;

export const NomeTitulo = styled.h2`
  color: ${PRETO_10};
  font-size: 48px;
  font-weight: bold;
  margin: 0;

  @media (max-width: 768px) {
    text-align: center;
    font-size: 30px;
  }
`;

export const Ranking = styled.span`
  font-size: 16px;
  color: ${PRETO_10};
  font-weight: bold;
`;

export const FotoPerfil = styled.img`
  object-fit: cover;
  width: 280px;
  height: 280px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;

  @media (max-width: 478px) {
    width: 200px;
    height: 200px;
    margin: 16px 0;
  }
`;

export const Frame = styled.iframe`
  width: 280px;
  height: 280px;

  @media (max-width: 1200px) {
    width: 210px;
    height: 210px;
  }
  @media (max-width: 500px) {
    width: 144px;
    height: 144px;
  }

  @media (max-width: 762px) {
    width: 200px;
    height: 200px;
  }
`;

export const SobreDrescricao = styled.p`
  text-align: left;
  margin-top: 16px;
  font-size: 16px;
  font-weight: bold;
  color: ${CINZA_40};
`;

export const Button = styled.button<Props>`
  transition: all 0.2s ease-in-out;
  padding: 16px 40px;
  margin: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: none;
  color: ${({ isActive }) => (isActive ? BRANCO : AZUL)};
  background-color: ${({ isActive }) => (isActive ? AZUL : BRANCO)};
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: ${({ isActive }) => isActive && lighten(-0.1, AZUL)};
  }

  @media (max-width: 991px) {
    width: 100%;
    margin: 8px 0;
  }
`;

export default Content;
