import { lighten } from 'polished';
import styled from 'styled-components';

import {
  AZUL,
  AZUL_60,
  BRANCO,
  CINZA_10,
  CINZA_20,
  LARANJA,
} from '../../../styles/variaveis';

interface IInputProps {
  disable: boolean | undefined;
}

export const Container = styled.div`
  label {
    margin-bottom: 6px;
  }
`;

export const Input = styled.div<IInputProps>`
  display: flex;
  flex-direction: column;

  div.container-input {
    display: flex;
    width: 100%;

    div.container-autocomplete {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
  input {
    background-color: ${props => (props.disable ? CINZA_10 : BRANCO)};
    padding: 12px;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow-y: hidden;
    border: 1px solid ${CINZA_20};
    /* margin-right: 7px; */
    
    ${props => (props.disable ? 'pointer-events: none;' : null)}

    :focus {
      border: none;
      outline: rgba(155, 215, 255, 0.9);
      box-shadow: 0 0 2px 4px rgba(155, 215, 255, 0.9);
      margin: 0;
    }
  }
`;

export const Tags = styled.div`
  & > div {
    width: 100%;
    display: flex;
    flex-flow: wrap;

    & > span {
      margin-top: 0.5em;
      margin-right: 0.5em;
      background-color: ${AZUL};
      padding: 4px 8px 4px 16px;
      height: 32px;
      border-radius: 16px;
      color: ${BRANCO};

      & > span {
        margin: 0 0 0 8px;
        font-style: normal;
        background-color: ${AZUL_60};
        padding: 0 6px;
        width: 24px;
        font-size: 14px;
        border-radius: 50%;
        color: ${BRANCO};
        cursor: pointer;
      }
    }
  }
`;

export const ContentInput = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  height: 100px;
`;

export const Button = styled.button`
  margin-left: 16px;
  width: 51px;
  height: 51px;
  border: 0;
  border-radius: 3px;
  background-color: ${LARANJA};
  color: ${BRANCO};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${lighten(0.05, LARANJA)};
  }
`;

export const AutocompleteList = styled.ul`
  width: 99%;
  border-radius: 0 0 5px 5px;
  background-color: ${BRANCO};
  max-height: 15rem;
  overflow-y: auto;
  border: solid 1px ${CINZA_20};

  li {
    padding: 10px 15px;
    list-style: none;
    cursor: pointer;
  }
`;
