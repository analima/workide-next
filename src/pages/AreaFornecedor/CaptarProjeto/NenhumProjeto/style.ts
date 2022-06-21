import styled from 'styled-components';

export const Content = styled.div``;

export const TextoNenhumProjeto = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 0 32px 0 147px;

  h2 {
    margin: 16px;
  }

  @media (max-width: 478px) {
    padding: 0 0;
  }
`;

export const ContainerAntonio = styled.div`
  display: flex;

  @media (max-width: 478px) {
    justify-content: center;
  }
`;
