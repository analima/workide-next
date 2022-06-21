import styled from 'styled-components';
import { AZUL, BRANCO, CINZA_10 } from '../../../styles/variaveis';

export const Content = styled.section`
  .btn-acoes {
    display: flex;
    justify-content: flex-end;
  }
`;

export const GhostButton = styled.button`
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
    font-size: 12px;
  }
`;

export const FotoPerfil = styled.div`
  margin: 16px 0;
  display: flex;
  justify-content: center;
  object-fit: cover;

  label {
    border-radius: 8px;
    .overlay {
      border-radius: 8px;
    }
  }
`;

export const LinkFornecedor = styled.a`
  text-decoration: none;
  color: ${AZUL};
  font-weight: bold;
`;

export const Condicao = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: ${CINZA_10};
  margin-bottom: 16px;

  @media (max-width: 478px) {
    width: 100%;
    label {
      font-size: 12px;
    }
  }
`;
