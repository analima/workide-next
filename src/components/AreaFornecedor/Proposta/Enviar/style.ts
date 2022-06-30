import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import {
  AZUL,
  BRANCO,
  CINZA_40,
  PRETO_60,
  VERDE,
} from '../../../../styles/variaveis';

const Content = styled.div`
  color: ${CINZA_40};

  .btn-fornecedor {
    button {
      background-color: ${AZUL} !important;
    }
  }
  .block-error {
    color: red;
    font-size: 14px;
  }

  .label-total-horas {
    font-weight: bold;
  }

  .total-horas {
    margin: 0 6px;
  }
`;

export const ContentInputsProposta = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
`;

export const DiasCorridosContainer = styled.div`
  display: flex;

  .form-control {
    width: 85px;
    height: 48px;
    margin-left: 8px;
  }

  span {
    margin-left: 8px;
  }
`;

export const ValoresContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  font-weight: bold;

  h4 {
    font-weight: bold;
    color: ${VERDE};
  }
`;

export const NumberOfCharacters = styled.span`
  font-size: 16px;
  margin-top: 16px;
`;

export const Error = styled.p`
  color: red;
`;

export const Load = styled(Button)`
  width: 185px;
  padding: 16px;
  font-weight: bold;
  background-color: ${AZUL};
  border-radius: 8px;
  border: 1px solid ${AZUL};
  font-size: 12px;
  text-decoration: none;

  .spinner-border {
    width: 1rem;
    height: 1rem;
    color: ${BRANCO};
  }
`;

export const ValueMax = styled.span`
  color: ${PRETO_60};
  font-size: 14px;
`;

export const AjudaCalculadora = styled.a`
  text-decoration: none;
  color: ${AZUL};
  font-size: 16px;
  font-weight: bold;
  margin-left: 8px;
  cursor: pointer;

  :hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;

export const TitleCondicoes = styled.span`
  font-weight: bold;
  font-size: 16px;
`;

export default Content;
