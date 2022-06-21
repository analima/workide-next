import styled from 'styled-components';
import { AZUL, BRANCO, CINZA_40 } from '../../styles/variaveis';

export const Content = styled.div``;

export const Registro = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const RegistroQuantidade = styled.div`
  color: ${AZUL};
  font-weight: bold;
`;

export const ContainerPaginacao = styled.div`
  button {
    background-color: ${BRANCO};
    border: none;

    &:nth-child(1) {
      margin-right: 3px;
    }
  }
`;

export const ButtonPagina = styled.button`
  margin: 0 3px;
  /* font-size: 13px; */
  color: ${AZUL};

  &:hover {
    cursor: pointer;
  }
  &:disabled {
    color: ${CINZA_40};
  }
`;
