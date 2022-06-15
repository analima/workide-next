import styled from 'styled-components';
import { lighten } from 'polished';

import { AZUL, BRANCO, LARANJA } from '../../../../styles/variaveis';

export const Content = styled.div`
  > div {
    min-height: 400px;
    margin-top: 16px;
  }
`;

export const PerfilContainer = styled.div``;

export const ContentPerfilData = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 510px) {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
  }
`;

export const PerfilBody = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  flex-direction: column;
  padding-bottom: 0;

  span {
    color: ${LARANJA};
    margin-right: 8px;
  }

  @media (max-width: 478px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const PerfilInfo = styled.div`
  @media (max-width: 478px) {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
  }
`;

export const PerfilFoto = styled.div`
  img {
    width: 150px;
    height: 144px;
    border-radius: 50%;
    margin-top: -32px;
    object-fit: cover;

    @media (max-width: 478px) {
      margin: 16px 0;
    }
  }
`;

export const PerfilAvaliacao = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

export const PerfilSelos = styled.div`
  display: flex;

  svg {
    width: 28px;
    height: 28px;
  }
`;

export const PerfilFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 510px) {
    flex-direction: column;
  }
  @media (max-width: 478px) {
    justify-content: center;
  }
`;

export const GhostButton = styled.a`
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;
  height: 60px;
  padding: 16px 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid ${AZUL};
  color: ${AZUL};
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: ${BRANCO};
    background-color: ${AZUL};
    border-color: ${BRANCO};
  }
`;

export const BotaoCaptar = styled.a`
  padding: 16px 36px;
  color: ${BRANCO};
  background-color: ${AZUL};
  font-weight: bold;
  text-decoration: none;
  border-radius: 80px;
  text-align: center;

  &:hover {
    background-color: ${lighten(0.05, AZUL)};
    color: ${BRANCO};
  }
`;

export const EyeContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;

  button {
    border: none;
    background-color: transparent;
  }

  p {
    font-size: 12px;
    margin: 0;
    margin-left: 10px;
  }
`;

export const PorcentageCompleted = styled.h3`
  color: ${LARANJA};
  margin-top: 40px;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;
