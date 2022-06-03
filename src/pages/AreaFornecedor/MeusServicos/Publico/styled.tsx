import styled from 'styled-components';
import { AZUL, BRANCO, CINZA_50, VERDE_20 } from '../../../../styles/variaveis';

export const Content = styled.section`
  .container-image {
    margin-right: 20px;
  }
`;

export const ServicoImagem = styled.img`
  border-radius: 8px;
  width: 196px;
  height: 196px;
  object-fit: cover;
`;

export const ServicoAcao = styled.div`
  display: flex;
  justify-content: right;
  cursor: pointer;

  svg {
    margin-left: 16px;
  }
`;

export const LabelValor = styled.label`
  font-weight: bold;
  background-color: ${CINZA_50};
  padding: 3px 8px;
  border-radius: 8px;
  color: ${VERDE_20};

  @media (max-width: 478px) {
  }
`;

export const ContentButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Button = styled.button`
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;
  padding: 16px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid ${AZUL};
  color: ${AZUL};
  font-weight: bold;

  &:hover {
    color: ${BRANCO};
    background-color: ${AZUL};
    border-color: ${BRANCO};
  }

  @media (max-width: 478px) {
    width: 100%;
    font-size: 12px;
  }
`;

export const LinkReportAnuncio = styled.a`
  text-decoration: none;
  color: ${AZUL};
  font-size: 12px;
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
type PropsDescription = {
  isSpace: boolean;
};

export const TypographyDescriptionStyled = styled.p<PropsDescription>`
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: ${props => (props.isSpace ? 'initial' : 'nowrap')};
`;
