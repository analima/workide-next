import { lighten } from 'polished';
import styled from 'styled-components';
import { AZUL, BRANCO, PRETO_60 } from '../../../styles/variaveis';

const Content = styled.section``;

export const Button = styled.button`
  transition: all 0.2s ease-in-out;
  padding: 16px 40px;
  width: 194px;
  max-height: 56px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: none;
  color: ${BRANCO};
  background-color: ${AZUL};
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  font-size: 16px;
  margin-right: 48px;

  &:hover {
    background-color: ${lighten(0.1, AZUL)};
  }

  @media (max-width: 400px) {
    padding: 12px 24px;
    font-size: 13px;
  }

  @media (max-width: 410px) {
    margin-right: 0;
    padding: 15px 10px;
    width: 175px;
  }
`;

export const InfoPerfil = styled.p`
  margin: 0;
  padding: 16px;
  background-color: ${PRETO_60};
  color: ${BRANCO};
  font-size: 16px;
  border-radius: 16px;
`;

export const LinkReportPerfil = styled.button`
  text-decoration: none;
  color: ${AZUL};
  font-size: 12px;
  border: none;
  background: transparent;
`;

export const GhostButton = styled.a`
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;
  padding: 16px 52px;
  border-radius: 8px;
  border: 2px solid ${AZUL};
  color: ${AZUL};
  font-weight: bold;
  text-decoration: none;
  float: right;
  cursor: pointer;

  &:hover {
    color: ${BRANCO};
    background-color: ${AZUL};
    border-color: ${BRANCO};
  }

  @media (max-width: 478px) {
    display: flex;
    justify-content: center;
    align-items: center;
    float: none;
  }
  @media (max-width: 410px) {
    margin-top: 10px;
    align-self: center;
  }
`;

export const ContentButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 48px;
  @media (max-width: 410px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

export const ButtonVoltar = styled(GhostButton)``;

export default Content;
