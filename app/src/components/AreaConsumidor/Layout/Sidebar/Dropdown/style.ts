import styled from 'styled-components';
import { AZUL, PRETO_10 } from '../../../../../styles/variaveis';

interface IDropdown {
  open: boolean;
}

const Content = styled.div<IDropdown>`
  svg {
    transition: transform 0.2s ease-in-out;
    transform: ${props => (props.open ? 'rotate(180deg)' : 'rotate(0deg)')};
  }
`;

export const TituloDropdown = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${AZUL};
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

export const NavDropdown = styled.div<IDropdown>`
  display: ${props => (props.open ? 'block' : 'none')};

  button {
    background: transparent;
    border: none;
    display: block;
    margin-top: 8px;
    color: ${PRETO_10};

    &:hover {
      font-size: 18px;
      color: ${AZUL};
    }

    &.ativo {
      font-weight: bold;
    }
  }
`;

export const NavDropdownItem = styled.a`
  display: flex;
  flex-direction: column;
  padding: 6px 16px;
  text-decoration: none;
  color: ${PRETO_10};

  &:hover {
    font-size: 18px;
    color: ${AZUL};
  }

  &.ativo {
    font-weight: bold;
  }
`;

export const NavDropdownButton = styled.button`
  display: flex;
  flex-direction: column;
  padding: 6px 16px;
  text-decoration: none;
  color: ${PRETO_10};
  border: none;
  background-color: transparent;

  &:hover {
    font-size: 18px;
  }

  &.ativo {
    font-weight: bold;
  }
`;

export default Content;
