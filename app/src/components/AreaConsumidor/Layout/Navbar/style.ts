import { Modal } from 'react-bootstrap';
import Link from 'next/link';
import styled from 'styled-components';

import {
  BRANCO,
  LARANJA,
  PRETO_60,
  CINZA_30,
  CINZA_80,
  AZUL,
} from '../../../../styles/variaveis';

interface GhostButtonProps {
  opacity?: number;
}

const Content = styled.div`
  background-color: ${AZUL};
  height: 76px;
  display: flex;
  align-items: center;

  .container {
    display: flex;
    justify-content: space-between;

    .icones {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 160px;

      .home-icon {
        margin: 0 70px;

        @media (max-width: 992px) {
          margin: 0 35px;
        }
        @media (max-width: 480px) {
          margin: 0 15px;
        }
        @media (max-width: 370px) {
          margin: 0 5px;
        }
      }

      h1 {
        font-size: 24px;

        margin-bottom: 0;
        font-weight: bold;
        color: ${BRANCO};
      }

      h1.desativado {
        font-size: 24px;

        margin-bottom: 0;
        font-weight: bold;
        color: ${CINZA_30} !important;
      }
    }

    svg {
      cursor: pointer;
      color: ${BRANCO};
      font-size: 24px;
    }
  }

  @media (max-width: 767px) {
    h1 {
      display: none;
    }
  }

  .form-switch {
    padding-left: 0px !important;
  }

  .form-check-input {
    width: 120px;
    height: 47px;
    float: none;
    margin: 0 1rem;
    background-color: ${PRETO_60};
    border-color: ${PRETO_60};
    box-shadow: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");

    &:focus {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
    }

    &:checked {
      background-color: ${PRETO_60};
      border-color: ${PRETO_60};
      box-shadow: none;
    }
  }
`;

// export const GhostButton = styled(Link)<GhostButtonProps>`
//   background-color: rgba(0, 0, 0, 0);
//   transition: all 0.4s ease-in-out;
//   padding: 16px 24px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 80px;
//   border: 2px solid ${BRANCO};
//   color: ${BRANCO};
//   font-size: 12px;
//   font-weight: bold;
//   opacity: ${props => props.opacity};

//   &:hover {
//     color: ${LARANJA};
//     background-color: ${BRANCO};
//     border-color: ${LARANJA};
//   }

//   @media (max-width: 767px) {
//     display: none;
//   }
// `;

export const ContentSession = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 400px;

  .car-item {
    background-color: red;
    color: white;
    padding: 2px 4px;
    border-radius: 30%;
  }

  @media (max-width: 767px) {
    justify-content: flex-end;
  }

  .icon-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    outline: none;
    border-radius: 50%;
  }

  .icon-button:hover {
    cursor: pointer;
  }

  .icon-button__badge {
    position: absolute;
    top: -14px;
    right: -5px;
    width: 25px;
    height: 25px;
    background: red;
    color: #ffffff;
    border-radius: 50%;
  }

  svg {
    vertical-align: auto;
    cursor: pointer;

    :hover {
      opacity: 0.8;
    }
  }
`;

export const AcaoBell = styled.div`
  display: flex;
  align-items: center;

  .dropdown {
    display: flex;
    justify-content: flex-end;

    button {
      box-shadow: none;
    }

    .dropdown-toggle::after {
      content: none;
    }
  }

  .dropdown-menu {
    margin-bottom: 100px;
    width: 315px;
    height: 362px;
    padding: 10px;
  }

  .dropdown-item {
    padding: 0 8px;
    background-color: transparent;

    :hover {
      background-color: #eee;
      color: ${BRANCO};
    }
  }
`;

export const ContentNotifications = styled.div`
  margin-top: 10px;
  height: 300px;

  overflow-y: scroll;
  scroll-behavior: smooth;

  ::-webkit-scrollbar-track {
    background-color: #f4f4f4;
  }
  ::-webkit-scrollbar {
    width: 4px;
    background: #f4f4f4;
  }
  ::-webkit-scrollbar-thumb {
    background: ${CINZA_80};
  }
`;

export const Notification = styled.div`
  white-space: normal;
  display: flex;

  .info {
    display: flex;
    flex-direction: column;

    span {
      font-size: 12px;
      color: ${PRETO_60};
    }

    p {
      font-size: 12px;
      color: ${PRETO_60};
      margin: 8px 0 16px 0;
    }
  }

  .icon-notification {
    svg {
      margin: 0 8px;
    }
  }
`;

type ContentButtonProps = {
  modal: boolean;
};

export const ContentButton = styled.div<ContentButtonProps>`
  display: flex;
  align-items: center;
  justify-content: ${({ modal }) => (modal ? 'flex-end' : 'center')};
  margin-top: 16px;
`;

export const ButtonNotifications = styled.button`
  color: ${AZUL};
  border-radius: 8px;
  border: 2px solid ${AZUL};
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-size: 10px !important;
  font-weight: bold;
  background-color: transparent;
  &:hover {
    background-color: ${AZUL};
    color: ${BRANCO};
  }
`;

export const ModalNotification = styled(Modal)`
  .modal-content {
    width: 816px;
    height: 570px;
    padding: 20px;
  }
  @media (max-width: 990px) {
    .modal-content {
      height: 600px;
    }
  }
`;

export const ContentModal = styled.div`
  white-space: normal;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 0 16px;

  @media (max-width: 478px) {
    padding: 0 8px;
  }

  :hover {
    background-color: #f4f4f4;
  }
  .info {
    display: flex;
    flex-direction: column;

    span {
      font-size: 16px;
      color: ${PRETO_60};

      @media (max-width: 478px) {
        font-size: 14px;
      }
    }

    p {
      font-size: 12px;
      color: ${PRETO_60};
      margin: 8px 0 16px 0;
    }
  }

  svg {
    width: 13px;
    height: 13px;
    margin: 5px;
  }
`;

export const ContentModalNotifications = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  height: 400px;

  overflow-y: scroll;
  scroll-behavior: smooth;

  ::-webkit-scrollbar-track {
    background-color: #f4f4f4;
  }
  ::-webkit-scrollbar {
    width: 4px;
    background: #f4f4f4;
  }
  ::-webkit-scrollbar-thumb {
    background: ${CINZA_80};
  }
`;

export const TitleNotification = styled.h1`
  font-size: 24px;
  font-weight: bold;
  background: -webkit-linear-gradient(#008fe5, #00c09e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 16px;
`;

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default Content;
