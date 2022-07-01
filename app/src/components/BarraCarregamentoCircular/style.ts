import { CINZA_20 } from './../../styles/variaveis';
import styled from "styled-components";
import { AZUL } from "../../styles/variaveis";

export const Container = styled.div`

  border: 16px solid ${CINZA_20}; 
  border-top: 16px solid ${AZUL}; 
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 1.5s linear infinite;


@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;