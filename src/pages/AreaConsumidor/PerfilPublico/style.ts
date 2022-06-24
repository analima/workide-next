import styled from 'styled-components';
import { AZUL, BRANCO } from '../../../styles/variaveis';

const Content = styled.section``;

export const LinkReportPerfil = styled.button`
  text-decoration: none;
  color: ${AZUL};
  font-size: 12px;
  border: none;
  background: transparent;
`;
export const ContentButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 40px;
  margin-bottom: 40px;
`;

export const ButtonEditPerfil = styled.button`
  padding: 16px 40px;
  border-radius: 8px;
  background-color: ${AZUL};
  color: ${BRANCO};
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

export const GhostButton = styled.a`
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;
  height: 60px;
  padding: 16px 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid ${AZUL};
  color: ${AZUL};
  font-weight: bold;
  text-decoration: none;
  right: 0;

  &:hover {
    color: ${BRANCO};
    background-color: ${AZUL};
    border-color: ${BRANCO};
  }
`;

export default Content;
