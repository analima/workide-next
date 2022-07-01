import styled from 'styled-components';
import { AZUL, BRANCO, VERDE, VERMELHO } from '../../styles/variaveis';

interface OpenProps {
  open?: boolean;
  visible?: boolean;
}

export const Content = styled.div<OpenProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  select {
    margin-bottom: 18px;
  }

  span {
    color: ${AZUL};
    font-weight: bold;
    font-size: 14px;
  }

  p {
    font-size: 14px;
  }

  textarea {
    position: relative;
    width: 100%;
    height: 191px;
    border-radius: 4px;
    border: 1px solid #949494;
    color: #494949;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 10px;

    textarea:hover {
      background-color: green;
    }
  }

  svg:hover {
    opacity: 0.5;
    color: ${AZUL};
  }
`;

export const ContainerThais = styled.div`
  position: fixed;
  right: 15px;
  bottom: 16px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentThais = styled.a`
  cursor: pointer;
  background-color: ${BRANCO};
  border-radius: 16px;
  border: 2px solid ${AZUL};
  width: 80px;
  height: 80px;

  @media (max-width: 1200px) {
    width: 72px;
    height: 72px;
  }

  @media (max-width: 998px) {
    width: 64px;
    height: 64px;
  }

  @media (max-width: 600px) {
    #chat {
      width: 60px;
      height: 60px;
    }
  }

  @media (max-width: 500px) {
    #chat {
      width: 60px;
      height: 60px;
    }
  }

  @media (max-width: 400px) {
    #chat {
      width: 60px;
      height: 60px;
    }
  }
`;

export const Wrapper = styled.div<OpenProps>`
  position: fixed;
  margin: 0 96px 16px 0;
  bottom: 0;
  right: 25px;
  z-index: 9999;
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  width: 300px;
  height: 440px;
  background-color: ${BRANCO};
  padding: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 8px;

  @media (max-width: 400px) {
    right: 0px;
    width: 80%;
    left: 15px;
  }

  .content-data {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    input[type='file'] {
      display: none;
    }

    span {
      padding: 16px;
    }

    svg {
      color: ${AZUL};
      font-size: 20px;
      cursor: pointer;
      transition: 0.1s;
    }

    svg:hover {
      opacity: 0.5;
      color: ${AZUL};
    }
  }
`;

export const ContentFinish = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  justify-content: center;
  margin-top: 96px;
  font-size: 14px;
  color: #494949;

  > svg {
    top: 0;
    right: 0;
    position: absolute;
    margin: 4px;
  }

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-image: linear-gradient(#008fe5, #00c09e);
  }

  > h2 {
    margin-top: 16px;
    font-size: 48px;
    font-weight: 700;
    color: ${AZUL};
  }
`;

export const Button = styled.a`
  padding: 16px 40px;
  font-weight: bold;
  color: ${AZUL};
  background-color: ${BRANCO};
  border-radius: 8px;
  border: 1px solid ${AZUL};
  font-size: 12px;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${AZUL};
    color: ${BRANCO};
  }

  @media (max-width: 478px) {
    width: 100%;
    margin-top: 16px;
  }
`;

export const MsgSucess = styled.strong`
  color: ${VERDE};
  font-size: 12px;
  margin-top: 4px;
`;

export const MsgError = styled.strong`
  color: ${VERMELHO};
  font-size: 12px;
  margin-top: 4px;
`;
