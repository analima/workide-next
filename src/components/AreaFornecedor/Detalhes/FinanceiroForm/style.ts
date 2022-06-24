import styled from 'styled-components';
import { AZUL, BRANCO, CINZA_40, VERDE } from '../../../../styles/variaveis';

const Content = styled.section`

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
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


    .conteudo {
      padding: 40px;

      h3 {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: bold;

        span {
          color: ${AZUL};
          font-size: 61px;
          margin-left: 8px;
        }
      }

      ul {
        list-style: none;
        padding: 0;
        li {
          padding: 5px 0;
        }
      }
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

export default Content;
