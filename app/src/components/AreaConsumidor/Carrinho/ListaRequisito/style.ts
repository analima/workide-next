import styled from 'styled-components';
import { AZUL, PRETO_10 } from '../../../../styles/variaveis';

const Content = styled.div`
  .form-switch > label {
    font-size: 24px;
    font-weight: bold;
    color: ${AZUL};

    @media (max-width: 478px) {
      font-size: 16px;
    }
  }
`;

export const RequisitoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 80px;

  .form-check-input {
    width: 24px;
    height: 24px;
    margin: 0 12px;
  }

  @media (max-width: 478px) {
    padding: 16px 12px;
  }
`;

export const RequisitoLabel = styled.div``;

export const RequisitoVazio = styled.h3`
  color: ${PRETO_10};
  font-weight: bold;
  width: 100%;
  text-align: center;
`;

export default Content;
