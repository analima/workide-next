import { Accordion } from 'react-bootstrap';
import styled from 'styled-components';
import { AZUL, BRANCO } from '../../../../styles/variaveis';

const Content = styled.section`
  .form-switch {
    font-weight: bold;
    color: ${AZUL};
    margin: 32px 0 16px;

    @media (max-width: 400px) {
      font-size: 16px;
    }
  }
`;

export const ContentFilterHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  padding: 16px 34px;
  gap: 8px;

  .label-busca {
    font-size: 28px;
    font-weight: bold;
    color: #767676;
  }

  .content-filters {
    display: flex;
    gap: 40px;
    justify-content: space-between;
    width: 100%;

    .check {
      display: flex;

      label {
        margin-right: 16px;
        font-size: 18px;
      }
    }

    .search {
      display: flex;
      width: 800px;
      flex: 1;

      .input-search {
        width: 100%;
        background: #d9d9d9;
        border-radius: 18px;
      }
    }
  }

  .check {
    display: flex;
    align-items: center;
    gap: 24px;

    label {
      font-size: 18px;
      color: #767676;
      font-weight: 500;
    }
  }

  .filter-footer {
    display: flex;
    width: 100%;
    justify-content: space-between;

    .ordenacao {
      width: 100%;
    }

    .favorito {
      background-color: ${AZUL};
    }
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
    .content-filters {
      gap: 16px;

      .search {
        display: flex;
        width: 100%;
        flex: 1;

        .input-search {
          width: 100%;
          background: #d9d9d9;
          border-radius: 18px;
        }
      }
    }

    .filter-footer {
      .ordenacao {
        width: 100%;
      }

      .favorito {
        background-color: ${AZUL};
      }
    }
  }

  @media (max-width: 478px) {
    display: flex;
    flex-direction: column;

    .content-filters {
      flex-direction: column;
    }

    .filter-check {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
  }
`;

export const Button = styled.button`
  padding: 16px;
  width: 142px;
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

  @media (max-width: 900px) {
    margin: 10px 0;
  }

  @media (max-width: 578px) {
    padding: 10px;
  }
`;

export const AcordeonContent = styled(Accordion)`
  display: none;
  margin-left: 10px;

  @media (max-width: 900px) {
    display: block;
  }
`;

export const AcordeonToggle = styled(Accordion.Toggle)`
  border: 0;
`;

export const FiltroTelaCheia = styled.div`
  display: flex;
`;

export const ContainerFiltro = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 900px) {
    flex-direction: column;
  }
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

export const FiltrosAplicados = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

export const ContentFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  width: 100%;

  button {
    padding: 16px;
    width: auto;
  }

  @media (max-width: 578px) {
  }

  p {
    margin: 0;
  }
`;

export default Content;
