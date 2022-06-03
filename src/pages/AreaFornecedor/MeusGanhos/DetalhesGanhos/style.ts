import styled from 'styled-components';

import {
  AZUL_60,
  BRANCO,
  CINZA_10,
  CINZA_40,
  PRETO_10,
  PRETO_60,
  VERDE,
} from '../../../../styles/variaveis';

export const Content = styled.div`
  background-color: ${CINZA_10};

  @media (max-width: 478px) {
    margin-top: 32px;
  }
`;

export const FiltrosContainer = styled.div`
  display: flex;
  align-items: center;

  p {
    margin: 0;
  }
`;

interface IFiltro {
  checked: boolean;
}

export const Filtro = styled.label<IFiltro>`
  margin: 8px;
  padding: 8px 16px;
  color: ${props => (props.checked ? BRANCO : AZUL_60)};
  background-color: ${props => (props.checked ? AZUL_60 : BRANCO)};
  border-radius: 24px;
  border: solid 1px ${AZUL_60};
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;

  input {
    display: none;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .dados {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    span {
      font-size: 14px;
      font-weight: bold;
      color: ${PRETO_10};
    }
  }
`;

export const CardBody = styled.div`
  padding: 32px 64px 0;

  .descricao {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .valores {
    height: 180px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-direction: column;

    h3 {
      font-size: 16px;
      font-weight: bold;
      color: ${PRETO_60};

      :last-child {
        border-top: solid 2px ${PRETO_60};
        color: ${VERDE};
        padding-top: 12px;
      }
    }
  }
`;

export const DetalhesGanhos = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  margin-top: 16px;

  .detalhes-1 {
    display: flex;
    flex-direction: column;
  }

  .detalhes-2 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  span {
    font-size: 11px;
  }
`;

export const CardContent = styled.div`
  height: 300px;
  overflow-x: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar-track {
    background-color: #f4f4f4;
  }
  ::-webkit-scrollbar {
    width: 4px;
    background: #f4f4f4;
  }
  ::-webkit-scrollbar-thumb {
    background: ${CINZA_10};
  }
`;

export const NenhumRepasseEnviado = styled.h4`
  color: ${CINZA_40};
`;
