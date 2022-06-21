import styled from 'styled-components';
import { lighten } from 'polished';
import { AZUL, BRANCO, PRETO } from '../../styles/variaveis';

export const ContainerLogin = styled.div`
  margin: 10px;
  max-width: 100%;
  max-height: 100vh;
  display: flex;
  justify-content: center;

  .logo {
    text-align: center;
    padding: 0;
  }

  .form-content {
    width: 500px;

    transition-property: width;
    transition-duration: 1s;

    padding: 30px;
    border-radius: 16px;
    background-color: ${BRANCO};

    .form-title {
      color: ${PRETO};
      h2 {
        font-size: 50px;
        font-weight: bold;
      }
    }

    .form-switch {
      text-align: center;
      padding: 0;
    }

    .google {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 20px 0 20px 0;
      width: 100%;
      height: 27px;

      background: #ffffff;
      border: 1px solid;
      border-radius: 10px;
      box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);

      text-align: center;
      margin: 24px 0;
      width: 100%;
      a {
        font-size: 1em;
        text-decoration: none;
        color: ${PRETO};
      }
    }

    .esqueci {
      order: 0;
      width: 320px;
      margin: 7px 10px 0 5px;

      a {
        font-family: Renner;
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        color: #000000;
        border-radius: 5px;
        text-decoration: none;
        color: ${PRETO};

        &:hover {
          text-shadow: 0px 4px 16px rgba(0, 0, 0, 0.4);
        }
      }
    }

    div.form-check {
      display: flex !important;
      align-items: center !important;
      justify-content: space-around !important;
      width: 100%;
      margin-top: 0;
      label {
        padding-top: 7px !important;
      }
    }

    .conectado {
      width: 200px;
      height: 24px;
      margin-right: 5px;

      font-family: Renner;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      color: #000000;
    }

    .form-control {
      height: 40px;
      margin-top: 1rem;
      border-radius: 8px;
    }

    .btn {
      width: 100%;
      height: 47px;
      border-radius: 8px;
      padding: 16px 0;
      margin: 1rem 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .btn-primary {
      background-color: ${AZUL};
      background-color: ${AZUL};

      &:hover {
        background-color: ${lighten(0.1, AZUL)};
      }
    }

    .btn-default {
      box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);

      &:hover {
        box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.4);
      }
    }
    .btn-login {
      background-color: ${BRANCO};
      background-color: ${BRANCO};
      text-decoration: none;
      color: ${AZUL};

      &:hover {
        background-color: ${lighten(0.1, AZUL)};
      }
    }

    .help-block {
      color: red;
    }
  }
  @media (max-width: 600px) {
    .form-content {
      width: 100%;
    }
    .google {
    }
    .btn {
      width: 50%;
    }
  }
`;
