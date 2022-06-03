import styled from 'styled-components';

import { Modal } from 'react-bootstrap';

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
  display: flex;
  padding: 40px;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 20px;
`;
