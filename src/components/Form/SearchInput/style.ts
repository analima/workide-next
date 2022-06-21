import styled, { css } from 'styled-components';
import { CINZA_20, CINZA_30, CINZA_80 } from '../../../styles/variaveis';

type SearchInputProps = {
  isFocused: boolean;
};

export const Container = styled.div<SearchInputProps>`
  display: flex;
  align-items: center;
  height: 51px;
  padding: 12px 0 12px 12px;
  border-radius: 0.25rem;
  border: solid 1px ${CINZA_20};
  background-color: #fff;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  svg {
    filter: opacity(75%);
    font-size: 20px;
  }

  ${props =>
    props.isFocused &&
    css`
      color: #212529;
      background-color: #fff;
      border-color: #86b7fe;
      outline: 0;
      box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
    `}

  input {
    color: #212529;
    font-weight: 400;
    line-height: 1.5;
    flex-grow: 1;
    background: transparent;
    border: 0;
    font-size: 1rem;
    padding-right: 0.75rem;
    width: 90%;

    &::placeholder {
      color: ${CINZA_30};
    }

    &:focus {
      outline-width: 0;
    }
  }

  div {
    border-left: solid 0.1rem ${CINZA_80};
    padding: 0.5rem 0.75rem;
    margin: 0;
    cursor: pointer;

    svg {
      filter: opacity(75%);
      font-size: 20px;
    }
  }
`;
