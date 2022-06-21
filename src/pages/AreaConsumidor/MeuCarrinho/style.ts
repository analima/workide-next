import { lighten } from 'polished';
import styled from 'styled-components';
import { BRANCO, AZUL, VERDE } from '../../../styles/variaveis';

export const Content = styled.div``;

export const CardCarrinho = styled.div`
  min-width: 650px;
  background-color: ${BRANCO};
  padding: 32px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 8px;

  border-width: 1px;
  border-style: solid;
  border-image: linear-gradient(to right, ${AZUL}, ${VERDE}) 1;

  @media (max-width: 478px) {
    padding: 16px;
    min-width: 100%;
  }
`;

export const OfertaContainer = styled.div`
  padding: 32px;
  border: solid 1px #008fe540;
  margin-top: 20px;
`;

export const Oferta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Adicional = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  margin-bottom: 8px;
`;

export const Descricao = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;

  .form-check {
    margin: 0 16px;

    /* .form-check-input:checked {
      background-color: linear-gradient(180deg, ${VERDE}, ${AZUL}) !important;
    } */
  }
`;

export const AdicionalDescricao = styled(Descricao)`
  margin-left: 24px;

  input {
    /* width: 16px !important;
    height: 16px !important; */
  }
`;

export const Valor = styled.div``;

export const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 24px 0 0 0;
`;

export const AcoesContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 24px 0;

  @media (max-width: 478px) {
    flex-direction: column-reverse;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  padding: 16px 40px;
  font-weight: bold;
  font-size: 10px;
  color: ${BRANCO};
  background-color: ${AZUL};
  border-radius: 8px;
  border: 2px solid ${AZUL};

  &:hover {
    background-color: ${lighten(0.1, AZUL)};
    color: ${BRANCO};
  }

  @media (max-width: 478px) {
    font-size: 12px;
    width: 100%;
  }
`;

export const GhostButton = styled.a`
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;
  padding: 16px 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid ${AZUL};
  color: ${AZUL};
  font-weight: bold;
  margin-right: 16px;
  text-decoration: none;

  &:hover {
    color: ${BRANCO};
    background-color: ${AZUL};
    border-color: ${BRANCO};
  }

  @media (max-width: 478px) {
    width: 100%;
    font-size: 12px;
    margin: 16px 0;
  }
`;

export const StatusContainer = styled.div`
  margin: 24px 0;
`;

export const TituloGradiente = styled.h1`
  background: -webkit-linear-gradient(${AZUL}, ${VERDE});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 28px;
  font-weight: bold;

  @media (max-width: 478px) {
    text-align: center;
  }
`;

export const CarrinhoVazio = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
