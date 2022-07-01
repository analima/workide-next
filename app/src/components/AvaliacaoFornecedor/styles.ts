import styled from 'styled-components';
import { LARANJA } from '../../styles/variaveis';

interface Props {
  direction?: 'row' | 'column';
}

export const ContainerAvaliacao = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: ${props => props.direction || 'row'};

  span {
    font-size: 14px;
    margin: 0;
    color: ${LARANJA};
    margin-right: 8px;
  }
`;
