import { lighten } from 'polished';
import styled from 'styled-components';
import { AZUL, BRANCO, PRETO, PRETO_10, LARANJA } from 'src/styles/variaveis';
import OndaGradiente from '../../assets/onda-gradiente2.svg';

export const ItemPolitica = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  z-index: 99999999;

  .icon-politica {
    width: 40px;
    height: 40px;
  }

  p {
    width: 90%;
    margin-left: auto;
    margin-top: auto;
    margin-bottom: auto;
  }
`;

export const PoliticaParagrafo = styled.p`
  color: ${LARANJA};
  font-family: 'Renner';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  margin-top: 2px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const Content = styled.div`
  z-index: 1;
  align-items: center;
  display: flex;
  width: 100%;
  justify-content: center;

  background-image: url(${OndaGradiente.src});
  background-repeat: no-repeat;
  background-position: center;

  .ondaGradiente {
    position: absolute;
  }

  .logo {
    text-align: center;
    padding: 0;
  }

  .form-content {
    width: 570px !important;
    margin: auto;
    transition-property: width;
    transition-duration: 1s;
    box-shadow: 4px 0px 20px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    z-index: 99999;
    padding: 32px;
    background-color: ${BRANCO};
    margin-top: 40px;

    @media (max-width: 660px) {
      width: 100% !important;
      margin-top: 10px;
    }

    .form-switch {
      text-align: center;
      padding: 0;
    }

    .google {
      text-align: center;

      @media (max-width: 660px) {
        width: auto;
      }
      button {
        display: flex;
        gap: 8px;
        align-items: center;
        justify-content: center;
        width: 100%;
        background-color: transparent;
        border: none;
        padding: 16px;
        font-size: 14px;
        border-radius: 5px;
        box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
        text-decoration: none;
        color: ${PRETO};

        @media (max-width: 660px) {
          width: 100%;
          padding: 16px 25px;
        }

        &:hover {
          box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.4);
        }
      }
    }

    #hide {
      display: none;
      font-size: 50px;
    }

    .div-close {
      align-items: flex-end;
      text-align: right !important;
      width: 50px !important;
      display: flex;
      height: 0px;
      font-size: 10px;
      padding-left: 50em;

      @media (max-width: 650px) {
        padding-left: 35em;
      }
    }

    .close {
      padding: 0px;
      border: none;
      background: none;
      font-size: 25px;
    }

    .form-control {
      height: 51px;
      margin-top: 1rem;
      border-radius: 8px;
    }

    .pessoa {
      padding: 16px 108px;

      input {
        border-radius: 5px;
      }
    }

    .btn {
      width: 505px;
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
    .btn-login {
      background-color: ${BRANCO};
      border: 1px solid ${AZUL};
      color: ${AZUL};

      &:hover {
        background-color: ${lighten(0.1, AZUL)};
        color: ${BRANCO};
      }
    }

    .btn-default {
      box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);

      &:hover {
        box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.4);
      }
    }

    .help-block {
      color: red;
    }

    @media (max-width: 600px) {
      .pessoa {
        padding: 16px 10px;
      }
    }
  }

  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }

  .content-tipo-pessoa {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 660px) {
    .btn {
      width: 100% !important;
    }
  }
`;

export const FormTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-items: center;

  img {
    width: 120px;
  }

  h2 {
    font-size: 32px;
    color: ${PRETO_10};
    font-family: 'Renner';
    font-style: normal;
    font-weight: 700;
    line-height: 120%;
  }

  p {
    font-size: 16px;
    color: ${PRETO_10};
    font-family: 'Renner';
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
  }
`;

export const ButtonLogin = styled.span`
  font-family: 'Renner';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 150%;
  text-align: center;
  text-transform: uppercase;
  margin: 20px auto 0;
  color: ${AZUL};
  cursor: pointer;
`;

export const LinksFooter = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 32px;

  a {
    font-size: 11px;
    text-decoration: none;
    color: ${PRETO_10};
    opacity: 0.8;
    font-weight: bold;
  }
`;

export const LinkToTerms = styled.a`
  color: ${AZUL};
  font-weight: bold;
  text-decoration: none;
`;

export const InputCheck = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 15px;
  margin-right: 15px;
`;

export const ContainerInputCheck = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  span {
    width: 90%;
    font-size: 12px;

    a {
      color: #000;
      font-size: 14px;
    }
  }
`;

export const ContainerTermos = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 8px;
`;

export const Termos = styled.span`
  padding: 2px 10px;

  a {
    text-decoration: none;
    font-family: 'Renner';
    font-style: normal;
    font-weight: 700;
    font-size: 11px;
    line-height: 150%;
    color: ${PRETO_10};
    padding: 2px;
  }
`;
