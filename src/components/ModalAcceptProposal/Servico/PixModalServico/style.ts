import { AZUL, CINZA_20, BRANCO, LARANJA } from '../../../../styles/variaveis';
import styled from 'styled-components';

export const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  height: 30rem;

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

export const ContentLoad = styled.div`
  background-color: ${CINZA_20};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  width: 65%;
  .container-qrcode {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    span {
      color: ${AZUL};
      margin-top: 20px;
      text-align: center;
    }
  }

  .qrcode {
    background-color: #fff;
    @media (max-width: 992px) {
      width: 200px !important;
    }
  }

  h1 {
    font-weight: bold;
  }

  @media (max-width: 400px) {
    width: 100%;
    padding: 20px;
  }

  canvas {
    width: 320px !important;
    height: 320px !important;

    @media (max-width: 992px) {
      width: 200px !important;
      height: 200px !important;
    }
  }
`;

export const ContainerFinishPix = styled.div`
  width: 32%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;

  @media (max-width: 400px) {
    width: 100%;
  }
`;

export const ContentPixOpened = styled.div`
  border: solid 2px ${AZUL};
  border-radius: 8px;
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  flex: 1;

  h1 {
    color: ${AZUL};
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

export const ContainerButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

export const Button = styled.button`
  border-radius: 8px;
  background-color: ${AZUL};
  color: white;
  padding: 15px 30px;
  border: none;
  font-weight: bold;
  transition: all 100ms;

  :active,
  :hover {
    background-color: ${LARANJA};
  }
`;

export const ContainerNewCharge = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  background-color: ${BRANCO};
  border-radius: 8px;
  padding: 2rem;
  align-items: center;

  span {
    font-size: 1.2rem;
  }
`;

export const ContainerPendingInvoice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  width: 65%;
  flex-direction: column;
`;

export const TextPendingInvoice = styled.h2`
  color: ${AZUL};
  font-weight: bold;
  margin-bottom: 30px;
`;
