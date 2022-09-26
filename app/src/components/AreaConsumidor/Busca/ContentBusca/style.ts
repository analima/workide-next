import { lighten } from 'polished';
import styled from 'styled-components';
import { AZUL, BRANCO, PRETO_10 } from '../../../../styles/variaveis';

const Content = styled.section``;

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin: 0;
  }

  @media (max-width: 900px) {
    position: static;
  }
`;

export const Button = styled.button`
  background-color: ${AZUL};
  transition: all 0.2s ease-in-out;
  padding: 16px 40px;
  margin: 0;
  width: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: none;
  color: ${BRANCO};
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: ${lighten(0.1, AZUL)};
  }

  @media (max-width: 991px) {
    margin: 8px 0;
  }

  @media (max-width: 350px) {
    width: 100%;
  }
`;

export const ContentFilterHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  padding: 8px 34px;

  .label-busca {
    font-size: 28px;
    font-weight: bold;
    color: #767676;
  }

  .content-filters {
    display: flex;
    gap: 30px;
    justify-content: space-between;
    width: 100%;

    .search {
      display: flex;
      flex: 1;

      .input {
        width: 100%;
        background: #d9d9d9;
        border-radius: 18px;
      }
    }
  }
  .filter-check {
    display: flex;
    gap: 24px;
  }

  .check {
    display: flex;
    align-items: center;
    gap: 10px;

    label {
      font-size: 18px;
      color: #767676;
      font-weight: 500;
    }
  }

  @media (max-width: 768px) {
    padding: 8px;
    .content-filters {
      flex-direction: column;
      gap: 0px;
    }
  }

  @media (max-width: 478px) {
    display: flex;
    flex-direction: column;

    .filter-check {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
  }
`;

export const ContentFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;

  p {
    margin: 0;
  }
`;

export const FiltrosAplicados = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

export const Label = styled.span`
  background-color: ${AZUL};
  border-radius: 24px;
  padding: 4px 12px;
  font-size: 12px;
  text-align: center;
  color: ${BRANCO};
  font-weight: bold;
  margin-right: 4px;
`;

export const ButtonClear = styled.button`
  padding: 10px;
  font-weight: bold;
  color: ${AZUL};
  background-color: ${BRANCO};
  border-radius: 8px;
  border: 1px solid ${AZUL};
  font-size: 12px;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${AZUL};
    color: ${BRANCO};
  }

  @media (max-width: 478px) {
    width: 100%;
    margin-top: 16px;
    margin-bottom: 8px;
  }
`;

export default Content;
