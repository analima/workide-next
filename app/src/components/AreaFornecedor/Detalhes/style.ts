import styled from 'styled-components';
import { AZUL, BRANCO, PRETO_40 } from '../../../styles/variaveis';

const Content = styled.section`
  .nav-pills {
    display: flex;
    justify-content: space-between;
    padding-top: 24px;

    .nav-item {
      padding: 0;

      a {
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${BRANCO};
        font-size: 10px;
        font-weight: bold;
        width: 207px;
        height: 47px;
        border-radius: 8px;
        background-color: ${PRETO_40};

        &.active {
          background-color: ${AZUL};
        }
      }
    }
  }

  .form-check-input {
    height: 19px;
    width: 19px;
    border-radius: 6px;
    padding: 4px;
  }
`;

export default Content;
