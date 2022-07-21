import styled from 'styled-components';
import { AZUL, BRANCO, VERDE, PRETO } from '../../../styles/variaveis';

export const Content = styled.section`
  padding-top: 220px;
  background: -webkit-linear-gradient(${BRANCO}, ${BRANCO});
  text-align: center;
  
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 665px;
    height: 300px;
    
    @media (max-width: 600px){
      width: 95%;
      height: auto;
    }
  }
  
  h1 {
    font-size: 48px;
    font-weight: bold;
    background: -webkit-linear-gradient(${AZUL}, ${VERDE});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 24px;
  }
  
  p {
    font-size: 16px;
    background: -webkit-linear-gradient(${AZUL}, ${VERDE});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  strong {
    font-size: 12px;
    background: -webkit-linear-gradient(${AZUL}, ${VERDE});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  h2 {
    color: ${BRANCO};
    font-weight: bold;
  }
  
  .busca {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${BRANCO};
    
    a {
      color: ${BRANCO};
      font-size: 10px;
      font-weight: bold;
    }
  }
  
  input {
    color: ${BRANCO};
    border-color: ${BRANCO};
    background-color: rgba(255, 255, 255, 0.3);
    font-size: 1.2rem;
    padding: 1rem;
    border-radius: 8px;
    
    &::placeholder {
      color: ${BRANCO};
      font-weight: lighter;
    }
    
    &:focus {
      color: ${BRANCO};
      background-color: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.8);
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset,
      0 0 8px rgba(255, 255, 255, 0.6);
      outline: 0 none;
    }
  }
  
  button {
    margin-top: 24px;
    background-color: ${AZUL};
    color: ${BRANCO};
    padding: 16px 40px;
    font-weight: bold;
    border-radius: 8px;
    
    @media (max-width: 600px){
      width: 80%;
    }
    
  }
  
  @media (max-width: 991px) {
    background-image: linear-gradient(${AZUL}, ${VERDE});
    padding-bottom: 3rem;
    
    h1 {
      font-size: 61px;
      font-weight: bold;
      background: none;
      color: ${BRANCO};
      -webkit-text-fill-color: ${BRANCO};
    }
    
    p {
      max-width: 500px;
      background: none;
      color: ${BRANCO};
      -webkit-text-fill-color: ${BRANCO};
    }
  }
  
  .help-block{
    width: 500px;
    color: ${PRETO};
  }
  
  .sucesso-block{
    width: 500px;
    color: blue;
  }
  `;
