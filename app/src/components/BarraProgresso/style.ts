import styled from 'styled-components';
import { BRANCO, LARANJA, VERDE } from '../../styles/variaveis';

export const Content = styled.div`
  display: flex;
  align-items: center;

  .progress {
    width: calc(100% - 40px);
    font-weight: bold;
    background-color: ${BRANCO};
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);

    .progress-bar {
      background-color: ${LARANJA};
    }
  }

  .icone-barra {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
    background-color: ${VERDE};
    border-radius: 50%;
    margin-left: -5px;
  }
`;
