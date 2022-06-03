import { lighten } from 'polished';
import styled from 'styled-components';
import { AZUL, BRANCO, PRETO_40, VERDE } from '../../../../../styles/variaveis';

interface IButtonProps {
  color: string;
}

export const Content = styled.section`
  .aba-ja-preenchida {
    a {
      background-color: ${VERDE} !important;
    }
  }

  .aba-selecionada {
    a {
      background-color: ${AZUL} !important;
    }
  }

  .aba-nao-selecionada {
    a {
      background-color: ${PRETO_40};
    }
  }

  .nav {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;

    .nav-item {
      width: 350px;
      margin-bottom: 15px;

      a {
        text-align: center;
        padding: 12px 32px;
        color: ${BRANCO};
        font-weight: bold;
        border-radius: 8px;
      }
    }
  }

  .btn-acoes {
    display: flex;
    justify-content: flex-end;

    button {
      margin: 0 8px;
    }
  }

  @media (max-width: 768px) {
    .nav {
      display: flex;
      justify-content: center;
      margin-top: 16px;

      .nav-item {
        width: 100%;

        a {
          text-align: center;
          padding: 12px 32px;
          color: ${BRANCO};
          font-weight: bold;
          border-radius: 8px;
          margin-top: 16px;
        }
      }
    }
  }
`;

export const NavButton = styled.button<IButtonProps>`
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  width: 100%;
  border: none;
  background-color: ${props => props.color};
  color: #fff;
`;
export const GhostButton = styled.button`
  text-align: -webkit-center;
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;
  padding: 16px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid ${AZUL};
  color: ${AZUL};
  font-weight: bold;

  &:hover {
    color: ${BRANCO};
    background-color: ${AZUL};
    border-color: ${BRANCO};
  }

  @media (max-width: 478px) {
    /* width: 100%; */
    font-size: 12px;
  }
`;

export const Button = styled.button`
  padding: 16px 40px;
  font-weight: bold;
  color: ${BRANCO};
  background-color: ${AZUL};
  border-radius: 8px;
  border: none;

  &:hover {
    background-color: ${lighten(0.1, AZUL)};
  }

  svg {
    margin-left: 16px;
  }

  @media (max-width: 478px) {
    width: 100%;
    margin-top: 16px;
  }
`;
