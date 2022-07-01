import styled from 'styled-components';

import { lighten } from 'polished';
import { AZUL, BRANCO, LARANJA, VERDE } from '../../styles/variaveis';
import { Modal } from 'react-bootstrap';
import ScrollContainer from 'react-indiana-drag-scroll';

type PropsPercentage = {
  isConcluded?: boolean;
};

export const ModalConfirmation = styled(Modal)`
  padding: 0 20px;

  .modal-content {
  }

  .modal-dialog {
    max-width: 1278px;
  }
`;
export const ModalBody = styled(Modal.Body)`
  padding: 0 32px 32px 32px;
`;

export const Content = styled.div``;

export const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Middle = styled.div`
  line-height: 1.5;
  display: inline-block;
  vertical-align: middle;
  margin-top: 80px;
`;

export const ContentHeader = styled.div`
  padding-top: 25px;
  padding-bottom: 30px;
`;

export const TypographyStyled = styled.p`
  margin: 0;
  font-size: 16px;
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

export const ContentGuidance = styled.div`
  margin-top: 15px;
  div {
    display: flex;
    grid-gap: 15px;
    margin-bottom: 15px;
  }
`;
export const Percentage = styled.p<PropsPercentage>`
  font-weight: bold;
  color: ${props => (props.isConcluded ? VERDE : LARANJA)};
`;

export const MessageGuidance = styled.p``;

export const Right = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-right: 80px;
`;

export const BidsButton = styled.button`
  width: 250px;
  padding: 16px;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
  color: ${BRANCO};
  border: 2px solid ${LARANJA};
  background-color: ${LARANJA};
  border-radius: 8px;

  &:hover {
    background-color: ${lighten(0.1, LARANJA)};
  }

  @media (max-width: 478px) {
    width: 100%;
    font-size: 12px;
  }
`;

export const ButtonCancel = styled.button`
  width: 250px;
  padding: 16px 42px;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
  color: ${BRANCO};
  border: 2px solid ${AZUL};
  background-color: ${AZUL};
  border-radius: 8px;

  &:hover {
    background-color: ${lighten(0.1, AZUL)};
  }

  @media (max-width: 478px) {
    width: 100%;
    margin-top: 16px;
    font-size: 12px;
  }
`;

type Props = {
  isWidth?: boolean;
};

export const ContentInputCheckStyled = styled.div<Props>`
  padding-left: 36px;
  width: ${props => (props.isWidth ? '100%' : '')};
`;
export const ContainerCheckStyled = styled.div`
  display: flex;
  grid-gap: 80px;
`;

export const ContentDuplicateStyled = styled(ScrollContainer)`
  display: flex;
  gap: 16px;
`;

export const NenhumProjetoCadastrado = styled.div`
  display: flex;
  align-items: center;
  height: 280px;
`;
