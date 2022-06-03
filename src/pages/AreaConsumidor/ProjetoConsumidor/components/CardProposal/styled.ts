import styled from 'styled-components';
import {
  AZUL,
  AZUL_60,
  BRANCO,
  BRANCO_GELO,
  LARANJA,
  CINZA_40,
  PRETO_60,
  VERMELHO,
  CINZA_10,
} from '../../../../../styles/variaveis';

export const ContentStyled = styled.section`
  .selected-items__container-icons-export {
    margin-left: auto;
    background: ${CINZA_10};
    width: 40px;
    height: 40px;
    border-radius: 10px;
    border: 1px solid ${AZUL};
    display: flex;
    max-width: 50px;
    justify-content: center;
    align-items: center;

    > div {
      cursor: pointer;
    }
  }
`;

export const ContentButtonStyled = styled.div`
  display: flex;
  grid-gap: 40px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  button:first-child {
    margin-left: auto;
  }
`;
type Props = {
  color: string;
  recused?: boolean;
};

export const ButtonMainStyled = styled.button<Props>`
  background-color: ${props =>
    props.color !== 'DEFAULT' ? props.color : '#FFF'};
  transition: all 0.2s ease-in-out;
  padding: 16px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid
    ${props => (props.color !== 'DEFAULT' ? props.color : AZUL_60)};
  color: ${props => (props.color !== 'DEFAULT' ? BRANCO : AZUL_60)};
  font-weight: bold;
  font-size: 10px;
  text-transform: uppercase;

  &:hover {
    color: ${props => (props.color !== 'DEFAULT' ? AZUL_60 : BRANCO)};
    color: ${props => props.recused && LARANJA};
    background-color: ${props =>
      props.color !== 'DEFAULT' ? BRANCO : AZUL_60};
  }

  @media (max-width: 478px) {
    width: 100%;
    font-size: 12px;
  }

  span {
    width: 20px;
    height: 20px;
    margin: 0;
  }
`;

export const Container = styled.div`
  padding: 25px;
`;

export const HeaderStepsStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 8px;
  flex-wrap: wrap;

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

  section {
    width: 120px;
  }
`;
export const PriceStyled = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 25px;
  color: AZUL_60;
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
    }
  }
`;

export const ErrorAxexo = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: ${VERMELHO};
`;

export const ContentMessages = styled.div``;
export const ContentDescription = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 990px) {
    flex-direction: column;
  }
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

export const ContentInputStyled = styled.div`
  position: absolute;
  z-index: 999;
  display: flex;
  align-self: center;
  justify-self: flex-end;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  bottom: 15px;
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
export const ContainerAnexos = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
`;

export const Anexos = styled.a`
  text-decoration: none;
  margin: 5px;
  color: ${BRANCO};
  font-size: 14px;
  text-align: center;
  border-radius: 5px;
  padding: 5px;
  background-color: ${AZUL_60};
  &:hover {
    color: ${BRANCO_GELO};
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

export const Titulo = styled.div`
  padding: 0 4px;
  border: solid 1px ${CINZA_40};
  border-radius: 8px;
  color: ${CINZA_40};
  margin: 8px 4px;
`;

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
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  .spinner-border {
    width: 1rem;
    height: 1rem;
    color: ${BRANCO};
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
    props.status !== ('RECUSADA' || 'CANCELADA') ? '#00c09e' : '#868e96'};
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
      color: ${props => (props.status !== 'RECUSADA' ? PRETO_60 : '#868e96')};
    }
  }

  .taxa-adm {
    display: flex;
    justify-content: space-between;

    width: 150px;

    span {
      font-size: 12px;
      color: ${props => (props.status !== 'RECUSADA' ? PRETO_60 : '#868e96')};
    }
  }

  p {
    font-size: 24px;
    margin: 0px;
  }

  span {
    font-size: 12px;
    color: ${props => (props.status !== 'RECUSADA' ? PRETO_60 : '#868e96')};
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
