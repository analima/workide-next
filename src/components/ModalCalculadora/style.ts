import styled from 'styled-components';

import { Modal } from 'react-bootstrap';
import { AZUL, PRETO_10, PRETO_60 } from '../../styles/variaveis';

export const ModalConfirmation = styled(Modal)`
  .modal-content {
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

export const ContentModalCalculate = styled.div`
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

export const ContentTaxa = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 100%;
  justify-content: center;

  span {
    font-size: 12.8px;
    font-weight: bold;
    text-align: center;
  }
  > strong {
    color: ${PRETO_60};
    font-weight: bold;
    text-align: center;
  }
`;

export const TotalValue = styled.span`
  color: ${PRETO_60};
  margin-top: 16px;
`;

export const LabelHora = styled.span`
  color: ${PRETO_60};
  margin-bottom: 18px;
`;
