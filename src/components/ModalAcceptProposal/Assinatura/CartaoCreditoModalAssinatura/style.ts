import { lighten } from 'polished';
import styled from 'styled-components';
import { AZUL, BRANCO, CINZA_40 } from '../../../../styles/variaveis';

export const Content = styled.div`
  /* Não funciona, verificar pq o modal não pega estilo */
  /* .cartao-modal {
    background-color: rgba(128, 128, 128, 0.8);
    z-index: 9999999;
  } */
`;

export const BtnAdicionarCartao = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  color: ${BRANCO};

  background-color: ${AZUL};
  margin-right: 16px;
  border: none;

  &:hover {
    color: ${BRANCO};
    background-color: ${lighten(0.1, AZUL)};
  }
`;

export const LabelAdicionarCartao = styled.span`
  color: ${CINZA_40};
`;

export const BoxRegistrosCartao = styled.div`
  border: solid 1px ${AZUL};
  border-radius: 8px;
  margin: 24px 0;
  height: 120px;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const RegistrosCartao = styled.ul``;

export const Cartao = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 16px 7px 0;

  div {
    display: flex;
    align-items: center;
  }

  input {
    width: 18px;
    height: 18px;
    margin-right: 10px;
  }

  svg {
    &:hover {
      color: ${AZUL};
      cursor: pointer;
    }
  }
`;

export const CardText = styled.span``;

export const LoadingText = styled.span`
  width: 100%;
  padding: 10px 0;
  font-weight: bold;
  font-size: 20px;
`;
