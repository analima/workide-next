import { LARANJA } from '../../styles/variaveis';
import styled from 'styled-components';
import { BRANCO, CINZA_40 } from '../../styles/variaveis';

export const Content = styled.div``;

interface IDica {
  mostrarAvatar: boolean;
}

export const AndreContainer = styled.div<IDica>`
  position: fixed;
  bottom: 0;
  right: ${props => (props.mostrarAvatar ? '20px' : '-100%')};
  visibility: ${props => (props.mostrarAvatar ? 'visible' : 'hidden')};
  transition: all 1s ease-in-out;
  margin: 0;
  z-index: 9999;

  @keyframes mostrarDicaUpgrade {
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

  @keyframes ocultarDicaUpgrade {
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

  animation: ${props =>
    props.mostrarAvatar ? 'mostrarDicaUpgrade' : 'ocultarDicaUpgrade'};
  animation-duration: 0.4s;
`;

export const AndreIconClose = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 50px;
`;

export const AndreMensagem = styled.div`
  width: 480px;
  height: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px 16px 0 16px;
  background-color: ${CINZA_40};
  margin-right: 80px;
  margin-bottom: 8px;
  color: ${BRANCO};

  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ContainerText = styled.div`
  width: 100%;
`;

export const AndrePersonagem = styled.div`
  margin-left: 160px;
`;

export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 25px;
`;

export const ButtonConfirm = styled.button`
  background-color: ${LARANJA};
  color: ${BRANCO};
  padding: 16px 24px;
  border-radius: 8px;
  border: none;
  font-weight: bold;
`;

export const ButtonCancel = styled.button`
  background-color: transparent;
  color: ${BRANCO};
  padding: 16px 24px;
  border-radius: 8px;
  border: none;
  font-weight: bold;
`;
