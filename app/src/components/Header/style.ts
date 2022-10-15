import { Accordion, Dropdown, NavDropdown } from 'react-bootstrap';
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
  max-width: 1315px;
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
      gap: 16px;

      .logo {
        cursor: pointer;
      }

      a {
        color: ${PRETO_10};
        text-decoration: none;
        font-size: 18px;
        font-weight: 500;
        transition: all 0.3s;

        :hover {
          opacity: 0.8;
        }
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

  .link-user-login {
    color: ${AZUL};
  }

  @media (max-width: 478px) {
    background-color: ${AZUL};
    justify-content: center;
    .link-user-login {
      color: ${BRANCO};
    }
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

export const ContentMenuMobile = styled.div<IProps>`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  padding: 8px;
  position: relative;
  background-color: #f6f6f6;

  .content-logo {
    a {
      font-size: 12px;
    }
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

      .content-btn {
        display: none;

        button {
          white-space: nowrap;
        }
      }

      a {
        color: #767676;
        font-size: 18px;
        font-weight: 600;
      }

      ${({ open }) =>
        open
          ? css`
              display: flex;

              .content-btn {
                display: block;
              }
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

export const DropdownItem = styled(NavDropdown.Item)`
  text-align: center;
  padding: 16px;
  font-size: 12px;
  :hover {
    background-color: #d9eefb;
  }
`;

export const AccordionPrimary = styled(Accordion)`
  background-color: ${BRANCO};
  border-bottom: 1px solid #00000020;
  padding: 8px;

  .collapse-itens {
    display: flex;
    flex-direction: column;
    gap: 8px;

    a {
      padding: 8px;
      :hover {
        background-color: #d9eefb;
      }
    }

    > a {
      font-weight: 500;
    }
  }

  @media (max-width: 768px) {
    span {
      font-size: 16px;
    }
  }
`;

export const AccordionSecondary = styled(Accordion.Toggle)`
  border: none;
  background-color: red;
  padding: 8px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${BRANCO};
  width: 100%;
  gap: 8px;

  span {
    color: ${PRETO_10};
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }
`;
