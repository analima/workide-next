import { lighten } from 'polished';
import styled from 'styled-components';
import { AZUL } from '../../../../styles/variaveis';

export const Content = styled.section`
  .form-switch {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 16px;
    margin: 16px 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.07), rgba(0, 0, 0, 0.07)),
      #ffffff;

    .form-check-input {
      width: 62px;
      height: 30px;
      border-radius: 114px;
    }
  }

  .acoes {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    a {
      margin-right: 50px;
      text-decoration: none;
      font-weight: bold;
      color: ${AZUL};
    }

    button {
      font-weight: bold;
      font-size: 16px;
      padding: 16px 40px;
      border-radius: 8px;
      background-color: ${AZUL};

      &:hover {
        background-color: ${lighten(0.1, AZUL)};
      }
    }
  }
`;
