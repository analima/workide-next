import { AZUL, BRANCO, PRETO_10, LARANJA } from '../../styles/variaveis';
import styled from 'styled-components';

export const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  height: 30rem;
  padding: 30px;
  padding-left: 0;

  .avatar-fundador {
    height: 80%;
    margin: auto 0;
  }

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

export const ContainerText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  h3 {
    color: ${AZUL};
    font-size: 24px;
    font-weight: bold;
  }

  p {
    color: ${PRETO_10};
    font-size: 20px;
    margin: 10px 0;
  }

  .text-blue {
    color: ${AZUL};
  }
`;

export const CoFounderNumber = styled.span`
  font-size: 22px;
  font-weight: bold;
`;

export const ContainerButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 5rem;
`;

export const ButtonLink = styled.button`
  background-color: ${AZUL};
  border-radius: 8px;
  border: none;
  padding: 20px 30px;
  color: ${BRANCO};
  font-weight: bold;
  font-size: 20px;
  margin: 0 10px;
`;

export const ButtonLinkLaranja = styled.button`
  background-color: ${LARANJA};
  border-radius: 8px;
  border: none;
  padding: 20px 30px;
  color: ${BRANCO};
  font-weight: bold;
  font-size: 20px;
  margin: 0 10px;
`;
