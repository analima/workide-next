import { lighten } from 'polished';
import styled from 'styled-components';
import { BRANCO, CINZA_40 } from '../../../../styles/variaveis';

type TextoAtalhoProps = {
  disabled?: boolean;
};

const Content = styled.section`
  h2 {
    padding: 24px 32px;
  }
`;

export const Atalho = styled.div<TextoAtalhoProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${BRANCO};
  min-height: 180px;
  box-shadow: ${({ disabled }) => (disabled ? 'none' : '0px 4px 8px rgba(0, 0, 0, 0.25)' )};
  border-radius: 8px;
  margin: 16px 0;

  &:hover {
    box-shadow: ${({ disabled }) => (disabled ? 'none' : '0px 4px 16px rgba(0, 0, 0, 0.4)')};
  }
`;

export const AtalhoTexto = styled.a<TextoAtalhoProps>`
  font-weight: bold;
  font-size: 32px;
  text-decoration: none;
  padding: 8px;
  text-align: center;
  color: ${CINZA_40};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  ${({ disabled }) => disabled && 'color: #ccc;'}

  &:hover {
    color: ${lighten(0.2, CINZA_40)};
    ${({ disabled }) => disabled && 'color: #ccc;'}

  }
`;

export default Content;
