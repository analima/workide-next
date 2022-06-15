import styled from 'styled-components';
import { AZUL, PRETO_10 } from '../../styles/variaveis';

export const Content = styled.div`
  .form-check {
    display: flex;
    align-items: center;
    padding: 0;
    gap: 8px;

    .form-check-input {
      width: 62px;
      height: 30px;
      margin: 0;

      &:checked {
        background-color: ${AZUL};
      }
    }
  }
`;

type Props = {
  isGreenLabel?: boolean;
};

export const LabelStyled = styled.label<Props>`
  font-size: 16px;
  font-weight: 700;
  color: ${props => (!props.isGreenLabel ? PRETO_10 : AZUL)};
`;
