import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import {
  AMARELO,
  BRANCO,
  BRANCO_GELO,
  CINZA_40,
  LARANJA_10,
  VERDE,
} from '../../styles/variaveis';
import { lighten } from 'polished';

export const ModalBody = styled(Modal.Body)``;

export const Content = styled.div``;

export const ContainerConteudo = styled.div`
  width: 100%;
  padding: 10px;
  background-color: ${BRANCO_GELO};
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .reprovado {
    color: ${LARANJA_10};
  }
  .expirado {
    color: ${AMARELO};
  }
  .aprovado {
    color: ${VERDE};
  }

  button {
    background-color: transparent;
    border: none;
  }
`;

export const ContainerInfoProjeto = styled.div`
  border: 1px solid ${CINZA_40};
  border-radius: 8px;
  width: 95%;
  display: flex;
  align-self: center;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-top: 20px;
`;

export const ContainerInfoFatura = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CompraStatus = styled.span`
  font-weight: bold;
  color: ${CINZA_40};
  font-size: 16px;

  @media (max-width: 478px) {
    display: flex;
    justify-content: center;
  }
`;

export const ContainerButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const DownloadLink = styled.a`
  text-decoration: none;
  cursor: pointer;
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

export const ContentButtons = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DescricaoButton = styled.span`
  position: relative;
  top: 0;
  font-size: 12px;
  display: none;
`;
