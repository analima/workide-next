import styled from 'styled-components';
import { AZUL, BRANCO, LARANJA } from '../../../styles/variaveis';

export const Content = styled.div``;

export const ContainerFiltro = styled.div`
  /* display: flex; */
`;

export const Tipo = styled.input``;

export const Filtros = styled.div``;

export const ContainerTipoFiltro = styled.div`
  display: flex;
  margin: 36px 0;
`;

interface ITipoFiltro {
  checked: boolean;
}

export const TipoFiltro = styled.div<ITipoFiltro>`
  transition: all 0.5s ease-in-out;
  background-color: ${props => (props.checked ? LARANJA : BRANCO)};
  color: ${props => (props.checked ? BRANCO : LARANJA)};
  padding: 16px;
  width: 184px;
  margin-right: 8px;
  border-radius: 4px;

  label {
    font-weight: bold;
  }

  input {
    display: none;
  }
`;

export const GhostButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;
  width: 250px;
  padding: 16px 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid ${AZUL};
  color: ${AZUL};
  font-weight: bold;
  margin-right: 16px;

  &:hover {
    color: ${BRANCO};
    background-color: ${AZUL};
    border-color: ${BRANCO};
  }

  @media (max-width: 478px) {
    width: 100%;
    font-size: 12px;
  }
`;
