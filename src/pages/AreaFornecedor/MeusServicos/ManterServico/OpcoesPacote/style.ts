import styled from 'styled-components';
import { lighten } from 'polished';

import {
  AZUL,
  BRANCO,
  CINZA_20,
  LARANJA,
  VERDE,
  PRETO_10,
  PRETO_60,
} from '../../../../../styles/variaveis';

export const Content = styled.section`
  .text--only-padding-top {
    padding-bottom: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }

  .voltar-button {
    width: 130px;
  }

  .primary {
    background-color: ${AZUL};
    color: ${BRANCO};

    span {
      background-color: ${BRANCO};
      color: ${AZUL};
    }
  }

  .check-pacote {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;

    input:checked {
      background-color: ${AZUL};
    }

    input:disabled {
      background-color: ${CINZA_20};
    }
  }

  table {
    tr {
      .td-item {
        display: flex;
        gap: 8px;

        svg {
          cursor: pointer;

          &:hover {
            opacity: 0.8;
          }
        }
      }

      td:not(:first-child) {
        min-width: 260px;
      }

      td:first-child {
        width: 28px;
        border: none;
      }

      .td--no-border {
        border: none;
      }

      td {
        border: solid 1px ${lighten(0.4, AZUL)};
        padding: 16px 8px;

        div.container-taxa-admin {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          span {
            color: ${PRETO_10};
            font-weight: bold;
          }
        }
        div.container-valor-total {
          width: 95%;
          padding-left: 2.5%;
          display: flex;
          justify-content: space-between;
          margin-top: 10px;

          span {
            color: ${VERDE};
            font-weight: bold;
            font-size: 1.8rem;
          }
        }

        &.label-pacote {
          color: ${AZUL};
          font-weight: bold;

          &.azul {
            background-color: ${AZUL};
            color: ${BRANCO};
          }

          &.verde {
            background-color: ${VERDE};
            color: ${BRANCO};
          }

          &.laranja {
            background-color: ${LARANJA};
            color: ${BRANCO};
          }

          svg {
            margin-right: 4px;
          }
        }

        .label-metodo {
          width: 100%;
          padding: 4px 16px;
          background-color: ${AZUL};
          color: ${BRANCO};
        }

        .form-check {
          margin-left: 24px;
        }
      }
    }
  }
`;

export const FotoServico = styled.section`
  margin: 16px 0;
  display: flex;
  justify-content: center;
  object-fit: cover;

  label {
    border-radius: 8px;
    .overlay {
      border-radius: 8px;
    }
  }
`;

export const GhostButton = styled.button`
  text-align: -webkit-center;
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;
  width: 250px;
  padding: 16px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid ${AZUL};
  color: ${AZUL};
  font-weight: bold;

  &:hover {
    color: ${BRANCO};
    background-color: ${AZUL};
    border-color: ${BRANCO};
  }

  @media (max-width: 478px) {
    /* width: 100%; */
    font-size: 12px;
  }
`;

export const Button = styled.button`
  padding: 16px 40px;
  font-weight: bold;
  color: ${BRANCO};
  background-color: ${AZUL};
  border-radius: 8px;
  border: none;

  &:hover {
    background-color: ${lighten(0.1, AZUL)};
  }

  svg {
    margin-left: 16px;
  }

  @media (max-width: 478px) {
    width: 100%;
    margin-top: 16px;
  }
`;

export const ValueMax = styled.span`
  color: ${PRETO_60};
  font-size: 14px;
`;

export const ContentInfoPrice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const AjudaCalculadora = styled.a`
  text-decoration: none;
  color: ${AZUL};
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;

  :hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;
