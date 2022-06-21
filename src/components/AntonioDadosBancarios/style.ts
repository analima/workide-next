import styled from 'styled-components';
import { BRANCO, CINZA_40 } from '../../styles/variaveis';

export const Content = styled.div``;

interface IDica {
  showDica: boolean;
}

export const AntonioContainer = styled.div<IDica>`
  position: fixed;
  bottom: 0;
  right: ${props => (props.showDica ? '0' : '-100%')};
  visibility: ${props => (props.showDica ? 'visible' : 'hidden')};
  transition: all 1s ease-in-out;
  margin: 0;
  z-index: 9999;

  @keyframes mostrarDica {
    0% {
      right: -100%;
    }
    50% {
      right: -50%;
    }
    100% {
      right: 0;
    }
  }

  @keyframes ocultarDica {
    0% {
      right: 0;
    }
    50% {
      right: -50%;
    }
    100% {
      right: -100%;
    }
  }

  animation: ${props => (props.showDica ? 'mostrarDica' : 'ocultarDica')};
  animation-duration: 0.4s;
`;

export const AntonioIconClose = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 50px;
`;

export const AntonioMensagem = styled.div`
  width: 280px;
  max-height: 380px;
  padding: 16px 0;
  border-radius: 16px 16px 0 16px;
  background-color: ${CINZA_40};
  margin-right: 80px;
  color: ${BRANCO};
  border: 12px solid ${CINZA_40};
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const AntonioPersonagem = styled.div`
  margin-left: 160px;
`;
