import { lighten } from 'polished';
import styled from 'styled-components';
import { AZUL, BRANCO, PRETO, PRETO_10, LARANJA } from '../../styles/variaveis';
import Button from '../Button';

interface Props {
  isActive: boolean;
  display: string;
}

export const ItemPolitica = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;

  .icon-politica {
    width: 32px;
    height: 32px;
  }

  p {
    margin: 0;
    font-size: 14px;
    text-align: justify;
  }
`;

interface IProps {
  showModal: boolean;
}

export const ContentModal = styled.div`
  position: fixed;
  padding: 24px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.9);
  top: 20%;
  background-color: ${BRANCO};
  right: 40px;
  width: 500px;
  border-radius: 8px;
  flex-direction: column;
  display: ${(props: IProps) => (props.showModal ? 'flex' : 'none')};
  opacity: ${(props: IProps) => (props.showModal ? 1 : 0)};
  transition: opacity 0.4s ease;
`;

export const PoliticaParagrafo = styled.p`
  color: ${LARANJA};
  font-weight: 900;
  font-size: 14px;
  margin: 0;
  cursor: pointer;
`;

export const Content = styled.div<Props>`
  z-index: 2;
  align-items: center;
  position: fixed;
  position: absolute;
  right: 0;
  top: 0;
  transition: all 700ms;
  transform: translateX(${props => (props.isActive ? '0' : '100%')});
  display: ${props => props.display};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5) !important;
  border-bottom-left-radius: 16px;

  .logo {
    text-align: center;
    padding: 0;
  }

  .form-content {
    background-color: red;
    width: 600px !important;
    transition-property: width;
    transition-duration: 1s;
    padding: 32px;
    border-bottom-left-radius: 16px;

    background-color: ${BRANCO};

    @media (max-width: 660px) {
      width: 465px !important;
    }

    @media (max-width: 470px) {
      padding: 80px 20px;
      width: 400px !important;
    }

    @media (max-width: 395px) {
      width: 100% !important;
    }

    .form-title {
      color: ${PRETO};
      margin-bottom: 25px;
      h2 {
        font-size: 61px;
        font-weight: bold;
      }
    }

    .form-switch {
      text-align: center;
      padding: 0;
    }

    .google {
      text-align: center;

      @media (max-width: 660px) {
        width: 85%;
        margin-bottom: 80px;
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
          width: inherit;
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
      width: 100%;
      height: 48px;
      border-radius: 8px;
      padding: 16px 0;
      margin: 1rem 0;
      display: flex;
      justify-content: center;
      align-items: center;

      @media (max-width: 990px) {
        width: 50%;
        align-self: center;
        justify-self: center;
      }
    }

    .btn-primary {
      background-color: ${AZUL};
      &:hover {
        background-color: ${lighten(0.1, AZUL)};
        border: ${lighten(0.1, AZUL)};
      }
    }

    .btn-login {
      background-color: ${BRANCO};
      border: 1px solid ${AZUL};
      color: ${AZUL};

      &:hover {
        background-color: ${lighten(0.1, AZUL)};
        border: 1px solid ${lighten(0.1, AZUL)};
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
`;

export const FormTitle = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  svg {
    position: absolute;
    top: 0;
    left: 0;
    margin: 8px;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }

  h2 {
    font-size: 48px;
    font-weight: bold;
    color: ${PRETO_10};
    opacity: 0.8;
  }

  p {
    font-size: 16px;
    color: ${PRETO_10};
    opacity: 0.8;
  }
`;

export const ButtonLogin = styled(Button)``;

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

export const InputCheck = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 15px;
`;

export const ContainerInputCheck = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;

  span {
    width: 90%;
    font-size: 12px;

    a {
      color: #000;
      font-size: 12px;
    }
  }
`;

export const TituloCadastroManual = styled.h4`
  margin: 20px 0;
`;

export const ContainerButtons = styled.div`
  display: flex !important;
  flex-direction: column !important;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;

  button {
    position: relative !important;
    align-self: center !important;
    justify-self: center !important;
    right: 0;
    width: 90% !important;
  }
`;
