import styled from 'styled-components';
import { AZUL, LARANJA } from '../../styles/variaveis';

export const Content = styled.div`
  .container {
    width: 100%;
    display: flex;
    padding: 16px;

    > div {
      padding: 32px;

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
  justify-content: space-between;
  width: 471px;

  @media (max-width: 768px) {
    width: 350px;
  }

  @media (max-width: 478px) {
    flex-direction: column-reverse;
    width: auto;
  }
`;

export const Info = styled.div`
  @media (max-width: 478px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const FotoPerfil = styled.div`
  margin-bottom: 8px;
  object-fit: cover;

  @media (max-width: 478px) {
    display: flex;
    justify-content: center;
  }
`;

export const Foto = styled.img`
  width: 152px;
  height: 152px;
  border-radius: 8px;
  object-fit: cover;
`;

export const Avaliacao = styled.div`
  margin: 4px 0;
  span {
    color: ${LARANJA};
    margin-right: 8px;
  }
`;

export const Medalhas = styled.div`
  display: flex;
  margin: 4px 0;
  svg {
    width: 32px;
  }
`;

export const Footer = styled.div`
  width: 471px;

  @media (max-width: 478px) {
    width: 232px;
  }
`;

export const AreasInteresse = styled.div`
  margin: 8px 0;
  overflow-y: scroll;
  margin-top: 8px;
  height: 130px;

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
`;

export const Favorito = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;

  @media (max-width: 478px) {
    justify-content: center;
  }
`;
