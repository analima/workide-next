import styled from 'styled-components';
import { lighten } from 'polished';

import { AZUL, AZUL_60, BRANCO } from '../../../styles/variaveis';

const Subtitulo = styled.div`
  display: flex;
  align-items: center;

  * + * {
    margin-left: 60px;
  }

  @media (max-width: 478px) {
    display: flex;
    flex-direction: column;

    * + * {
      margin: 10px 0;
    }
  }
`;

export const GhostButton = styled.a`
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;
  height: 60px;
  padding: 16px 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid ${AZUL_60};
  color: ${AZUL_60};
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: ${BRANCO};
    background-color: ${AZUL_60};
    border-color: ${BRANCO};
  }
`;

export const BotaoCaptar = styled.a`
  padding: 16px 36px;
  color: ${BRANCO};
  background-color: ${AZUL};
  font-weight: bold;
  text-decoration: none;
  border-radius: 80px;
  text-align: center;

  &:hover {
    background-color: ${lighten(0.05, AZUL)};
    color: ${BRANCO};
  }
`;

export default Subtitulo;
