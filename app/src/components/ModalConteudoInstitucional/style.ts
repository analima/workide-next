import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { AZUL, AZUL_60, BRANCO, VERDE, VERMELHO } from '../../styles/variaveis';

export const Content = styled(Modal)``;

export const ContainerBody = styled(Modal.Body)`
  background: #f8f8f8;

  #items {
    display: flex;
    width: 100%;
    overflow-x: auto;
    scroll-snap-type: x mandatory;

    &::-webkit-scrollbar {
      width: 0 !important;
    }

    .item {
      flex: none;
      width: 800px;
      scroll-snap-align: start;
      -webkit-overflow-scrolling: touch !important;

      .item-body {
        padding: 20px 40px;
        display: flex;

        width: 100%;
        height: 100%;

        .container-text {
          margin-left: 40px;

          .title {
            font-size: 25px;
            background: -webkit-linear-gradient(${AZUL}, ${VERDE});
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: bold;
          }

          .container-check {
            display: flex;
            align-items: center;

            .ERROR {
              color: ${VERMELHO};
            }

            input {
              width: 17px;
              height: 17px;
            }

            input:checked {
              filter: contrast(100%);
            }

            label {
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
`;

export const ImageAvatar = styled.img`
  height: 294px;
`;

export const ContainerFooter = styled(Modal.Footer)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 5px 20px 5px 20px;
`;

export const ContainerIconNext = styled.div`
  display: flex;
  justify-content: space-between;
  width: 56%;

  p {
    color: ${AZUL};
  }

  .icons {
    display: flex;
    align-items: center;

    .icon {
      margin-left: 10px;
    }
  }
`;

export const Button = styled.a`
  background-color: ${AZUL_60};
  transition: all 0.2s ease-in-out;
  height: 60px;
  padding: 14px 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid ${AZUL_60};
  color: ${BRANCO};
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: ${AZUL};
    border: 2px solid ${AZUL};
    color: ${BRANCO};
  }
`;
