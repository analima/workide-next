import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { AZUL, LARANJA, VERDE } from '../../../../../styles/variaveis';

export const ModalContent = styled(Modal)`
  width: 100vw;
  max-width: 100vw;
  .modal-content,
  .modal-lg {
    width: 100rem;
    max-width: 1300px;

    @media (max-width: 1360px) {
      width: 60rem;
    }
    @media (max-width: 1000px) {
      width: 40rem;
    }
    @media (max-width: 700px) {
      width: 20rem;
    }

    @media (max-width: 575px) {
      margin: auto;
    }
  }
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 30rem;
  height: auto;
  padding: 4rem;

  @media (max-width: 700px) {
    padding: 20px;
  }

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

export const ContainerInputs = styled.div`
  width: 100%;
  display: flex;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const ContainerCheckbox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

export const ContainerTextArea = styled(ContainerCheckbox)``;

export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;

  @media (max-width: 700px) {
    justify-content: space-evenly;
  }
`;

export const ButtonBack = styled.button`
  border-radius: 6px;
  background-color: ${AZUL};
  padding: 10px 25px;
  color: #fff;
  font-weight: bold;
  border: none;
  margin: 0 15px;

  @media (max-width: 700px) {
    padding: 10px;
    font-size: 12px;
  }
`;

export const ButtonConfirm = styled.button`
  border-radius: 6px;
  background-color: ${LARANJA};
  padding: 15px 25px;
  color: #fff;
  font-weight: bold;
  border: none;
  margin: 0 15px;

  @media (max-width: 700px) {
    padding: 10px;
    font-size: 12px;
  }
`;

export const TextDeleteSuccess = styled.h1`
  color: ${VERDE};
  width: 100%;
  text-align: center;
  margin: 4rem 0;
`;

export const ExpirationDate = styled.span`
  font-weight: bold;
  font-size: 18px;
  color: ${AZUL};
`;
