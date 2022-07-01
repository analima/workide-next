import styled from 'styled-components';
import { PRETO_10 } from '../../styles/variaveis';

interface ITitulo {
  color: string | undefined;
  size: number | undefined;
  bold: boolean | undefined;
}

export const Content = styled.h2<ITitulo>`
  color: ${props => (props.color ? props.color : PRETO_10)};
  font-size: ${props => (props.size ? `${props.size}px` : '48px')};
  font-weight: ${props =>
    props.bold || props.bold === undefined ? 'bold' : 'normal'};
  margin: 0;

  @media (max-width: 478px) {
    text-align: center;

    font-size: ${props => (props.size ? `${props.size}px` : '32px')};
  }
`;
