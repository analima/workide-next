import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

import {
  AZUL,
  BRANCO,
  LARANJA,
  CINZA_80,
  PRETO_60,
  PRETO,
} from '../../../../styles/variaveis';

interface ContentProps {
  isConsumidor?: boolean;
}

const Content = styled.div<ContentProps>`
  padding: 16px 0px;
  background-color: ${props => (props.isConsumidor ? AZUL : LARANJA)};
  display: flex;
  justify-content: space-between;

  .icones {
    padding: 0 0 0 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 200px;

    @media (max-width: 468px) {
      padding: 0 0 0 20px;
    }
  }

  .fi-icon-home {
    @media (max-width: 468px) {
      width: 28px;
      height: 28px;
    }
  }

  svg {
    color: ${BRANCO};
    font-size: 24px;
  }

  @media (max-width: 767px) {
    h1 {
      display: none;
    }
  }
`;

export const GhostButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.4s ease-in-out;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 80px;
  border: 2px solid ${BRANCO};
  color: ${BRANCO};
  font-size: 12px;
  font-weight: bold;

  &:hover {
    color: ${LARANJA};
    background-color: ${BRANCO};
    border-color: ${LARANJA};
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

export const ContentSession = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 600px;
  padding: 0 140px 0 0;

  @media (max-width: 1000px) {
    padding: 0 70px 0 0;
    width: 400px;
  }

  @media (max-width: 767px) {
    justify-content: flex-end;
  }

  @media (max-width: 468px) {
    padding: 0 20px 0 0;
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

  svg {
    margin: 0 8px;
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
  color: ${PRETO};
  border-radius: 8px;
  border: 2px solid ${AZUL};
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-size: 10px;
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

export const TitleNotification = styled.h1`
  font-size: 24px;
  font-weight: bold;
  background: -webkit-linear-gradient(#008fe5, #00c09e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 16px;
`;

export const ContentModal = styled.div`
  white-space: normal;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 0 16px;
  align-items: center;

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

  icon-notification {
    svg {
      margin: 0 8px;
    }
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

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default Content;
