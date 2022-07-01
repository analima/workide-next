import styled from 'styled-components';
import { AZUL, BRANCO } from '../../styles/variaveis';

interface ICardSelecionado {
  selecionado: boolean;
}

export const Container = styled.div<ICardSelecionado>`
  border: solid 1px ${AZUL};
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;
  background-color: ${props => (props.selecionado ? AZUL : BRANCO)};
`;

export const Label = styled.label`
  input {
    display: none;
  }
`;

export const Titulo = styled.h5<ICardSelecionado>`
  text-align: center;
  font-weight: bold;
  margin: 28px 0;
  color: ${props => (props.selecionado ? BRANCO : AZUL)};
`;

export const Descricao = styled.p<ICardSelecionado>`
  text-align: center;
  color: ${props => (props.selecionado ? BRANCO : AZUL)};
  height: 120px;
  font-size: 12.8px;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;
