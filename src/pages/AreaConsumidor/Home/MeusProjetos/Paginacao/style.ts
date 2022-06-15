import styled from 'styled-components';
import { BRANCO, AZUL } from '../../../../../styles/variaveis';

export const Content = styled.div`
  display: flex;
  width: 100%;
`;

export const Registro = styled.div`
  display: flex;
  flex: 1;
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
