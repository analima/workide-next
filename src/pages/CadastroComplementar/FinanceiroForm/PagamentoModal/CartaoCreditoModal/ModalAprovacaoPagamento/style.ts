import {
  CINZA_20,
  AZUL,
  VERMELHO,
  VERDE,
  PRETO_60,
} from '../../../../../../styles/variaveis';
import styled from 'styled-components';

interface ProgressBarProp {
  percentage: number;
  status: string;
}

const Content = styled.div`
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

export const ContainerPaymentFree = styled.div`
  width: 90%;
  background-color: #fff;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 3rem;
  /* -webkit-box-shadow: 0px -3px 10px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25); */

  div.text {
    display: flex;
    flex-direction: column;

    span {
      color: ${PRETO_60};
      font-weight: bold;
      font-size: 22px;
    }
  }
`;

export default Content;
