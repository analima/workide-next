import styled, { css } from 'styled-components';
import {
  BRANCO,
  BRANCO_GELO,
  CINZA_20,
  CINZA_30,
  LARANJA,
} from '../../styles/variaveis';

type SearchInputProps = {
  isFocused: boolean;
};

export const Container = styled.div<SearchInputProps>`
  display: flex;
  align-items: center;
  height: 79px;
  background-color: ${BRANCO_GELO};
  gap: 32px;
  padding: 13px 0;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  svg {
    filter: opacity(75%);
    font-size: 20px;
  }

  input {
    color: #212529;
    font-weight: 400;
    line-height: 1.5;
    flex-grow: 1;
    border: 0;
    font-size: 1rem;
    width: 100%;
    padding: 4px 0;

    &::placeholder {
      color: ${CINZA_30};
    }

    &:focus {
      outline-width: 0;
    }
  }

  section {
    width: 100%;
    display: flex;
    gap: 10px;
    align-items: center;
    border: 1px solid ${CINZA_20};
    border-radius: 0.25rem;
    padding: 14px 12px;
    background-color: ${BRANCO};

    ${props =>
      props.isFocused &&
      css`
        color: #212529;
        background-color: #fff;
        border-color: #86b7fe;
        outline: 0;
        box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
      `}
  }

  div {
    border-radius: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    cursor: pointer;
    min-height: 80px;
    min-width: 80px;
    background-color: ${LARANJA};

    svg {
      filter: opacity(75%);
      font-size: 20px;
    }
  }

  @media (max-width: 991px) {
    justify-content: space-between;
    gap: 8px;

    input {
      font-size: 14px;
      padding: 0;
    }

    section {
      max-width: 90%;
    }

    div {
      min-width: 60px;
      min-height: 60px;

      svg {
        width: 32px;
        height: 32px;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 4px 0;
    height: 60px;

    section {
      padding: 8px 6px;
    }

    div {
      min-height: 48px;
      min-width: 48px;

      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
`;
