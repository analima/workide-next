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

  div {
    display: flex;

    > span {
      margin: 0;
    }
  }

  @media (max-width: 478px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
