import styled from 'styled-components';

import { lighten } from 'polished';
import { AZUL, BRANCO, LARANJA, LARANJA_10, VERDE } from '../../styles/variaveis';
import { Link } from 'react-router-dom';
import {Modal, ModalBody} from 'react-bootstrap'

type PropsPercentage = {
  isConcluded?: boolean
}

export const ModalPercentage = styled(Modal)`
    .modal-content{
      display: flex;
      justify-content: center;
      align-items: center;

    width: 559px;

    @media (max-width: 700px){
      width: 450px;
    }
    @media (max-width: 550px){
      width: 90%;
    }
  }
`

export const Content = styled.div``;


export const BodyModal = styled(ModalBody)`
  padding: 48px 24px 0 24px;
  width: 100%;
`;

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
  margin-bottom: 64px;
`

export const ContentFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 40px;

  @media (max-width: 700px){
    gap: 50px;
    justify-content: space-between;
  }
`

export const ContentGuidance = styled.div`
  margin-top: 24px;

  div {
    display: flex;
    grid-gap: 15px;
  }
  
`
export const Percentage = styled.p<PropsPercentage>`
  font-weight: bold;
  color: ${props => props.isConcluded ? VERDE : LARANJA};
  text-align: end;
  width: 60px;
  
`

export const MessageGuidance = styled.p``



export const Right = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-right: 80px;
`;

export const BidsButton = styled.button`
  padding: 16px 40px;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
  color: ${BRANCO};
  border: 2px solid ${AZUL};
  background-color: ${LARANJA_10};
  border-radius: 8px;
  white-space: nowrap;

  &:hover {
    background-color: ${lighten(0.1, AZUL)};
    color: ${BRANCO};
  }

  @media (max-width: 478px) {
    width: 100%;
    font-size: 12px;
  }
`;

export const Button = styled(Link)`
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

export const GhostButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;
  width: 250px;
  padding: 16px 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid ${AZUL};
  color: ${AZUL};
  font-weight: bold;

  &:hover {
    color: ${BRANCO};
    background-color: ${AZUL};
    border-color: ${BRANCO};
  }

  @media (max-width: 478px) {
    width: 100%;
    font-size: 12px;
  }
`;
