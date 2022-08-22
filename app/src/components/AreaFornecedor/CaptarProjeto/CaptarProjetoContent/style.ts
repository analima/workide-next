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
    margin: 10px auto;
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

export default Content;
