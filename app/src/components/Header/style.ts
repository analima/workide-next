import { Dropdown } from 'react-bootstrap';
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
    max-width: 1440px;
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

export const Container = styled.header`
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
`;

interface IMobileProp {
  isMobile: boolean;
  mostrarMenu: boolean;
}

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  padding: 0 62px;
  margin: 0 auto;

  nav {
    border-bottom: 1px solid #c6c6c6;
    padding: 16px 0;
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .content-logo {
      display: flex;
      align-items: center;
      gap: 8px;

      .logo {
        cursor: pointer;
      }

      a {
        color: ${PRETO_10};
        text-decoration: none;
        font-size: 18px;
      }
    }

    .menu {
      display: flex;
      align-items: center;
      gap: 32px;

      a {
        color: ${PRETO_10};
        text-decoration: none;
        font-size: 18px;
      }

      button {
        padding: 16 40px;
        white-space: nowrap;
      }
    }
  }

  @media (max-width: 1100px) {
    padding: 0 24px;

    nav {
      .logo {
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
interface IProps {
  open: boolean;
}

export const TT = styled.div<IProps>`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  padding: 8px;
  position: relative;

  .content-logo-mobile {
  }

  .items {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    top: 0;
    height: 0vh;
    background-color: #fff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    z-index: 999;
    padding: 16px 8px;
    transition: width 0.5s, height 0.5s, opacity 0.5s;
    opacity: 0;
    transition-timing-function: ease-in;

    ${({ open }) =>
      open
        ? css`
            width: 75%;
            height: 100vh;
            opacity: 1;
          `
        : css`
            width: 0;
            height: 0vh;
            opacity: 0;
          `}

    .links {
      margin-top: 16px;
      flex-direction: column;
      gap: 16px;
      display: none;
      transition: display 5s;

      a {
        color: #767676;
        font-size: 18px;
        font-weight: 600;
      }
      ${({ open }) =>
        open
          ? css`
              display: flex;
            `
          : css`
              display: none;
            `}
    }

    > .content-logo-mobile {
      text-align: center;
      display: none;
      transition: display 5s;

      ${({ open }) =>
        open
          ? css`
              display: inline;
            `
          : css`
              display: none;
            `}
    }
  }

  svg {
    position: absolute;
    right: 16px;

    :hover {
      opacity: 0.8;
    }
  }
`;
