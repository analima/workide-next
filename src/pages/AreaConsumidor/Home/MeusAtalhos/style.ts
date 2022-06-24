import { lighten } from 'polished';
import styled from 'styled-components';
import { BRANCO, CINZA_40 } from '../../../../styles/variaveis';

const Content = styled.section`
  h2 {
    padding: 24px 32px;
  }
`;

export const Atalho = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${BRANCO};
  min-height: 180px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  margin: 16px 0;

  &:hover {
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.4);
  }
`;

export const AtalhoTexto = styled.a`
  font-weight: bold;
  font-size: 48px;
  text-decoration: none;
  padding: 8px;
  text-align: center;
  color: ${CINZA_40};

  &:hover {
    color: ${lighten(0.2, CINZA_40)};
  }
`;

export default Content;
