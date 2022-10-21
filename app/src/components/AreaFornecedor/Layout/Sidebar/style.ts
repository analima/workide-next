import { AZUL, BRANCO, LARANJA, LARANJA_80 } from 'src/styles/variaveis';
import styled from 'styled-components';

interface ISidebar {
  open: boolean;
  display: boolean;
}

export const Content = styled.div<ISidebar>`
  background-color: ${BRANCO};
  width: 340px;
  height: 100vh;
  position: absolute;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 8px 8px;
  border: 2px solid ${LARANJA_80};
  display: ${props => (props.display ? 'flex' : 'none')};
  padding: 48px 0;
  z-index: 999;
  overflow-y: auto;

  ::-webkit-scrollbar-track {
    background-color: #f4f4f4;
  }
  ::-webkit-scrollbar {
    width: 4px;
    background: #f4f4f4;
  }
  ::-webkit-scrollbar-thumb {
    background: ${LARANJA};
  }

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
`;

export const NavLink = styled.a`
  text-decoration: none;
  color: ${LARANJA};
  font-size: 20px;
  font-weight: bold;
  margin-left: 0px;
  padding: 0px;

  :hover {
    color: ${LARANJA};
    opacity: 0.8;
  }
`;

export const NavButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${LARANJA};
  font-size: 20px;
  font-weight: bold;
  padding: 0px;
  margin-left: 0px;

  &:hover {
    color: ${LARANJA};
    opacity: 0.8;
  }
`;

export const BotaoCaptar = styled.button`
  border-radius: 20px;
  background-color: ${AZUL};
  color: ${BRANCO};
  padding: 5px 15px;
  border: none;
  position: absolute;
  margin-left: 190px;
  font-size: 14px;
`;
