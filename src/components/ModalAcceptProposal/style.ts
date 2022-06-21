import styled from 'styled-components';

import { lighten } from 'polished';
import { AZUL, BRANCO, CINZA_40 } from '../../styles/variaveis';
import { Modal } from 'react-bootstrap';

export const ModalConfirmation = styled(Modal)`
  padding: 0 20px;

  .modal-content {
  }

  .modal-dialog {
    max-width: 1281px;
  }
`;

export const ModalBody = styled(Modal.Body)`
  padding: 0 32px 32px 32px;
`;

export const CardTipoPagamento = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  margin-top: 24px;
  cursor: pointer;

  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 8px;

  div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  div:nth-child(2n) {
    display: flex;
    align-self: flex-end;
  }

  .container-taxa {
    display: flex;
    flex-direction: column;
    align-items: center;

    .texto-taxa {
      margin-top: 10px;
      background-color: transparent;
      color: ${AZUL};
    }
  }

  span {
    background-color: ${CINZA_40};
    color: ${BRANCO};
    padding: 4px 8px;
    border-radius: 4px;
  }

  svg {
    width: 32px;
    height: 32px;
  }
`;
export const FaRegCreditCard = styled.div``;

export const Content = styled.div``;

export const ContentHeader = styled.div`
  padding-top: 25px;
  padding-bottom: 16px;
`;

export const TypographyStyled = styled.p`
  margin: 0;
`;

export const ContentFooter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 40px;

  button:nth-child(2n) {
    margin-left: auto;
  }

  @media (max-width: 700px) {
    gap: 50px;
    justify-content: space-between;
  }
`;

export const ButtonCancel = styled.button`
  width: 168px;
  padding: 16px 40px;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
  color: ${BRANCO};
  border: 2px solid ${AZUL};
  color: ${AZUL};
  background-color: ${BRANCO};
  border-radius: 8px;

  &:hover {
    background-color: ${lighten(0.1, AZUL)};
    color: ${BRANCO};
  }

  @media (max-width: 478px) {
    width: 100%;
    margin-top: 16px;
    font-size: 12px;
  }
`;
