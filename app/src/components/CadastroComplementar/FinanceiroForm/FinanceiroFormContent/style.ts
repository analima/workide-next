import { CINZA_30, LARANJA } from './../../../../styles/variaveis';
import styled from 'styled-components';
import { AZUL, BRANCO, CINZA_40, VERDE } from '../../../../styles/variaveis';

const Content = styled.section`
  display: flex;

  .container-planos {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
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

export const Actions = styled.section`
  display: flex;
  justify-content: flex-end;
  margin: 32px 0;

  * + * {
    margin-left: 16px;
  }
`;

export const Subtitle = styled.span`
  color: ${CINZA_30};
  font-weight: bold;
`;

export const SubtitleSecondary = styled.span`
  color: ${LARANJA};
  font-weight: bold;
`;

export default Content;
