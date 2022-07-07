import styled, { css } from 'styled-components';
import { AZUL, BRANCO, LARANJA, PRETO_10 } from '../../styles/variaveis';

export const HeaderInfo = styled.div`
  background-color: ${AZUL};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 8px 60px;

  div {
    width: 100%;
    text-align: center;
  }

  p {
    color: ${BRANCO};
    font-size: 12px;
    font-weight: bold;
    margin: 0;
    line-height: 12px;
  }

  svg {
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 768px) {
    padding: 4px 16px;
    div {
      text-align: left;
    }
    p {
      font-size: 8px;
      font-weight: 400;
    }
  }

  @media (max-width: 478px) {
    height: 33px;

    div {
      padding: 4px;
    }
  }
`;

export const Container = styled.header<IMobileProp>`
  padding: 8px 0px;
  z-index: 10;
  height: 116px;
  margin: 0 auto;
  background-color: ${BRANCO};

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 630px) {
    padding: 0;
  }

  @media (max-width: 478px) {
    height: 0;
    background-color: #fff;
    ${({ mostrarMenu, isMobile }) =>
      isMobile === false &&
      mostrarMenu === false &&
      css`
        height: 116px;
      `}

    ${({ mostrarMenu, isMobile }) =>
      isMobile &&
      css`
        height: 0vh;
      `}

    ${({ mostrarMenu }) =>
      mostrarMenu &&
      css`
        height: 0vh;
        animation: liq 0.5s normal forwards ease-in-out;
      `}

  ${({ mostrarMenu, isMobile }) =>
      !mostrarMenu &&
      isMobile &&
      css`
        height: 100vh;
        animation: desl 0.5s normal forwards ease-in-out;
      `}

    @keyframes liq {
      from {
        height: 0px;
      }
      to {
        height: 100vh;
      }
    }

    @keyframes desl {
      from {
        height: 100vh;
      }
      to {
        height: 0;
      }
    }
  }
`;

interface IMobileProp {
  isMobile: boolean;
  mostrarMenu: boolean;
}

export const Content = styled.section<IMobileProp>`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  nav {
    border-bottom: 1px solid #c6c6c6;
    padding: 16px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .menu {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 40px;

      a {
        color: ${PRETO_10};
        text-decoration: none;
        font-size: 18px;
      }

      button {
        padding: 16px 52px;
        white-space: nowrap;
      }
    }
  }

  @media (max-width: 1024px) {
    nav {
      .logo {
        img {
          width: 160px;
        }
      }
    }
  }

  @media (max-width: 991px) {
    nav {
      border: none;

      .menu {
        margin-top: 8px;
        gap: 20px;

        a {
          font-size: 18px;
        }

        button {
          padding: 16px 20px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    nav {
      .menu {
        margin-top: 8px;
        gap: 20px;

        a {
          font-size: 16px;
        }

        button {
          padding: 10px;
          font-size: 10px;
        }
      }
    }
  }

  @media (max-width: 630px) {
    nav {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  @media (max-width: 478px) {
    nav {
      border: none;

      .logo {
        margin-bottom: 16px;
        img {
          width: 200px;
        }
      }

      .menu {
        flex-direction: column;
        gap: 8px;

        a {
          font-size: 24px;
        }

        button {
          padding: 16px 20px;
        }
      }
    }
  }
`;

export const ContainerLogin = styled.span`
  height: 60px;
  white-space: nowrap;
  background-color: ${BRANCO};
  padding: 10px;
  gap: 8px;
  border-radius: 32px;
  margin-left: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    cursor: pointer;
    margin: 0;
  }

  > span {
    font-size: 16px;
    color: ${LARANJA};
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    a {
      border: 2px solid ${LARANJA};
      padding: 8px !important;
      background-color: red;
      cursor: pointer;
      background-color: #fff;
      border-radius: 40px !important;
      font-size: 16px;
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

export const ContainerMenuMobile = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 8px 20px;
  background-color: ${BRANCO};

  svg {
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;
