import styled from 'styled-components';
import { lighten } from 'polished';

import {
  BRANCO,
  CINZA_10,
  LARANJA,
  VERMELHO,
} from '../../../../styles/variaveis';

const Content = styled.div``;

export const Label = styled.label`
  margin-bottom: 8px;
`;

export const Form = styled.div`
  display: flex;

  > div {
    flex: 1;
  }
`;

export const Button = styled.button`
  margin-left: 16px;
  width: 51px;
  height: 51px;
  border: 0;
  border-radius: 3px;
  background-color: ${LARANJA};
  color: ${BRANCO};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${lighten(0.05, LARANJA)};
  }
`;

export const Values = styled.div``;

export const Item = styled.div`
  margin-top: 8px;
  padding: 8px;
  border-radius: 3px;
  display: flex;
  background-color: ${CINZA_10};
`;

export const ItemLabel = styled.div`
  flex: 1;
`;

export const ItemAction = styled.button`
  margin-left: 16px;
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: ${VERMELHO};
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${lighten(0.1, VERMELHO)};
  }
`;

export default Content;
