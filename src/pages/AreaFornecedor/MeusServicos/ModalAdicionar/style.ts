import { lighten } from 'polished';
import styled from 'styled-components';
import { AZUL, BRANCO } from '../../../../styles/variaveis';

export const Content = styled.section``;

export const FotoServico = styled.section`
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

export const CloseModal = styled.span`
  display: flex;
  justify-content: flex-end;
`;

export const Button = styled.button`
  padding: 16px 32px;
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

export const ModalServicoHeader = styled.div``;

export const ModalServicoBody = styled.div``;

export const ModalServicoFooter = styled.div``;
