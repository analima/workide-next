import { AZUL, BRANCO, LARANJA, VERDE } from 'src/styles/variaveis';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${BRANCO};
  min-height: 100vh;
  border: 4px solid green;
`;

export const ContentFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 32px;
  padding: 16px 0;
  min-height: 100vh;

  h1 {
    text-align: center;
    background: -webkit-linear-gradient(${AZUL}, ${VERDE});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 39px;
  }

  h2 {
    font-size: 24px;
    color: #383838;
  }

  .content-input {
    display: flex;
    width: 100%;

    div {
      width: 100%;
      .form-control {
      }
    }
  }
`;

export const ButtonOrange = styled.button`
  padding: 16px 40px;
  font-weight: bold;
  color: ${BRANCO};
  background-color: ${LARANJA};
  border-radius: 8px;
  border: none;
  font-size: 12px;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
  }
`;

export const ContentButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;
