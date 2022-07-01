import styled from 'styled-components';

import { lighten } from 'polished';
import { AZUL, BRANCO, LARANJA, VERDE, VERMELHO } from '../../styles/variaveis';
import { Modal } from 'react-bootstrap';

type PropsPercentage = {
  isConcluded?: boolean;
};

export const ModalConfirmation = styled(Modal)`
  .modal-content {
    width: 676px;

    @media (max-width: 700px) {
      width: 450px;
    }
  }
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
  padding: 16px;
  padding-left: 32px;
  padding-right: 32px;
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
  padding: 16px;
  min-width: 143px;
  padding-left: 32px;
  padding-right: 32px;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
  color: ${BRANCO};
  border: 2px solid ${AZUL};
  background-color: ${AZUL};
  border-radius: 8px;
  margin-left: 50px;

  &:hover {
    background-color: ${lighten(0.1, AZUL)};
  }

  @media (max-width: 478px) {
    width: 100%;
    margin-top: 16px;
    font-size: 12px;
  }
`;

export const ContentInputCheckStyled = styled.div`
  padding-left: 36px;
`;
export const ContainerCheckStyled = styled.div`
  display: flex;
  grid-gap: 60px;
`;

export const MensagemErro = styled.span`
  color: ${VERMELHO};
  font-weight: bold;
  font-size: 16px;
  margin-top: 10px;
`;
