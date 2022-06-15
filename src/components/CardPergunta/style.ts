import styled from 'styled-components';
import { CINZA_40 } from '../../styles/variaveis';

export const PerguntaContainer = styled.div`
  font-size: 14px;
  color: ${CINZA_40};
  margin-bottom: 32px;
`;

export const LoadDelete = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PerguntaData = styled.div``;

export const Pergunta = styled.div``;

export const PerguntaAutor = styled.div`
  font-style: italic;
`;

export const RespostaContainer = styled.div`
  font-size: 14px;
  color: ${CINZA_40};
`;

export const RespostaData = styled.div``;

export const Resposta = styled.div``;

export const RespostaAutor = styled.div`
  font-style: italic;
`;

export const IconeContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  svg {
    color: ${CINZA_40};
    font-size: 20px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const ModalContainer = styled.div`
  padding: 16px;

  div {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 40px;
  }
`;
