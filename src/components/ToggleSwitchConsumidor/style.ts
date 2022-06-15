import styled from 'styled-components';
import { BRANCO, AZUL, VERDE } from '../../styles/variaveis';

type ButtonProps = {
  active: boolean;
  color: string;
};

export const Content = styled.div`
  background-color: ${BRANCO};

  .form-check-input {
    width: 120px;
    height: 47px;
    float: none;
    margin: 0 1rem;
    background-color: ${AZUL};
    border-color: ${AZUL};
    box-shadow: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");

    &:focus {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
    }

    &:checked {
      background-color: ${VERDE};
      border-color: ${VERDE};
      box-shadow: none;
    }
  }

  .container-buttons {
    display: flex;
    align-items: center;
    margin: 0 auto;
    justify-content: center;
  }
`;

export const TipoPerfil = styled.button<ButtonProps>`
  background-color: ${({ active, color }) => (active ? color : BRANCO)};
  color: ${({ active, color }) => (active ? BRANCO : color)};
  font-size: 20px;
  font-weight: bold;
  width: 136px;
  height: 64px;
  margin: 0 8px;
  border: none;
  border-radius: 16px;
  transition: all 200ms;
  `;
