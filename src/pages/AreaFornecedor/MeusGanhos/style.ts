import styled from 'styled-components';
import { AZUL, AZUL_60, BRANCO } from '../../../styles/variaveis';

export const ContentButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;
`;

export const GhostButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;
  padding: 16px 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid ${AZUL};
  color: ${AZUL};
  font-weight: bold;

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
