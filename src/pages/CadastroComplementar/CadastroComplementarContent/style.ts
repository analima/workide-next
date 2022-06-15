import styled from 'styled-components';
import { AZUL, PRETO_40, VERDE } from '../../../styles/variaveis';

interface IButtonProps {
  selected: boolean;
}

export const Container = styled.div`
  .nav-link {
    height: 47px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
  }

  .nav-itens {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    margin-top: 10px;
    font-size: 12px;

    @media (max-width: 440px) {
      flex-direction: column;
      gap: 4px;
    }
  }
  .aba-ja-preenchida {
    flex: 1;

    a {
      text-align: center;
      border-radius: 4px;
      background-color: ${VERDE} !important;
      color: #fff;

      @media (max-width: 768px) {
        font-size: 14px;
      }
    }
  }

  .aba-selecionada {
    flex: 1;

    a {
      text-align: center;
      border-radius: 4px;
      color: #fff;
      background-color: ${AZUL} !important;

      @media (max-width: 768px) {
        font-size: 12px;
      }
    }
  }

  .aba-nao-selecionada {
    flex: 1;

    a {
      text-align: center;
      border-radius: 4px;
      background-color: ${PRETO_40};
      color: #fff;

      @media (max-width: 768px) {
        font-size: 12px;
      }
    }
  }
`;

export const NavButton = styled.button<IButtonProps>`
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 100%;
  border: none;
  background-color: ${props => (props.selected ? AZUL : PRETO_40)};
  color: #fff;
`;

export const Content = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`;
