import styled from 'styled-components';
import {
  AZUL,
  BRANCO_GELO,
  CINZA_40,
  PRETO_10,
} from '../../../../styles/variaveis';

export const Content = styled.div`
  span {
    font-size: 12px;
    font-weight: bold;
    color: ${PRETO_10};
    padding: 8px;
    cursor: pointer;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-color: ${BRANCO_GELO};
  }
  .container {
    .col-btn-descricao {
      margin-top: 8px;
      padding: 0;

      button {
        width: 100%;
        border-radius: 8px 0 0 8px;
        padding: 16px;
        background-color: ${AZUL};
        box-shadow: none;
        font-weight: bold;

        @media (max-width: 478px) {
          border-radius: 8px 8px 0 0;
          margin-top: 0;
        }
      }
    }

    .col-box-descricao {
      padding: 0;
      margin-top: 8px;

      @media (max-width: 478px) {
        margin-top: 0;
      }
    }
  }
`;

export const Descricao = styled.div`
  padding: 24px;
  background-color: ${BRANCO_GELO};

  @media (max-width: 478px) {
    border-radius: 0 0 8px 8px;
  }
`;

export const DescricaoTitulo = styled.p`
  font-weight: bold;
  font-size: 16px;
  color: ${PRETO_10};
`;

export const DescricaoTexto = styled.p`
  color: ${CINZA_40};
  font-size: 12.8px;
`;

export const DescricaoRodapeContainer = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  div:first-child {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const DescricaoRodape = styled.p`
  font-size: 0.9em;
  color: ${CINZA_40};
  margin: 0px 0px 2px 0px;
`;

interface ButtonCaseProps {
  active?: boolean;
}

export const ButtomCase = styled.span<ButtonCaseProps>`
  font-size: 12.8px;
  font-weight: bold;
  color: ${PRETO_10};
  border-bottom: ${props => (props.active ? `2px solid ${AZUL}` : 'none')};
  padding: 8px;
  cursor: pointer;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  box-shadow: ${props =>
    props.active ? `0px 0px 4px 0px rgba(0, 0, 0, 0.2)` : 'none'};
`;
