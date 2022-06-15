import { lighten } from 'polished';
import styled from 'styled-components';
import { AZUL, BRANCO, LARANJA_10 } from '../../styles/variaveis';

export const Titulo = styled.h3`
  font-weight: bold;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
`;

export const MensagemAviso = styled.span`
  font-size: 13px;
  color: ${LARANJA_10};
`;

export const Mensagem = styled.span`
  font-size: 16px;
`;

export const ContainerButtons = styled.div`
  align-self: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const ButtonCloseModal = styled.button`
  display: flex;
  justify-content: center;
  padding: 16px 42px;
  font-weight: bold;
  color: ${BRANCO};
  background-color: ${LARANJA_10} !important;
  border-radius: 8px;
  border: 2px solid ${LARANJA_10};
  margin: 20px;
  align-self: flex-end;

  &:hover {
    background-color: ${lighten(0.1, LARANJA_10)};
    color: ${BRANCO};
  }

  @media (max-width: 478px) {
    font-size: 12px;
    width: 100%;
    margin: 16px 0;
  }
`;

export const ButtonConfirm = styled.button`
  display: flex;
  justify-content: center;
  padding: 16px 42px;
  font-weight: bold;
  color: ${BRANCO};
  background-color: ${AZUL} !important;
  border-radius: 8px;
  border: 2px solid ${AZUL};
  margin: 20px;
  align-self: flex-end;

  &:hover {
    background-color: ${lighten(0.1, AZUL)};
    color: ${BRANCO};
  }

  @media (max-width: 478px) {
    font-size: 12px;
    width: 100%;
    margin: 16px 0;
  }
`;
