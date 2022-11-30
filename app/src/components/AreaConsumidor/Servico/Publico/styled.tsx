import { Accordion } from 'react-bootstrap';
import styled from 'styled-components';
import { AZUL, BRANCO, LARANJA, PRETO_10 } from '../../../../styles/variaveis';

interface TypographyProps {
  cor?: string;
  tamanho?: string;
}

const TypographyStyled = styled.p<TypographyProps>`
  color: ${props => (props.cor ? props.cor : PRETO_10)};
  font-size: ${props => (props.tamanho ? props.tamanho : '24px')};
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

export const ContentPrimary = styled.div``;

export const ContentUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;

  div {
    display: flex;
    align-items: center;
    gap: 10px;

    strong {
      font-size: 16px;
      color: ${AZUL};
      line-height: 24px;
    }
  }
`;

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;

  object-fit: cover;
`;
export const ContentNota = styled.section`
  svg {
    width: 22px;
    height: 22px;
  }
`;

export const LabelNota = styled.label`
  color: ${LARANJA};
  margin: 0 8px 0 0;
`;

export const ContentSecondary = styled.div``;

export const Description = styled.span`
  font-size: 12px;
  color: ${PRETO_10};
  line-height: 19px;
`;

export const AccordionPrimary = styled(Accordion)`
  background-color: ${BRANCO};
  border: none;
`;

export const AccordionSecondary = styled(Accordion.Toggle)`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;

  background-color: ${BRANCO};

  span {
    font-size: 20px;
    color: ${AZUL};
    font-weight: bold;
  }
`;

export const RequisitoContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;

  svg {
    min-width: 16px;
    min-height: 16px;
  }
`;

export const RequisitoLabel = styled.span`
  font-size: 12.8px;
  color: ${PRETO_10};
`;

export default TypographyStyled;
