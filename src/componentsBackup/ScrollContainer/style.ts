import styled from 'styled-components';
import { VERDE_100 } from '../../styles/variaveis';

interface IContainerProps {
  height: number;
}

export const Container = styled.div<IContainerProps>`
  max-height: ${props => `${props.height}px`};
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-track {
    background: #ddd;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 20px;
    border: 3px solid ${VERDE_100};
  }
`;
