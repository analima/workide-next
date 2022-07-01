import styled from 'styled-components';

import {
  BRANCO,
  CINZA_10,
  CINZA_20,
  CINZA_40,
  CINZA_80,
} from '../../styles/variaveis';

export const Container = styled.div`
  label {
    margin-bottom: 6px;
  }

  & > div {
    height: 51px;
    background-color: ${BRANCO};
    padding: 6px 12px;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow-y: hidden;
    border: 1px solid ${CINZA_20};

    span + span {
      margin-left: 0.5rem;
    }

    & > span {
      background-color: ${CINZA_10};
      padding: 4px 8px 4px 16px;
      height: 32px;
      border-radius: 16px;

      & > span {
        margin: 0 0 0 8px;
        font-style: normal;
        background-color: ${CINZA_80};
        padding: 0 6px;
        width: 24px;
        font-size: 14px;
        border-radius: 50%;
        color: ${CINZA_40};
        cursor: pointer;
      }
    }

    input {
      flex: 1;
      min-width: 250px;
      border: 0;
      outline: none;
      padding-left: 1rem;
    }
  }
`;
