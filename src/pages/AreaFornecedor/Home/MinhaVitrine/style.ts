import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AZUL, AZUL_60, BRANCO } from '../../../../styles/variaveis';

export const Content = styled.section`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .container {
    padding: 25px 0;
  }

  @media (max-width: 478px) {
    .header {
      display: flex;
      flex-direction: column;
    }
  }
`;

export const ContentButton = styled.div`
  display: flex;
  justify-content: flex-end;
    margin-top: 20px;

    @media (max-width: 478px) {
      margin-top: 0;
      justify-content: center;
    }
  `;

export const Button = styled(Link)`
 background-color: rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;
  padding: 16px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid ${AZUL};
  color: ${AZUL};
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;

  @media (max-width: 992px){
    width: 130px;
  }

  @media (max-width: 768px){
    width: 200px;
  }

  @media (max-width: 478px) {
    padding: 16px 20px;
  }

  &:hover {
    color: ${BRANCO};
    background-color: ${AZUL_60};
    border-color: ${BRANCO};
  }
`;