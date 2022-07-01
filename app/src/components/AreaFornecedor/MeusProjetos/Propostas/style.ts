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
  LARANJA_80,
  PRETO_60,
  ROSA_CHOCK,
  VERDE,
  VERDE_80,
  VERMELHO,
  VERMELHO_70,
} from '../../../../styles/variaveis';

const Content = styled.section`
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

  .standby {
    background-color: ${ROSA_CHOCK};
    color: ${BRANCO};
  }

  .concluido {
    background-color: ${AZUL};
    color: ${BRANCO};
  }

  .revisao {
    background-color: ${AMARELO};
    color: ${BRANCO};
  }

  .recusada {
    background-color: ${VERMELHO};
    color: ${BRANCO};
  }

  .cancelada {
    background-color: #eead2d;
    color: ${BRANCO};
  }
`;

export const Body = styled.div`
  margin: 24px 0;
`;

export const Resultados = styled.div`
  margin-top: 24px;

  table {
    min-width: 1024px;

    thead {
      th {
        background-color: ${LARANJA_80};
        padding: 20px;
        font-weight: bold;
        color: ${PRETO_60};
        font-size: 16px;
        text-align: left;
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

export const ContainerFiltro = styled.div`
  display: flex;
  margin-bottom: 32px;

  @media (max-width: 478px) {
    display: grid;
    grid-template-columns: auto auto;
  }
`;

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

export const NenhumProjetoContent = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;

export default Content;
