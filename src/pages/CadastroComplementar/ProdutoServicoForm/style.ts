import { lighten } from 'polished';
import styled from 'styled-components';
import { AZUL, BRANCO } from '../../../styles/variaveis';

export const Content = styled.section`
  .avatar {
    div {
      background-color: ${BRANCO};
      width: 196px;
      height: 196px;
      /* border-radius: 98px !important; */

      div {
        border: 2px solid rgb(151, 151, 151) !important;

        label {
          font-weight: normal !important;
          font-size: 16px !important;
        }
      }
    }
  }

  .servico-hora {
    display: flex;

    .form-check {
      padding-right: 90px;

      .form-check-label {
        padding-left: 8px;
      }
    }
  }

  textarea {
    min-height: 153px;
  }

  .revisao-orcamento,
  .reuniao-obrigatoria {
    display: flex;
    .form-check {
      padding-right: 24px;

      .form-check-label {
        padding-left: 8px;
      }
    }
  }

  .btn-salvar {
    display: flex;
    justify-content: flex-end;

    button {
      color: ${BRANCO};
      background-color: ${AZUL};
      border-color: ${AZUL};
      font-size: 11px;
      font-weight: bold;
      padding: 16px 40px;
      border-radius: 8px;

      &:hover {
        background-color: ${lighten(0.1, AZUL)};
      }
    }
  }

  input[type='file'] {
    display: none;
  }

  .upload {
    font-size: 11px;
    font-weight: bold;
    color: ${AZUL};
    cursor: pointer;
    margin: 10px;
    padding: 6px 20px;
  }
`;
