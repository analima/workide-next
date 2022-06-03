import { lighten } from 'polished';
import styled from 'styled-components';
import { AZUL, BRANCO } from '../../../../../styles/variaveis';

export const Content = styled.div`
  /* não pega os estilos :/ verificar depois */
`;

export const Button = styled.button`
  padding: 16px 32px 16px 42px;
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
  }
`;

export const ModalTitle = styled.h3`
  color: ${AZUL};
  font-weight: bold;
  margin-bottom: 32px;
`;

export const ModalLogo = styled.div`
  padding: 0 132px 0 132px;

  @media (max-width: 478px) {
    display: none;
  }
`;

export const CloseModal = styled.span`
  display: flex;
  justify-content: flex-end;
`;
