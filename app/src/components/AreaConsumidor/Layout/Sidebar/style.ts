import styled from 'styled-components';
import { AZUL, BRANCO } from '../../../../styles/variaveis';

interface ISidebar {
  open: boolean;
}

const Content = styled.div<ISidebar>`
  background-color: ${BRANCO};
  width: 340px;
  min-height: 100%;
  position: absolute;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 8px 8px;
  border: 2px solid ${AZUL};
  display: flex;
  padding: 48px 0;
  z-index: 999;

  @keyframes open {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(10%);
    }
    100% {
      transform: translateX(0%);
    }
  }

  @keyframes hidden {
    0% {
      transform: translateX(0%);
    }
    50% {
      transform: translateX(10%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  animation: ${props => (props.open ? 'open' : 'hidden')};
  animation-duration: 0.4s;

  visibility: ${props => (props.open ? 'visible' : 'hidden')};
  transition: visibility 0.4s ease-in-out;
  /* transform: ${props =>
    props.open ? 'translateX(0)' : 'translateX(-100%)'}; */
`;

export const Nav = styled.ul`
  width: 100%;
  padding: 0 16px;
`;

export const NavItem = styled.li`
  list-style: none;
  padding: 6px 0;

  .em-breve {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      padding: 6px;
      background-color: ${AZUL};
      color: ${BRANCO};
      font-size: 12px;
      font-weight: bold;
      border-radius: 16px;
    }
  }
`;

export const NavLink = styled.a`
  text-decoration: none;
  color: ${AZUL};
  font-size: 20px;
  font-weight: bold;
`;

export default Content;
