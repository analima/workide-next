import styled from 'styled-components';
import { AZUL, BRANCO, CINZA_40, PRETO_10 } from '../../styles/variaveis';
import { lighten } from 'polished';
import { Navbar } from 'react-bootstrap';

export const NavCustom = styled.div<{ hiddenBackground?: boolean }>`
  margin: 0px;
  padding: 0px;

  ${props =>
    props.hiddenBackground &&
    `
  .nav-container {
    margin: 0px;
    padding: 0px 50px;
    width: inherit;
    max-width: inherit;
  }
  `}

  .icone-center {
    width: 80px;
    height: 60px;
    cursor: pointer;
    transition: all 0.5s;

    &:hover {
      -moz-transform: scale(1.05);
      -webkit-transform: scale(1.05);
      transform: scale(1.05);
    }

    @media (max-width: 768px) {
      width: 54px;
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
        width: 132px;
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
