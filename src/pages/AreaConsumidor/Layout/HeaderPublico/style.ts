import styled from 'styled-components';
import {
  APPEAR_FROM_LEFT,
  APPEAR_FROM_TOP,
} from '../../../../utils/animations';
import { AZUL, BRANCO, LARANJA } from '../../../../styles/variaveis';

export const Content = styled.section`
  display: flex;
  justify-content: space-between;

  img {
    cursor: pointer;
  }

  button {
    display: none;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation: ${APPEAR_FROM_TOP} 0.7s ease-in-out;

    a {
      text-decoration: none;
      font-weight: 200;
      color: white;
      transition: filter 0.2s;
      margin-left: 1.5rem;

      &:last-child {
        background: white;
        padding: 1.6rem 3rem;
        border-radius: 0.6rem;
      }
      &:hover {
        filter: brightness(0.9);
      }
    }
  }
`;

export const Containe = styled.header`
  height: 6.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  letter-spacing: 0.1rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  background-image: linear-gradient(to right, #019ecf, #00b4af);

  .container {
    max-width: 90%;
  }

  strong {
    font-size: 4rem;
    animation: ${APPEAR_FROM_LEFT} 1s ease-in-out;
  }

  @media (max-width: 1000px) {
    nav {
      display: none;
      &.active {
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        z-index: 5;
        background: ${AZUL};
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        a {
          display: block;
          padding: 2rem 0;
          margin-left: 0;
          & + a {
            margin-left: 0;
          }
          &:last-child {
            color: white;
            padding: 1.6rem 3rem;
            border-radius: 0.6rem;
          }
        }
      }
    }
    button {
      width: 40px;
      height: 40px;
      border: none;
      background: transparent;
      position: fixed;
      right: 2rem;
      z-index: 15;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        width: 24px;
        height: 24px;
        color: blue;
      }
    }
  }
  @media (max-width: 900px) {
    strong {
      font-size: 3rem;
    }
  }
  @media (max-width: 600px) {
    height: 8rem;
    strong {
      font-size: 2rem;
    }
  }

  .logo {
    cursor: pointer;
  }

  .profile {
    margin-right: 12px;
  }

  .log-out-text {
    display: none;
    @media (max-width: 767px) {
      display: block;
      margin-left: 12px;
    }
  }
`;

export const ContainerLogin = styled.span`
  width: 250px;
  height: 60px;
  white-space: nowrap;
  background-color: ${BRANCO};
  padding: 10px;
  border-radius: 32px;
  margin-left: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    cursor: pointer;
  }

  > span {
    font-size: 18px;
    color: ${LARANJA};
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    a {
      border: 2px solid ${LARANJA};
      padding: 8px !important;
      cursor: pointer;
      background-color: #fff;
      border-radius: 40px !important;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      cursor: pointer;
      color: ${LARANJA} !important;
      font-weight: normal;
      transition: all 0.3s;

      &:hover {
        background-color: ${LARANJA};
        color: #fff !important;
      }
    }
  }

  @media (max-width: 990px) {
    margin-left: 0;
  }
`;
