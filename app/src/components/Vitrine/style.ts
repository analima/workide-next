import Image from 'next/image';
import { lighten } from 'polished';
import Slider from 'react-slick';
import styled from 'styled-components';
import {
  AZUL,
  BRANCO,
  PRETO_10,
  VERDE,
  CINZA_40,
  CINZA_10,
} from '../../styles/variaveis';

interface IProps {
  numeroCompoenentes: number;
  recontract?: boolean;
}

export const Content = styled.div``;

export const ContentAvatar = styled.div``;

export const Carrousel = styled(Slider)<IProps>`
  .slick-track {
    display: flex;
    flex-direction: row-reverse;
  }

  .slick-slide {
    padding: 5px;
    height: ${props => (props.recontract ? '410px' : '360px')};
  }
`;

export const Body = styled.div`
  display: flex;
  gap: 16px;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 991px) {
    gap: 8px;
  }

  @media (max-width: 700px) {
    gap: 16px;
  }

  @media (max-width: 478px) {
    width: 100%;
    gap: 8px;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const NameTitulo = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: ${PRETO_10};
  margin: 0;

  @media (max-width: 991px) {
  }

  @media (max-width: 478px) {
  }
`;

export const FotoPerfil = styled.div`
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  min-width: 96px;
  height: 96px;

  @media (max-width: 991px) {
    width: 80px;
    height: 78px;
  }

  @media (max-width: 478px) {
    width: 60px;
    height: 58px;
  }
`;

export const Foto = styled(Image)`
  border-radius: 8px;

  @media (max-width: 991px) {
    width: 80px;
    height: 78px;
  }

  @media (max-width: 478px) {
    width: 60px;
    height: 58px;
  }
`;

export const TextoMenor = styled.p`
  font-family: Renner;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  margin: 0;
`;

export const TextoCategoria = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: ${AZUL};
  text-transform: uppercase;
`;

export const InformacoesProfissionais = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;

  span {
    font-size: 16px;
    color: ${CINZA_40};
    font-weight: 600;
    text-transform: uppercase;
  }
  div.maisProfissoes {
    padding: 2px 5px;
    text-align: center;
    background-color: ${CINZA_40};
    border-radius: 5px;

    span {
      font-size: 12px;
      color: ${BRANCO};
    }
  }
`;

export const BannerVoluntario = styled.div`
  position: relative;
  margin-top: 2px;
  &::after {
    content: '#SOUVOLUNTÁRIO';
    width: 100%;
    text-align: center;
    background-color: ${VERDE};
    color: #fff;
    font-weight: 700;
    font-size: 9px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    padding: 4px;
    position: absolute;
    transform: translate(0, -100%);
    border: none;

    @media (max-width: 991px) {
      font-size: 8px;
    }
  }
`;

export const Medalhas = styled.div`
  display: flex;
  margin: 1px 0;
  svg {
    width: 23px;
  }
`;

export const Footer = styled.div`
  width: 100%;
  height: 120px;
  overflow: scroll;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  -ms-overflow-style: none; /* IE 10+ */
  scrollbar-width: none; /* Firefox */
`;

export const AreasInteresse = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
  width: 100%;

  @media (max-width: 478px) {
    width: auto;
    text-align: center;
  }
`;

export const Area = styled.div`
  padding: 4px 8px;
  align-items: center;
  justify-content: center;
  color: ${AZUL};
  border: solid 1px ${AZUL};
  border-radius: 4px;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;

  span {
    font-size: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    @media (max-width: 478px) {
      font-size: 8px;
    }
  }
`;

interface IPropsFavorito {
  isLogado?: boolean;
}

export const Favorito = styled.div<IPropsFavorito>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 10px;
  margin-right: 3px;

  @media (max-width: 478px) {
    justify-content: center;
  }

  &:hover {
    cursor: ${props => (props.isLogado ? 'pointer' : 'auto')};
  }
`;

export const Dialogo = styled.div`
  p {
    font-weight: 400;
    color: #fff;
    background-color: ${PRETO_10};
    opacity: 80%;
    padding: 16px;
    margin: 0 16px 32px 16px;
    border-radius: 16px 16px 16px 0;
  }
`;

export const Button = styled.button`
  padding: 16px 40px;
  font-weight: bold;
  color: ${BRANCO};
  background-color: ${AZUL};
  border-radius: 8px;
  border: 1px solid ${AZUL};
  text-decoration: none;
  transition: background-color 0.2s;
  text-decoration: none;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: ${BRANCO};
    background-color: ${lighten(0.1, AZUL)};
  }

  @media (max-width: 478px) {
    width: 100%;
  }
`;

type AvatarContainerProps = {
  full?: boolean;
};

export const AvatarContainer = styled.div<AvatarContainerProps>`
  ${props => (props.full ? `display: block;` : `display:flex;`)}
  @media (min-width: 1201px) {
    ${props => {
      if (!props.full) {
        return `height: 170px; padding: 0 15%;`;
      } else {
        return `padding: 0 25%;`;
      }
    }}
  }
  @media (max-width: 1200px) {
    flex-direction: column-reverse;
  }
  overflow: hidden;
`;

export const ArrowSlider = styled.div`
  font-size: 30px;
  background-color: ${CINZA_10};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  text-align: center;
  display: flex;
  padding: 10px;

  &:hover {
    background-color: ${CINZA_40};
  }
`;

export const ContainerItensFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  > section {
    flex: 1;
    display: flex;
  }
`;

export const ContainerItemVitrine = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  width: 269px;
  height: 370px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: ${BRANCO};

  :hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 1200px) {
  }

  @media (max-width: 768px) {
    padding: 8px;
  }

  @media (max-width: 478px) {
    padding: 8px;
    width: 260px;
    height: 380px;
  }

  @media (max-width: 330px) {
    padding: 8px;
    width: 224px;
  }
`;

export const ContainerRecontratar = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
  width: 310px;
`;
