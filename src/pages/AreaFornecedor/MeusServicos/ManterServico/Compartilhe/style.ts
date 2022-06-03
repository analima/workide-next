import { lighten } from 'polished';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AZUL, BRANCO } from '../../../../../styles/variaveis';

export const Content = styled.div`
  .social {
    display: flex;
    justify-content: center;
  }
`;

export const Button = styled.button`
  padding: 16px 40px;
  font-weight: bold;
  color: ${BRANCO};
  background-color: ${AZUL};
  border-radius: 8px;
  border: none;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: ${lighten(0.1, AZUL)};
    color: ${BRANCO};
  }

  @media (max-width: 478px) {
    width: 100%;
    margin-top: 16px;
  }
`;

export const ButtonLink = styled(Link)`
  padding: 16px 40px;
  color: ${AZUL};
  background-color: none;
  border: none;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: none;
    color: ${AZUL};
  }

  @media (max-width: 478px) {
    width: 100%;
    margin-top: 16px;
  }
`;
