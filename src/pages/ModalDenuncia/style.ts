import styled from 'styled-components';
import { Modal, ModalBody } from 'react-bootstrap';

import { lighten } from 'polished';
import { LARANJA, BRANCO, CINZA_40, VERMELHO } from '../../styles/variaveis';
import { TextArea } from '../../components/TextArea';

export const Content = styled.div`
  display: flex;
  .modal-container {
    width: 3000px !important;
  }
  .modal {
    background-color: rgba(21, 21, 21, 0.7);
  }
`;

export const NumberOfCharacters = styled.span`
  font-size: 14px;
  margin-top: 5px;
`;

export const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  select {
    width: 290px;
  }
`;

export const Button = styled.button`
  width: 180px;
  padding: 16px 40px;
  font-weight: bold;
  color: ${BRANCO};
  background-color: ${LARANJA};
  border-radius: 8px;
  border: none;

  &:hover {
    background-color: ${lighten(0.1, LARANJA)};
    color: ${BRANCO};
  }

  @media (max-width: 478px) {
    width: 100%;
    margin-top: 16px;
    font-size: 12px;
  }
`;

export const GhostButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;
  width: 180px;
  padding: 16px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid ${LARANJA};
  color: ${LARANJA};
  font-weight: bold;

  &:hover {
    color: ${BRANCO};
    background-color: ${LARANJA};
    border-color: ${BRANCO};
  }

  @media (max-width: 478px) {
    width: 100%;
    font-size: 12px;
  }
`;

export const ModalDenunciaContent = styled(Modal)`
  .modal-content {
    width: 716px;
    height: 570px;
    padding: 20px;
  }
  @media (max-width: 990px) {
    .modal-content {
      height: 600px;
    }
  }
  @media (max-width: 478px) {
    .modal-content {
      height: auto;
    }
  }
  @media (max-width: 390px) {
    .modal-content {
      width: 98%;
      align-self: center;
      justify-self: center;
    }
    .container-buttons {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
    }
  }
`;

export const ModalContainer = styled(ModalBody)``;

export const ContainerInputCheck = styled.div<{ isError?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  span {
    width: 90%;
    font-size: 12px;
    color: ${props => (props.isError ? VERMELHO : CINZA_40)};
  }
`;
export const InputCheck = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 15px;
  margin-right: 15px;
`;

export const TextAreaDenuncia = styled(TextArea)`
  textarea {
    height: 100px !important;
  }
`;
