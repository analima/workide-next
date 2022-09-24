import styled from 'styled-components';
import { AZUL, BRANCO, LARANJA } from '../../../../styles/variaveis';

type PropsCard = {
  isProvider?: boolean;
};

export const CardStyled = styled.a<PropsCard>`
  cursor: pointer;
  width: 100%;
  height: 160px;
  background-color: ${props => (props.isProvider ? AZUL : LARANJA)};
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-decoration: none;
  cursor: pointer;

  h2 {
    margin-top: 18px;
    color: ${BRANCO};
    font-size: 15px;
    font-family: 'Renner', sans-serif !important;
    font-weight: 700;
  }

  img {
    width: 70px;
    margin-bottom: 5px;
  }

  @media (max-width: 520px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 120px;
    height: 120px;
    padding: 8px;

    h2 {
      text-align: center;
    }

    img {
      width: 60px;
      margin-bottom: 0;
    }
  }

  @media (max-width: 370px) {
    height: 88px;
    padding: 5px;

    h2 {
      font-size: 10px;
      margin-top: 5px;
    }

    img {
      width: 48px;
    }
  }
`;
