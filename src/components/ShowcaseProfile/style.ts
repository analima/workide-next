import styled from 'styled-components';
import {
  AZUL,
  BRANCO,
  LARANJA,
  PRETO_10,
  PRETO_60,
  VERDE,
} from '../../styles/variaveis';

export const AreaContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  .area-item {
    margin: 2px;
    padding: 5px;
    border-radius: 3px;
    color: ${AZUL};
    border: 1px solid ${AZUL};
    font-size: 0.7em;
  }

  .active {
    background: ${AZUL};
    color: ${BRANCO};
  }
`;

export const OnlineContainer = styled.div<{ isOnline: boolean }>`
  display: flex;
  align-items: center;

  .circle {
    width: 18px;
    height: 18px;
    border-radius: 100%;
    background: ${props => (props.isOnline ? VERDE : PRETO_60)};
  }

  p {
    color: ${props => (props.isOnline ? VERDE : PRETO_60)};
    margin-bottom: auto;
    margin-top: auto;
    margin-left: 5px;
  }
`;

export const Content = styled.div`
  cursor: pointer;
  width: 100%;

  .container {
    display: flex;
    height: 400px;
    overflow-x: scroll;
    overflow-y: hidden;

    .card {
      flex: none;
      display: inline-block;
      width: 370px;
      height: 350px;
      padding: 16px;
      border-radius: 8px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      margin-right: 16px;

      &:hover {
        box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
      }
    }

    h2 {
      margin-bottom: 8px;
    }
  }
`;

export const Body = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: 478px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const InfoPrimary = styled.div``;

export const FotoPerfil = styled.div`
  object-fit: cover;

  @media (max-width: 478px) {
    display: flex;
    justify-content: center;
  }
`;

export const TypographyName = styled.h2`
  color: ${PRETO_10};
  font-size: 16px;
  font-weight: bold;
`;

export const Typography = styled.p`
  font-size: 0.9em;
  color: ${PRETO_10};
  margin: 0;
  margin-top: 5px;
`;

export const Foto = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 8px;
  object-fit: cover;
`;

export const Avaliacao = styled.div`
  margin-top: -5px;

  span {
    font-size: 12px;
    color: ${LARANJA};
    margin-right: 8px;
  }

  svg {
    width: 20px;
  }
`;

export const Medalhas = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const Footer = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;

  @media (max-width: 478px) {
    width: 232px;
  }
`;

export const AreasInteresse = styled.div`
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    width: 350px;
  }

  @media (max-width: 478px) {
    width: auto;
    text-align: center;
  }
`;

export const Area = styled.label`
  margin: 4px 4px 4px 0;
  padding: 4px 8px;
  color: ${AZUL};
  border: solid 1px ${AZUL};
  border-radius: 8px;
  text-align: center;
  font-size: 10px;
`;

export const InfoSecondary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: absolute;
  margin-top: auto;
  bottom: 10px;
  right: 10px;
`;

export const Favorito = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;

  @media (max-width: 478px) {
    justify-content: center;
  }
`;
