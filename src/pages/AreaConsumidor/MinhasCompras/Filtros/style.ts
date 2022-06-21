import styled from 'styled-components';
import { AZUL, BRANCO } from '../../../../styles/variaveis';

export const Content = styled.div``;

export const ContainerFiltro = styled.div`
  display: flex;

  @media (max-width: 478px) {
    display: grid;
    grid-template-columns: auto auto;
  }
`;

interface IFiltro {
  checked: boolean;
}

export const Filtro = styled.div<IFiltro>`
  label {
    padding: 4px 16px;
    margin-right: 8px;
    color: ${props => (props.checked ? BRANCO : AZUL)};
    background-color: ${props => (props.checked ? AZUL : BRANCO)};
    border-radius: 24px;
    border: solid 1px ${AZUL};
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    text-align: center;

    @media (max-width: 478px) {
      display: flex;
      justify-content: center;
      margin: 8px 8px 0 0;
    }
  }

  input {
    display: none;
  }
`;

export const ContainerMesAno = styled.div`
  @media (max-width: 478px) {
    select {
      margin-top: 16px;
    }
  }
`;

export const Filtrar = styled.button`
  padding: 10px;
  font-weight: bold;
  width: 100px;
  font-size: 16px;
  border-radius: 8px;
  color: ${BRANCO};
  background-color: ${AZUL};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
`;
