import styled from 'styled-components';
import { BRANCO, AZUL } from '../../styles/variaveis';

interface ToggleProps{
  active: boolean;
}


export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  justify-content: center;
  align-items: center;
  display: flex;
  top: 0;
  left: 0;
  z-index: 2;
`;

export const Modal = styled.div`
  background-color: ${BRANCO};
  width: 21.8125rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 8px;

  h1{ 
    font-size: 2rem;
    color: ${AZUL};
    font-weight: bold;
  }

  div.container-toggle{ 
    width: 100%;
    display: flex;
    margin-top: 2rem;
    align-items: center;

    span{ 
      font-size: 1rem;
      margin-left: 1rem;
    }
  }
  div.container-button{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;
  }
`

export const ButtonToogle = styled.div<ToggleProps>`
  border: solid 1px ${props => props.active ? AZUL : BRANCO};
  background-color: ${props => props.active ? BRANCO : AZUL};
  border-radius: 3rem;
  padding: 0.3rem;
  display: flex;
  transition: all 400ms;
  cursor: pointer;
  width: 82px;
  align-items: center;
  
`

export const ToogleCircle = styled.button<ToggleProps>`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: ${props => props.active ? AZUL : BRANCO};
    transform: translateX(${props => props.active ? '0' : '44px'});
    border: none;
    transition: all 400ms;
`;

export const ButtonSave = styled.button`
  background-color: ${AZUL};
  color: ${BRANCO};
  font-weight: 400;
  font-size: 1.3rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
`;
