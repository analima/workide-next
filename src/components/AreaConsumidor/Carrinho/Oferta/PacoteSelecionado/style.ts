import styled from 'styled-components';
import { AZUL, PRETO_60, VERDE } from '../../../../../styles/variaveis';

const Content = styled.div`
  padding: 0 42px;

  @media (max-width: 478px) {
    padding: 0;
  }
`;

export const CardPacote = styled.div`
  padding: 52px 24px 24px 74px;
  border: solid 1px ${AZUL};
  border-radius: 8px;
  margin-bottom: 52px;

  @media (max-width: 478px) {
    padding: 16px;
  }

  @media (max-width: 991px) {
    padding: 24px;
  }
`;

export const PassoDescricao = styled.p`
  text-align: justify;

  @media (max-width: 478px) {
    margin-top: 8px;
  }
`;

export const ContainerValor = styled.div`
  padding: 0 42px;
  margin-top: 36px;
  display: flex;
  justify-content: space-between;

  p {
    font-size: 12px;
    text-align: center;
    margin: 8px 0;
  }

  @media (max-width: 478px) {
    margin-top: 8px;
  }

  @media (max-width: 991px) {
    flex-direction: column;
    padding: 0;
  }
`;

export const ValorTotal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  color: ${VERDE};
  font-weight: bold;

  @media (max-width: 991px) {
    align-items: center;
  }

  .valor-fornecedor {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    width: 150px;

    span {
      font-size: 12px;
      color: ${PRETO_60};
    }
  }

  .taxa-adm {
    display: flex;
    justify-content: space-between;

    width: 150px;

    span {
      font-size: 12px;
      color: ${PRETO_60};
    }
  }

  p {
    font-size: 24px;
    margin: 0px;
  }

  span {
    font-size: 12px;
    color: ${PRETO_60};
  }
`;

export default Content;
