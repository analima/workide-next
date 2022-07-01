import styled from 'styled-components';
import { CINZA_40 } from '../../styles/variaveis';

interface ILabel {
  cor?: string;
  negrito: boolean;
}

export const Content = styled.label<ILabel>`
  border: solid 1px ${props => (props.cor ? props.cor : CINZA_40)};
  color: ${props => (props.cor ? props.cor : CINZA_40)};
  font-weight: ${props => (props.negrito ? 'bold' : 'normal')};
  border-radius: 8px;
  padding: 2px 10px;
  margin: 4px;
`;
