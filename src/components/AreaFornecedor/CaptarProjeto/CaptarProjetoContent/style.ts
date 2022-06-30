import { Accordion } from 'react-bootstrap';
import styled from 'styled-components';
import { AZUL, BRANCO } from '../../../../styles/variaveis';

const Content = styled.section`
  .form-switch {
    font-weight: bold;
    color: ${AZUL};
    margin: 32px 0 16px;
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

  @media (max-width: 478px) {
    width: 100%;
    margin-top: 16px;
    margin-bottom: 8px;
  }
`;

export const AcordeonContent = styled(Accordion)`
  display: none;

  @media (max-width: 991px) {
    display: block;
  }
`;

export const AcordeonToggle = styled(Accordion.Toggle)`
  border: 0;
`;

export const FiltroTelaCheia = styled.div`
  @media (max-width: 991px) {
    display: none;
  }
`;

export default Content;
