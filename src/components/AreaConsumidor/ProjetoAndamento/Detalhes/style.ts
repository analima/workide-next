import { lighten } from 'polished';
import styled, { css } from 'styled-components';
import {
  AZUL,
  AZUL_60,
  BRANCO,
  BRANCO_GELO,
  CINZA_10,
  LARANJA,
  PRETO_60,
  VERDE,
  VERMELHO,
} from '../../../../styles/variaveis';

const Content = styled.div`
  .selected-items__container-icons-export {
    margin-left: auto;

    background: ${CINZA_10};
    padding: 5px 10px;
    border-radius: 10px;
    border: 1px solid ${AZUL};
    display: flex;
    max-width: 50px;
    justify-content: center;

    > div {
      cursor: pointer;
    }
  }
`;

export const TextoNegrito = styled.strong``;

export const Descricao = styled.p`
  margin: 0;
`;

export const TextoDescricao = styled.p`
  word-wrap: break-word;
  margin: 0;
`;

export const ArquivoAnexadoContainer = styled.div`
  display: inline-grid;
  margin-top: 16px;
`;

export const HourContainer = styled.div``;

export const ContentQuantidadeHora = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;

  strong {
    font-size: 16px;
    color: ${VERDE};
  }
`;

export const HourTitulo = styled.div`
  padding: 16px;
  background-color: ${AZUL};
  margin: 8px 0;
  color: ${BRANCO};
  font-weight: bold;

  @media (max-width: 478px) {
    text-align: center;
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

type PropsButton = {
  disabled?: boolean;
};

export const ButtonDesistir = styled.button<PropsButton>`
  padding: 16px 40px;
  font-weight: bold;
  color: ${BRANCO};
  background-color: ${(props: PropsButton) =>
    props.disabled ? '#ccc' : LARANJA};
  border-radius: 8px;
  border: 1px solid
    ${(props: PropsButton) => (props.disabled ? '#ccc' : LARANJA)};
  font-size: 12px;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props: PropsButton) =>
      props.disabled ? '#ccc' : lighten(0.1, LARANJA)};
  }
`;

export const ContainerAcoes = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  button {
    margin: 8px;
  }

  @media (max-width: 478px) {
    button {
      width: 100%;
      margin: 8px 0;
    }
    flex-direction: column;
    justify-content: center;
  }
`;

export const ContentChatStyled = styled.section`
  border: 1px solid ${AZUL};
  width: 100%;
  height: 1000px;

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
    max-height: 840px;
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
    cursor: pointer;

    :hover {
      opacity: 0.8;
    }
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
`;

export const Information = styled.span`
  font-size: 16px;
  color: ${PRETO_60};
  margin: 20px 0;
`;

export const ContainerProposalPrice = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;

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

interface StatusProps {
  status: string;
}

export const ValorTotal = styled.div<StatusProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  color: #00c09e;
  font-weight: bold;

  ${({ status }) =>
    status === 'CANCELADO' &&
    css`
      color: #868e96;
    `}

  ${({ status }) =>
    status === 'RECUSADA' &&
    css`
      color: #868e96;
    `}

  @media (max-width: 991px) {
    align-items: center;
  }

  .valor {
    color: #00c09e;
    font-weight: bold;
    font-size: 24px;

    ${({ status }) =>
      status === 'CANCELADO' &&
      css`
        color: #868e96;
      `}

    ${({ status }) =>
      status === 'RECUSADA' &&
      css`
        color: #868e96;
      `}
  }
`;

export const ContainerButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default Content;
