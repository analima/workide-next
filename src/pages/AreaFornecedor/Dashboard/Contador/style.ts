import styled from 'styled-components';

import { BRANCO, VERDE } from '../../../../styles/variaveis';

interface ContadorProps {
  destaque?: boolean;
  isCursorPointer?: boolean;
}

export const Content = styled.article<ContadorProps>`
  margin-top: 16px;
  background-color: ${props => (props.destaque ? VERDE : BRANCO)};
  border-radius: 8px;
  padding: 20px 40px;
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: ${props => (props.isCursorPointer ? 'pointer' : 'unset')};
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);

    .cabecalho {
      span {
        font-size: 60px;
      }
    }

    .titulo {
      font-size: 18px;
    }
  }

  .cabecalho {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 52px;
      font-weight: bold;
      color: ${props => (props.destaque ? BRANCO : VERDE)};
      transition: font-size 0.2s ease-in-out;
    }

    svg path {
      fill: ${props => (props.destaque ? BRANCO : VERDE)};
    }
  }

  .titulo {
    font-size: 26px;
    color: ${props => (props.destaque ? BRANCO : 'initial')};
    transition: font-size 0.2s ease-in-out;
  }

  @media (max-width: 414px) {
    .cabecalho {
      span {
        font-size: 42px;
      }
    }

    .titulo {
      font-size: 24px;
    }
  }
`;
