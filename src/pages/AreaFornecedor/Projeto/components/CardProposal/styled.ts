import styled from 'styled-components';
import {
  AZUL,
  AZUL_60,
  BRANCO,
  BRANCO_GELO,
  PRETO_60,
  VERMELHO,
} from '../../../../../styles/variaveis';

const ContentStyled = styled.section``;

export const ContentButtonStyled = styled.div`
  display: flex;
  grid-gap: 40px;
  button:first-child {
    margin-left: auto;
  }
`;
type Props = {
  color: string;
};

export const ButtonMainStyled = styled.button<Props>`
  background-color: ${props => props.color};
  transition: all 0.2s ease-in-out;
  padding: 16px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid ${props => props.color};
  color: ${BRANCO};
  font-weight: bold;
  font-size: 10px;
  text-transform: uppercase;

  &:hover {
    color: ${props => props.color};
    background-color: ${BRANCO};
  }

  @media (max-width: 478px) {
    width: 100%;
    font-size: 12px;
  }
`;

export const Container = styled.div`
  padding: 25px;
`;

export const HeaderStepsStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-weight: 700;
    font-size: 12px;
    color: #494949;
  }
  div:nth-child(2n) {
    margin-top: -8px;
  }

  .voluntariado {
    display: flex;
    align-items: center;
    flex-direction: column;

    svg {
      width: 72px;
    }

    span {
      font-size: 14px;
      font-weight: bold;
      color: ${AZUL};
      margin: 0;
    }
  }
`;
export const PriceStyled = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 25px;
  color: #00c09e;
`;
export const DescriptionStyled = styled.div``;

export const TitleDescriptionStyled = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const TypographyDescriptionStyled = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;
export const ContentChatStyled = styled.section`
  border: 1px solid ${AZUL};
  width: 100%;
  height: 800px;

  border-radius: 10px;
  padding: 15px;
  position: relative;
  display: flex;
  flex-direction: column;

  .area-sem-msg {
    text-align: center;
  }

  .area-msg {
    align-self: flex-start;
    justify-content: flex-start;
    width: 100%;
    max-height: 640px;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;

    ::-webkit-scrollbar-track {
      background-color: #f4f4f4;
    }

    ::-webkit-scrollbar {
      width: 4px;
      background: #f4f4f4;
    }

    ::-webkit-scrollbar-thumb {
      background: ${AZUL_60};
      overflow: none;
    }
  }
`;

export const ErrorAxexo = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: ${VERMELHO};
`;

export const ContentDescription = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ContentFooterStyled = styled.div`
  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    span {
      margin-left: 15px;
      font-weight: bold;
    }
  }
`;

export const TextoObersavacao = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: ${PRETO_60};
`;

export const TypographyFooter = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #494949;
`;
export const FileStyled = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ContentInputStyled = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  bottom: 20px;
  width: 92%;

  button {
    margin: 0;
    padding: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    background-color: transparent;
  }
`;

export const ContentFileStyled = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

  span {
    background-color: ${BRANCO};

    svg {
      color: ${AZUL} !important;
    }
  }
`;

export const ContainerAnexoChat = styled.div`
  .div-label {
    line-height: 32px;
    display: flex;
    align-items: center;

    input {
      display: none;
    }
  }
`;

export const Label = styled.label``;

export const ContainerIcone = styled.div`
  padding: 10px 12px;
  margin-right: 16px;
  background-color: ${AZUL};
  border-radius: 8px;
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;

  svg {
    color: ${BRANCO};
    font-size: 20px;
  }

  .spinner-border {
    width: 1rem;
    height: 1rem;
    color: ${BRANCO};
  }
`;

export const InputStyled = styled.input`
  width: 100%;
  padding: 0.75rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  @media (max-width: 660px) {
    max-width: 100%;
    width: 100%;
  }
`;

export const Download = styled.a`
  text-decoration: none;
  color: ${BRANCO};
  font-size: 14px;
  text-align: center;
  background-color: ${AZUL};
  padding: 8px;
  border-radius: 8px;

  &:hover {
    color: ${BRANCO_GELO};
  }
`;

interface StatusProps {
  status: string;
}

export const ValorTotal = styled.div<StatusProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  color: ${props =>
    props.status === 'RECUSADA' || props.status === 'CANCELADA'
      ? '#868e96'
      : '#00c09e'};
  font-weight: bold;

  @media (max-width: 991px) {
    align-items: center;
  }

  .valor-fornecedor {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 4px;
    width: 150px;

    span {
      font-size: 12px;
      color: ${props =>
        props.status === 'RECUSADA' || props.status === 'CANCELADA'
          ? '#868e96'
          : '#494949'};
    }
  }

  .taxa-adm {
    display: flex;
    justify-content: space-between;

    width: 150px;

    span {
      font-size: 12px;
      color: ${props =>
        props.status === 'RECUSADA' || props.status === 'CANCELADA'
          ? '#868e96'
          : '#494949'};
    }
  }

  p {
    font-size: 24px;
    margin: 0px;
  }

  span {
    font-size: 12px;
    color: ${props =>
      props.status === 'RECUSADA' || props.status === 'CANCELADA'
        ? '#868e96'
        : '#494949'};
  }
`;

export const CondicoesGeraisContent = styled.div`
  margin-top: 32px;
  strong {
    color: ${PRETO_60};
  }

  p {
    color: ${PRETO_60};
    margin: 16px 0px;
  }
  p:first-child {
    margin-top: 24px;
  }
`;

export default ContentStyled;
