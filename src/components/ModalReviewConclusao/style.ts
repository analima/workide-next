import styled from 'styled-components';

import { Modal } from 'react-bootstrap';
import { AZUL, BRANCO, LARANJA, VERMELHO } from '../../styles/variaveis';
import { lighten } from 'polished';

export const ModalConfirmation = styled(Modal)`
  .modal-content {
    @media (max-width: 700px) {
      width: 450px;
    }
  }
`;

export const Content = styled.div``;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  justify-content: center;
  margin-bottom: 20px;

  span {
    margin: 16px 0;
    font-size: 14px;
  }
`;

export const ContentFooter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  gap: 16px;
  justify-content: flex-end;

  @media (max-width: 700px) {
    gap: 50px;
    justify-content: space-between;
  }

  @media (max-width: 478px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const MensagemErro = styled.span`
  color: ${VERMELHO};
  font-weight: bold;
  font-size: 16px;
  margin-top: 10px;
`;

export const BidsButton = styled.button`
  padding: 16px 32px;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
  color: ${AZUL};
  border: 2px solid ${AZUL};
  background-color: ${BRANCO};
  border-radius: 8px;

  @media (max-width: 478px) {
    width: 100%;
    font-size: 12px;
  }
`;

export const ButtonCancel = styled.button`
  padding: 16px 32px;
  width: 224px;
  margin: 0;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
  color: ${BRANCO};
  background-color: ${LARANJA};
  border-radius: 8px;
  border: 2px solid ${LARANJA};

  &:hover {
    border: 2px solid ${lighten(0.1, LARANJA)};
    background-color: ${lighten(0.1, LARANJA)};
  }

  span {
    width: 32px;
    height: 32px;
  }

  @media (max-width: 478px) {
    width: 100%;
    font-size: 12px;
  }
`;
