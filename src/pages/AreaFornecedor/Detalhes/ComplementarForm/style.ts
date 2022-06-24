import styled from 'styled-components';

import { PRETO_10 } from '../../../../styles/variaveis';

const Content = styled.section`
  .btn-add {
    align-items: center;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
  }

  .formacao {
    .row {
      margin-top: 80px;
    }
  }

  .btn {
    font-weight: bold;
    font-size: 16px;
    padding: 16px 40px;
    border-radius: 8px;
  }

  .container {
    padding: 16px 0;
  }

  .fechar {
    top: 0;
    right: 0;
    margin: 16px;
    cursor: pointer;
    position: absolute;

    &:hover {
      opacity: 0.7;
    }
  }
`;

export const Subtitulo = styled.h2`
  color: ${PRETO_10};
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const Actions = styled.section`
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;
`;

export default Content;
