import { lighten } from 'polished';
import styled from 'styled-components';
import { AZUL, BRANCO } from '../../../../../../styles/variaveis';

export const Content = styled.section`
  .acoes {
    display: flex;
    justify-content: end;

    svg {
      margin-left: 16px;
      cursor: pointer;
    }
  }
`;

export const Button = styled.button`
  padding: 16px 40px;
  font-weight: bold;
  color: ${BRANCO};
  background-color: ${AZUL};
  border-radius: 8px;
  border: none;

  &:hover {
    background-color: ${lighten(0.1, AZUL)};
  }

  @media (max-width: 478px) {
    width: 100%;
    margin-top: 16px;
  }
`;
