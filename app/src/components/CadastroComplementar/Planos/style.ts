import { lighten } from 'polished';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  AZUL,
  BRANCO,
  CINZA_40,
  PRETO_10,
  VERDE,
} from '../../../styles/variaveis';

const Content = styled.section`
  padding-top: 160px;

  h1 {
    font-size: 16px;
    background: -webkit-linear-gradient(#008fe5, #00c09e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    width: 448px;
    text-align: center;
    margin: 0 auto;
  }

  .box-plano {
    display: flex;
    justify-content: center;
    min-height: 721px;
    min-width: 355px;
    border-radius: 8px;
    margin-top: 50px;
    cursor: pointer;

    .descricao {
      display: flex;
      justify-content: center;
      margin-top: -15px;
      position: absolute;
      color: ${CINZA_40};
      background-color: ${BRANCO};
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 8px;
      padding: 12px 55px;
      min-width: 307px;
      font-weight: bold;

      img {
        padding-left: 8px;
      }
    }

    .descricao.selected {
      background-color: ${AZUL};
      color: ${BRANCO};
    }
  }

  .cartao {
    min-width: 400px;
    min-height: 250px;
    border-radius: 16px;
    background: -webkit-linear-gradient(${AZUL}, ${VERDE});
    margin-top: 30px;

    .dados {
      display: flex;
      flex-direction: column;
      padding: 70px 80px;
      font-weight: bold;
      color: ${BRANCO};
    }
  }

  .acoes {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    a {
      margin-right: 50px;
      text-decoration: none;
      font-weight: bold;
      color: ${AZUL};
    }

    button {
      font-weight: bold;
      font-size: 16px;
      padding: 16px 40px;
      border-radius: 8px;
      background-color: ${AZUL};
    }
  }
`;

export const Button = styled(Link)`
  padding: 16px 40px;
  font-weight: bold;
  color: ${BRANCO};
  background-color: ${AZUL};
  border-radius: 8px;
  border: 1px solid ${AZUL};
  text-decoration: none;
  transition: background-color 0.2s;
  text-decoration: none;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: ${BRANCO};
    background-color: ${lighten(0.1, AZUL)};
  }

  @media (max-width: 478px) {
    width: 100%;
  }
`;

export const LinkBtn = styled(Link)`
  margin-top: 16px;
  font-weight: bold;
  color: ${PRETO_10};
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 478px) {
    width: 100%;
  }
`;

export default Content;
