import styled from 'styled-components';

import { lighten } from 'polished';
import { AZUL, BRANCO, LARANJA, VERDE } from '../../styles/variaveis';
import { Modal } from 'react-bootstrap';

type PropsPercentage = {
  isConcluded?: boolean;
};

export const ModalConfirmation = styled(Modal)`
  .modal-content {
    width: 600px;

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
  padding-bottom: 30px;
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

export const BidsButton = styled.button<{ mainColor?: string }>`
  width: 250px;
  padding: 16px 42px;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
  color: ${BRANCO};
  border: 2px solid ${props => (props.mainColor ? props.mainColor : LARANJA)};
  background-color: ${props => (props.mainColor ? props.mainColor : LARANJA)};
  border-radius: 8px;

  &:hover {
    background-color: ${props =>
      lighten(0.1, props.mainColor ? props.mainColor : LARANJA)};
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
  color: ${AZUL};
  border: 2px solid ${AZUL};
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
