import styled from 'styled-components';
import { AZUL, BRANCO } from '../../../../styles/variaveis';

const Content = styled.div`
  p {
    margin: 8px 0 0 0;
  }
`;

interface InputProps {
  checked: boolean;
}

export const OrdemInput = styled.div<InputProps>`
  > label {
    cursor: pointer;
    border-radius: 24px;
    padding: 4px 12px;
    text-align: center;
    color: ${props => (props.checked ? BRANCO : AZUL)};
    background-color: ${props => (props.checked ? AZUL : 'transparent')};
    border: solid 1px ${AZUL};
    font-size: 16px;
    font-weight: bold;

    @media (max-width: 478px) {
      width: 100%;
    }
  }

  input {
    display: none;
  }
`;

export const FavoritoInput = styled.div<InputProps>`
  > label {
    cursor: pointer;
    border-radius: 24px;
    padding: 8px 10px;
    text-align: center;
    color: ${props => (props.checked ? BRANCO : AZUL)};
    background-color: ${props => (props.checked ? AZUL : 'transparent')};
    border: solid 1px ${AZUL};
    font-size: 16px;
    font-weight: bold;

    svg {
      margin-right: 8px;
    }

    @media (max-width: 478px) {
      width: 100%;
      margin-top: 16px;
    }
  }

  input {
    display: none;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const OrdemGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Label = styled.span`
  background-color: ${AZUL};
  border-radius: 24px;
  padding: 4px 12px;
  font-size: 12px;
  text-align: center;
  color: ${BRANCO};
  font-weight: bold;
  margin-right: 4px;
`;

export const FiltrosAplicados = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

export const ContentFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;

  @media (max-width: 578px) {
    flex-direction: column-reverse;
  }

  p {
    margin: 0;
  }
`;

export const Button = styled.button`
  padding: 10px;
  font-weight: bold;
  color: ${AZUL};
  background-color: ${BRANCO};
  border-radius: 8px;
  border: 1px solid ${AZUL};
  font-size: 12px;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${AZUL};
    color: ${BRANCO};
  }

  @media (max-width: 478px) {
    width: 100%;
    margin-top: 16px;
    margin-bottom: 8px;
  }
`;

export default Content;
