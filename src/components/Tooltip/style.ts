/* eslint-disable indent */
import styled from 'styled-components';
import { BRANCO, CINZA_40 } from '../../styles/variaveis';


export const Container = styled.div`
  position: absolute;
  right: -200px;

  div {
    bottom: 100px;
    width: 221px;
    height: 100px;
    background-color: ${BRANCO};
    padding: 16px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    display: flex;
    flex-direction: column;

    a {
      cursor: pointer;
      color: ${CINZA_40};
      text-decoration: none;
      list-style: none;

      &:hover {
        filter: brightness(1.2);
    }
  }
}

`;