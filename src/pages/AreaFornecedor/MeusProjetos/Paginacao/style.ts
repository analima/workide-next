import styled from 'styled-components';
import { AZUL, BRANCO } from '../../../../styles/variaveis';

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
