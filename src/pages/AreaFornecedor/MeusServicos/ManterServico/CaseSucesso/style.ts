import { lighten } from 'polished';
import styled from 'styled-components';
import { AZUL, BRANCO } from '../../../../../styles/variaveis';

export const Content = styled.section`
  .acoes {
    display: flex;
    justify-content: end;

    svg {
      margin-left: 16px;
    }
  }
`;

export const ContainerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const ContainerButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
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

  @media (max-width: 478px) {
    width: 100%;
    margin-top: 16px;
  }
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
