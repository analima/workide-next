import { lighten } from 'polished';
import styled from 'styled-components';
import {
  AZUL,
  BRANCO,
  BRANCO_GELO,
  CINZA_80,
  PRETO_10,
  PRETO_40,
} from '../../../../styles/variaveis';

interface IFiltroInputCheck {
  checked: boolean;
}

interface IFiltroProps {
  filtro: boolean;
  sizeFilter?: string;
}

const Content = styled.section<IFiltroProps>`
  border: 1px solid ${PRETO_40};
  padding: ${({ sizeFilter }) => (sizeFilter === 'small' ? '0px' : '8px')};
  border-radius: 8px;
  width: ${({ sizeFilter }) => (sizeFilter === 'small' ? '100%' : '357px')};

  h4 {
    font-size: 16px;
  }

  @media (max-width: 990px) {
    width: 100% !important;
  }

  @media (max-width: 900px) {
    margin: 10px 0;
  }
  @media (max-width: 178px) {
    width: 100%;
  }
`;

export const CloseModal = styled.span`
  display: flex;
  justify-content: flex-start;
`;

export const ContentIcon = styled.div<IFiltroProps>`
  display: flex;
  justify-content: ${({ sizeFilter }: IFiltroProps) =>
    sizeFilter === 'small' ? 'space-around' : 'space-between'};
  align-items: center;
  gap: 2px;
  margin-bottom: ${({ sizeFilter }: IFiltroProps) =>
    sizeFilter === 'small' ? '0px' : '16px'};
  padding: 4px;

  @media (max-width: 995px) {
    padding: 0;
    margin: 0;
  }

  > svg {
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  span {
    font-size: 12px;
    color: ${PRETO_40};
  }
`;

export const Favoritos = styled.button`
  background-color: ${AZUL};
  color: ${BRANCO};
  border-radius: 24px;
  border: none;
  font-weight: bold;
  padding: 8px 24px;
  font-size: 24px;
  margin-top: 1rem;

  svg {
    margin-right: 8px;
  }

  &:hover {
    background-color: ${lighten(0.05, AZUL)};
  }
`;

export const TitleResultado = styled.span`
  font-size: 12px;
  font-weight: bold;
`;

export const CardInput = styled.div`
  border: solid 1px ${BRANCO_GELO};
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;

  h5 {
    font-size: 16px;
    color: ${AZUL};
    font-weight: bold;
  }

  .content-input-check {
    padding: 0px 20px;
    margin-bottom: 32px;

    :last-child {
      margin-bottom: 0px;
    }

    .input-check {
      font-size: 12.8px;
    }

    .form-check-label {
      margin-top: 0;
    }
  }
`;

export const CardFiltro = styled.div`
  border: 1px solid ${CINZA_80};
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 16px;

  @media (max-width: 995px) {
    margin: 4px 0;
    padding: 2px 2px;
  }

  @media (max-width: 400px) {
    padding: 6px 0;
    margin: 1px 0;
    font-size: 16px;
  }

  .content-toggle {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;

    span {
      font-size: 16px;
      color: ${PRETO_10};
    }

    .toggle > input {
      display: none;
    }

    .toggle > label {
      position: relative;
      display: block;
      height: 30px;
      width: 62px;
      background-color: #fff;
      border: 1px ${AZUL} solid;
      border-radius: 100px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .toggle > label:after {
      position: absolute;
      left: 8px;
      top: 3px;
      display: block;
      width: 22px;
      height: 22px;
      border-radius: 100px;
      background: ${AZUL};
      box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.05);
      content: '';
      transition: all 0.3s ease;
    }

    .toggle > label:active:after {
      transform: scale(1.15, 0.85);
    }

    .toggle > input:checked ~ label {
      background-color: ${AZUL};
      border: 1px ${AZUL} solid;
    }

    .toggle > input:checked ~ label:after {
      left: 30px;
      background-color: ${BRANCO};
    }
    .toggle > input:disabled ~ label {
      background-color: #d5d5d5;
      pointer-events: none;
    }
    .toggle > input:disabled ~ label:after {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
`;

export const FiltroInputCheck = styled.div<IFiltroInputCheck>`
  margin: 8px;
  display: flex;
  align-items: center;
  gap: 8px;

  input#basico,
  input#intermediario,
  input#avancado,
  input#especialista,
  input#estrelas3,
  input#estrelas4,
  input#estrelas5,
  input#indiferente,
  input#escopo_aberto,
  input#escopo_fechado {
    width: 16px;
    height: 16px;
    min-width: 16px;
    border-radius: 50%;
  }

  div {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .form-check {
    display: flex;
    align-items: center;
  }
  .form-check .form-check-input {
    margin: 0;
  }
`;

export const FiltroGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
`;

export const FiltroInputData = styled.div<IFiltroInputCheck>`
  margin: 8px;

  > label {
    cursor: pointer;
    width: 65px;
    height: 32px;
    border-radius: 24px;
    padding: 8px;
    text-align: center;
    color: ${props => (props.checked ? BRANCO : AZUL)};
    background-color: ${props => (props.checked ? AZUL : BRANCO)};
    border: solid 1px ${AZUL};
    font-size: 12px;
    font-weight: bold;
  }

  input {
    display: none;
  }
`;

export const FiltroGroupData = styled.div`
  display: flex;
  flex-wrap: wrap;

  input {
    width: 122px;
  }
`;

export const FiltroLegenda = styled.label``;

export const ContentButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 48px;
`;

export const Button = styled.button`
  padding: 16px 32px;
  font-weight: bold;
  font-size: 12px;
  border: 0;
  background-color: ${AZUL};
  border-radius: 8px;
  color: ${BRANCO};
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${AZUL};
    color: ${BRANCO};
  }

  @media (max-width: 1200px) {
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 478px) {
  }
`;
export default Content;
