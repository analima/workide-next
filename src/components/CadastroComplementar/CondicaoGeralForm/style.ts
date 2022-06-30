import { lighten } from 'polished';
import styled from 'styled-components';
import { AZUL, CINZA_10 } from '../../../styles/variaveis';

const Content = styled.section`
  .form-switch {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 8px 0;

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

export const Actions = styled.section`
  display: flex;
  justify-content: flex-end;
  margin: 32px 0;

  * + * {
    margin-left: 16px;
  }
`;

export const Condicao = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background-color: ${CINZA_10};
  margin-bottom: 16px;
  border-radius: 3px;

  @media (max-width: 478px) {
    width: 100%;
    label {
      font-size: 12px;
    }
  }
`;

export default Content;
