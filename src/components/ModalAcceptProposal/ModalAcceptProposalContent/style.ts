import styled from 'styled-components';

import { lighten } from 'polished';
import {
  AZUL,
  BRANCO,
  CINZA_40,
  VERMELHO,
  VERDE,
  PRETO_10,
  LARANJA_10,
} from '../../../styles/variaveis';
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

    .em-breve {
      margin-bottom: 10px;
    }

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
  justify-content: flex-end;
  width: 100%;

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

export const ContainerFee = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 12rem;
  justify-content: space-between;

  span {
    margin: 10px 0;
    font-size: 20px;
    color: ${PRETO_10};
  }

  .text {
    display: flex;
    flex-direction: column;
  }

  .taxa {
    font-size: 18px;
    font-weight: bold;
  }

  strong {
    font-size: 22px;
    color: ${PRETO_10};
  }
`;

export const Status = styled.div`
  margin: 32px 0;
  display: flex;
  align-items: center;
  height: 4rem;

  span {
    color: ${PRETO_10};
    font-weight: bold;
    margin-right: 10px;
    font-size: 18px;
  }

  .processando {
    color: ${AZUL};
  }

  .reprovado {
    color: ${VERMELHO};
  }

  .aprovado {
    color: ${VERDE};
  }
`;

export const ContainerPurchaseResume = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: solid 1px ${AZUL};
  padding: 15px;

  .price {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 18px;
    }
  }

  .provider-name {
    margin-top: 15px;
    margin-left: 20px;
    font-size: 18px;
  }
`;

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const AlertMessage = styled.span`
  font-size: 18px;
  color: ${LARANJA_10};
`;
