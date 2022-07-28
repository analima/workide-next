import styled from 'styled-components';

import { Modal } from 'react-bootstrap';
import {
  AZUL,
  BRANCO,
  LARANJA_10,
  PRETO_10,
  PRETO_60,
} from '../../styles/variaveis';

export const ModalConfirmation = styled(Modal)`
  background-color: transparent !important;
  border-radius: 16px;
  .modal-content {
    border-radius: 16px;

    @media (max-width: 700px) {
      width: 450px;
    }
  }
`;

export const Content = styled.div``;

export const Container = styled.div`
  /* height: 240px; */
  padding: 16px;
  margin-bottom: 20px;

  strong {
    color: ${PRETO_60};
    font-weight: normal;
  }
`;

export const ContentModalEbook = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    color: ${AZUL};
    font-weight: bold;
    font-size: 16px;
    font-family: Renner;
  }

  span {
    font-size: 12.8px;
    line-height: 24px;
    color: ${PRETO_10};
    margin-bottom: 8px;
  }

  strong {
    margin-top: 24px;
    color: ${AZUL};
    font-size: 16px;
    font-weight: bold;
  }

  b {
    color: ${PRETO_60};
  }
`;

export const Title = styled.h1`
  font-family: 'Renner';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 120%;
  color: ${AZUL};
`;

export const ContentButton = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    width: 100%;
    max-width: 233px;
    height: 56px;
    background-color: ${AZUL};
    border-radius: 8px;
    padding: 16px, 40px;
    text-transform: uppercase;
    color: ${BRANCO};
    font-family: 'Renner';
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: center;
    border: 0;

    :hover {
      opacity: 0.8;
    }
  }
`;

export const AlertError = styled.span`
  font-size: 14px;
  color: ${LARANJA_10};
  margin: 10px auto;
`;

export const ButtonDownload = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${BRANCO};

  :hover {
    color: ${BRANCO};
  }
`;
