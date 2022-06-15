import styled from 'styled-components';
import {
  AZUL,
  CINZA_30,
  CINZA_40,
  PRETO_60,
  VERDE,
  VERMELHO,
  PRETO_10,
} from '../../../../styles/variaveis';

interface OverlayGratuidadeProps {
  show: boolean;
}

export const Content = styled.div``;

export const ResumoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const StatusContainer = styled.div`
  margin-top: 32px;

  h3 {
    font-weight: bold;
    font-size: 24px;
    color: ${CINZA_40};
    text-align: end;
  }

  span {
    font-weight: bold;
    font-size: 24px;
    color: ${VERDE};
  }

  p {
    margin-top: 16px;
    font-weight: bold;
    color: ${CINZA_30};
  }

  a {
    text-decoration: none;
    font-weight: bold;
    color: ${AZUL};
  }
`;

export const Resumo = styled.div`
  width: 650px;
  padding: 32px;

  border: 2px solid transparent;
  border-radius: 8px;
  background: linear-gradient(to right, white, white),
    linear-gradient(to right, ${AZUL}, ${VERDE});
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;

  @media (max-width: 478px) {
    width: 100%;

    h2 {
      font-size: 16px;
    }

    h3 {
      font-size: 24px;
    }
  }
`;

export const Plano = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px ${VERDE};
  border-radius: 8px;
  padding: 24px;
  margin: 32px 0;
`;

export const ContentPlano = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const ContentDesconto = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 30px;
  margin-top: 15px;

  div.cofundador {
    display: flex;

    img {
      width: 15px;
      margin-right: 15px;
    }
  }
`;

export const PlanoSelecionado = styled.div`
  display: flex;
  align-items: center;

  .form-check-input {
    width: 24px;
    height: 24px;
    margin: 0 8px 0 0;
  }
`;
export const PlanoValor = styled.div``;

export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px;
`;

export const Acoes = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Status = styled.div`
  margin: 32px 0;
  display: flex;
  align-items: center;

  span {
    color: ${PRETO_10};
    font-weight: bold;
    margin-right: 10px;
    font-size: 18px;
  }

  .processando {
    color: ${AZUL};
  }

  .reprovado {
    color: ${VERMELHO};
  }

  .aprovado {
    color: ${VERDE};
  }
`;

export const TituloGradiente = styled.h3`
  background: -webkit-linear-gradient(${AZUL}, ${VERDE});
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 32px;
  font-weight: bold;

  @media (max-width: 478px) {
    text-align: center;
  }
`;

export const DisabledPayButton = styled.button`
  width: 150px;
  padding: 16px;
  background-color: transparent;
  border-radius: 8px;
  border: solid 2px ${CINZA_30};
  color: ${CINZA_30};
`;

export const ButtonCancel = styled.button`
  background-color: transparent;
  border: none;
  color: ${AZUL};
  font-weight: bold;
`;

export const OverlayGratuidade = styled.div<OverlayGratuidadeProps>`
  display: ${props => (props.show ? 'block' : 'none')};
  position: absolute;
  border-radius: 6px;
  padding: 15px;
  background-color: ${PRETO_60};
  width: 300px;
  height: auto;
  right: 19rem;

  @media (max-width: 1800px) {
    right: 10rem;
  }

  @media (max-width: 1500px) {
    right: 5rem;
  }

  @media (max-width: 1350px) {
    right: 2rem;
  }

  @media (max-width: 1200px) {
    left: 2rem;
  }

  p {
    color: #fff;
    width: 100%;
  }
`;
