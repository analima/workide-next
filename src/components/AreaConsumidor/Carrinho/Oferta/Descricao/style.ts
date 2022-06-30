import styled from 'styled-components';
import { AZUL, CINZA_50, VERDE_20 } from '../../../../../styles/variaveis';

const Content = styled.div`
  margin-top: 32px;
`;

export const OfertaImagemContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const OfertaImagem = styled.img`
  border-radius: 8px;
  width: 196px;
  height: 196px;
  object-fit: cover;

  @media (max-width: 478px) {
    margin-bottom: 16px;
  }
`;

export const TypographyStyled = styled.p`
  color: ${AZUL};
  font-size: 48px;
  font-weight: bold;
  margin: 0;
  text-overflow: ellipsis;
  width: 100%;

  @media (max-width: 991px) {
    font-size: 40px;
    text-align: center;
  }

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

export const DescricaoOferta = styled.p`
  text-align: justify;
`;

export const ValorOfertaContainer = styled.div`
  @media (max-width: 478px) {
    display: flex;
    justify-content: center;
  }
`;

export const ValorOferta = styled.label`
  font-weight: bold;
  background-color: ${CINZA_50};
  padding: 3px 8px;
  border-radius: 8px;
  color: ${VERDE_20};

  @media (max-width: 478px) {
    text-align: center;
  }
`;

export default Content;
