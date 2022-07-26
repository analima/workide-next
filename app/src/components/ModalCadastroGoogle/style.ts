import styled from 'styled-components';

import { Modal } from 'react-bootstrap';
import { LARANJA, PRETO_10 } from '../../styles/variaveis';

export const ModalConfirmation = styled(Modal)`
  z-index: 999999;
  .help-block {
    color: red;
  }
  .modal-content {
    @media (max-width: 700px) {
      width: 450px;
    }
  }
`;

export const Content = styled.div``;

export const Container = styled.div`
  display: flex;
  padding: 30px 2px 5px;
  align-items: center;
  justify-content: flex-start;
  text-align: start;
  flex-direction: column;
  .subtitulo {
    font-size: 16px;
    color: ${LARANJA};
    margin-top: 10px;
  }
`;

export const ContainerInformacoes = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 25px 0;

  span {
    color: ${PRETO_10};
    font-family: 'Renner';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 150%;
    width: 80%;
    padding-left: 10px;
  }
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

export const InputCheck = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 15px;
`;

export const ContainerButton = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin: 20px 2px 10px;
`;
