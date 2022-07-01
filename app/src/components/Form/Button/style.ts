import styled from 'styled-components';
import { lighten } from 'polished';
import { FiLoader } from 'react-icons/fi';

import { AZUL, BRANCO, LARANJA } from '../../../styles/variaveis';

interface IButtonProps {
  color: 'primary' | 'ghost' | 'danger';
  size: 'medium';
}

export const Content = styled.button<IButtonProps>`
  padding: 16px 40px;
  font-weight: bold;
  color: ${BRANCO};
  background-color: ${AZUL};
  border-radius: 8px;
  border: 1px solid ${AZUL};
  font-size: 12px;
  text-decoration: none;
  transition: background-color 0.2s;

  ${({ color }) =>
    color === 'ghost' &&
    `
    color: ${AZUL};
    background-color: transparent;
  `}

  ${({ color }) =>
    color === 'danger' &&
    `
    color: ${BRANCO};
    background-color: ${LARANJA};
    border: 1px solid ${LARANJA};
  `}

  &:hover {
    background-color: ${props => lighten(0.1, AZUL)};
    color: ${BRANCO};

    ${({ color }) =>
      color === 'ghost' &&
      `
      color: ${AZUL};
      background-color: ${BRANCO};
    `}

    ${({ color }) =>
      color === 'danger' &&
      `
      color: ${BRANCO};
      background-color: ${lighten(0.1, LARANJA)};
      border: 1px solid ${lighten(0.1, LARANJA)};
    `}
  }

  @media (max-width: 478px) {
    width: 100%;
    margin-top: 16px;
  }
`;

export const ButtonLabel = styled.span``;

export const ButtonIcon = styled(FiLoader)`
  margin: 0 14px;
`;
