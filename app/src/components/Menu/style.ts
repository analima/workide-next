import styled, { css } from 'styled-components';
import { AZUL, BRANCO, CINZA_40, PRETO_10 } from '../../styles/variaveis';
import { lighten } from 'polished';
import { Navbar } from 'react-bootstrap';

export const NavCustom = styled.div<{ hiddenBackground?: boolean }>`
  margin: 0px;
  padding: 0px;

  .container,
  .container-fluid,
  .container-xxl,
  .container-xl,
  .container-lg,
  .container-md,
  .container-sm {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }

  ${props =>
    props.hiddenBackground &&
    `
    .nav-container {
      margin: 0px;
      padding: 0px 50px;
      width: inherit;
      max-width: inherit;

      @media (max-width: 768) {
        padding: 0px !important;
      }
    }
    `}

  .icone-center {
    width: 80px;
    height: 60px;
    cursor: pointer;
    justify-self: center !important;
    margin: 0 auto !important;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      -moz-transform: scale(1.05);
      -webkit-transform: scale(1.05);
      transform: scale(1.05);
    }

    @media (max-width: 768px) {
      width: 54px;
      height: 20px !important;
      margin: 0 !important;
    }
  }

  .navbar-collapse {
    flex-grow: 0;
  }

  nav {
    height: 92px;

    width: 100%;
    position: ${props => (props.hiddenBackground ? 'relative' : 'fixed')};
    padding: 16px 0;
    background-color: ${props =>
      props.hiddenBackground ? 'transparent' : BRANCO};
    box-shadow: ${props =>
      props.hiddenBackground ? 'none' : '0px 4px 16px rgba(0, 0, 0, 0.2)'};
    z-index: 1000;

    .navbar-brand {
      @media (max-width: 768px) {
        margin: 0;
      }
    }

    .logo {
      cursor: pointer;

      img {
        cursor: pointer;
        width: 180px;

        @media (max-width: 768px) {
          width: 40px;
        }
      }
    }

    .container-profile,
    .container-log-out {
      display: flex;
      align-items: center;
      margin-left: 12px;
    }

    .separator {
      margin-right: 8px;

      @media (max-width: 767px) {
        display: none;
      }
    }

    .log-out-text {
      display: none;
      @media (max-width: 767px) {
        display: block;
        margin-left: 12px;
      }
    }

    .profile {
      margin-right: 12px;
    }

    .nav-link {
      padding: 0px;
      color: ${CINZA_40};
      text-shadow: 0 2 16px rgba(0, 0, 0, 0.2);
      margin-right: 20px;
      &:hover {
        color: ${lighten(0.2, CINZA_40)};
      }
    }

    .divisor {
      border-right: 1px solid ${BRANCO};
      height: 45px;
      margin: 0 25px;
    }

    .cadastre-se {
      color: ${CINZA_40};
      border: 2px solid ${CINZA_40};
      padding: 8px 10px;
      border-radius: 20px;
      text-decoration: none;

      &:hover {
        background-color: ${AZUL};
        border-color: ${AZUL};
        color: ${BRANCO};
      }
    }

    @media (max-width: 991px) {
      .divisor {
        border-top: 1px solid ${BRANCO};
        width: 100%;
        height: 1px;
        margin: 16px 0;
      }

      .cadastre-se {
        background-color: ${AZUL};
        border-color: ${AZUL};
        color: ${BRANCO};
      }
    }
  }
`;

export const NavLink = styled(Navbar.Toggle)`
  color: ${PRETO_10};
  padding: 10px 24px;
  border: 0;
  font-size: 16px;
  display: flex;
  cursor: pointer;

  &:first-child {
    margin-top: 16px;
  }
`;

export const ButtonToggle = styled(Navbar.Toggle)``;

export const DivOptions = styled.div`
  background-color: ${BRANCO};
  padding: 2px;

  @media (max-width: 767px) {
    width: 100%;
  }
  @media (max-width: 578px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center !important;
  }
`;

interface IMobileProp {
  open: boolean;
}

export const ToggleMenu = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const ContentMobile = styled.section<IMobileProp>`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  position: absolute;
  z-index: 9999;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  background-color: #f6f6f6;
  opacity: 0;
  transition: opacity 2s;

  ${({ open }) =>
    open
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
        `}

  .logo {
    margin-top: 16px !important;

    img {
    }
  }

  nav {
    padding: 8px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .menu {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 40px;

      a {
        color: ${AZUL};
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
          width: 160px;
        }
      }

      .menu {
        flex-direction: column;
        gap: 8px;
        width: 100%;

        a {
          font-size: 20px;
        }

        button {
          padding: 16px 20px;
        }
      }
    }
  }
`;

export const ContainerLogin = styled.span`
  padding: 16px;
  gap: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  justify-content: space-between;
  width: 100%;

  div {
    width: 100%;
    display: flex;
    align-items: flex-start !important;
    justify-content: flex-start;
  }

  svg {
    cursor: pointer;
    margin: 0 5px 0 0;
  }

  > span {
    font-size: 16px;
    color: ${AZUL};
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 990px) {
    margin-left: 0;
  }
`;

export const ContainerMenuMobile = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px;

  svg {
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const ContainerCentral = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  background-color: ${BRANCO};

  div {
    width: 200px !important;
  }

  @media (max-width: 900px) {
    width: 80% !important;
  }

  @media (max-width: 578px) {
    width: 70% !important;
    div {
      width: 130px !important;
    }
  }
`;
