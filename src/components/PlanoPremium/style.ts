import styled from 'styled-components';
import { AZUL, BRANCO } from '../../styles/variaveis';

export const Content = styled.div`
  display: flex;
  justify-content: center;
  min-height: 721px;
  min-width: 355px;
  background-color: ${BRANCO};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  cursor: pointer;
  padding: 40px 20px;
  margin-bottom: 25px;

  @media (max-width: 1200px) {
    min-width: 300px;
    width: 310px;
  }

  @media (max-width: 992px) {
    min-width: 355px;
    width: 355px;
  }

  .conteudo {
    width: 100%;
  }

  h3 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;

    span {
      color: ${AZUL};
      font-size: 61px;
      margin-left: 8px;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    width: 100%;
    li {
      padding: 5px 0;
    }
  }
`;

export const Field = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Check = styled.img`
  width: 25px;
`;
