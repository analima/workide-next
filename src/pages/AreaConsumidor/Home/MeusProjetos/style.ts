import styled from 'styled-components';
import {
  AMARELO,
  AZUL,
  AZUL_60,
  AZUL_70,
  BRANCO,
  CINZA_10,
  CINZA_40,
  LARANJA,
  LARANJA_10,
  PRETO_60,
  VERDE,
  VERDE_100,
  VERDE_80,
  VERMELHO_70,
} from '../../../../styles/variaveis';

export const Content = styled.section`
  .label {
    border-radius: 8px;
    padding: 4px 16px;
    font-weight: bold;
    white-space: nowrap;
  }

  .criado {
    background-color: ${VERDE};
    color: ${BRANCO};
  }

  .recebendo-propostas {
    background-color: ${AZUL_70};
    color: ${BRANCO};
  }

  .aceita {
    background-color: ${VERDE_80};
    color: ${CINZA_40};
  }

  .aguardando-pagamento {
    background-color: ${LARANJA};
    color: ${BRANCO};
  }
  .cancelado {
    background-color: ${LARANJA_10};
    color: ${BRANCO};
  }

  .pagamento-efetuado {
    background-color: ${VERDE};
    color: ${CINZA_10};
  }

  .aguardando {
    background-color: green;
    color: ${BRANCO};
  }

  .iniciado {
    background-color: ${AZUL_60};
    color: ${BRANCO};
  }

  .pausado {
    background-color: #aaa;
    color: ${BRANCO};
  }

  .concluido {
    background-color: ${AZUL};
    color: ${BRANCO};
  }

  .conclusao-solicitada {
    background-color: ${VERDE_100};
    color: ${BRANCO};
  }

  .desistencia_iniciada {
    background-color: ${AMARELO};
    color: ${BRANCO};
    white-space: nowrap;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 478px) {
    flex-direction: column;
    align-items: center;

    a {
      margin-top: 16px;
    }
  }
`;

export const Body = styled.div`
  margin: 24px 0;
  min-height: 200px;
`;

export const VerTodos = styled.a`
  text-decoration: none;
  color: ${AZUL};
  font-weight: bold;
  border: solid 2px ${AZUL};
  padding: 12px 26px;
  border-radius: 8px;
`;
export const FiltrosContainer = styled.div``;

interface IFiltro {
  checked: boolean;
}

export const Filtro = styled.label<IFiltro>`
  margin: 8px;
  padding: 8px 16px;
  color: ${props => (props.checked ? BRANCO : AZUL_60)};
  background-color: ${props => (props.checked ? AZUL_60 : BRANCO)};
  border-radius: 24px;
  border: solid 1px ${AZUL_60};
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;

  input {
    display: none;
  }
`;

export const Resultados = styled.div`
  margin-top: 20px;

  table {
    min-width: 1024px;

    thead {
      th {
        background-color: ${AZUL};
        padding: 20px;
        font-weight: bold;
        color: ${BRANCO};
        font-size: 18px;
        white-space: nowrap;
      }

      img {
        cursor: pointer;
        -webkit-transition: -webkit-transform 0.2s ease;
        transition: transform 0.2s ease;

        &:hover {
          -webkit-transform: scale(1.1);
          transform: scale(1.1);
        }
      }
    }

    tbody {
      tr {
        -webkit-transition: -webkit-transform 0.2s ease;
        transition: transform 0.2s ease;
        cursor: pointer;

        :hover {
          -webkit-transform: scale(1.01);
          transform: scale(1.01);
        }
      }

      td {
        padding: 16px;
        font-size: 16px;
        line-height: 24px;
        color: ${PRETO_60};

        div {
          display: flex;
          align-items: center;
          justify-content: center;

          position: relative;
        }

        .message-amount {
          position: absolute;
          left: 13px;
          top: -5px;

          font-size: 0.5em;
          color: ${BRANCO};
          background-color: ${VERMELHO_70};
          width: 17px;
          height: 17px;
          border-radius: 50%;

          display: flex;
          justify-content: center;
          align-items: center;

          /* remove scale on hover of here */
          -webkit-transform: scale(1.01);
          transform: scale(1.01);
        }

        svg {
          width: 25px;
          height: 25px;
          margin-bottom: auto;
          margin-top: auto;
        }
      }

      .nome {
        word-break: break-word;
      }
    }
  }
`;

export const NenhumProjetoContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 30vh;
  padding: 5px;
`;
