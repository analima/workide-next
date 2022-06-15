import {
  CINZA_20,
  AZUL,
  VERDE,
  VERMELHO,
} from '../../../../../styles/variaveis';
import styled from 'styled-components';

interface ProgressBarProp {
  percentage: number;
  status: string;
}

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30rem;

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

export const ContainerProgressBar = styled.div`
  width: 70%;
  height: 4rem;
  border-radius: 6px;
  background-color: ${CINZA_20};

  @media (max-width: 480px) {
    width: 90%;
  }
`;

export const ProgressBar = styled.div<ProgressBarProp>`
  width: ${props => props.percentage + '%'};
  height: 4rem;
  border-radius: 6px;
  background-color: ${props =>
    props.percentage < 100
      ? AZUL
      : props.status === 'APROVADO!'
      ? VERDE
      : VERMELHO};

  transition: all 800ms;
`;

export const LoadingText = styled.span`
  font-size: 24px;
  margin-top: 15px;
  font-weight: bold;
  color: #fff;
  position: absolute;
  margin-left: 12rem;

  @media (max-width: 992px) {
    margin-left: 6rem;
  }
  @media (max-width: 480px) {
    margin-left: 20%;
  }
  @media (max-width: 360px) {
    margin-left: 2rem;
  }
`;

export const TextPendingInvoice = styled.h2`
  color: ${AZUL};
  font-weight: bold;
  margin-bottom: 30px;
`;
