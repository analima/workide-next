import { Accordion } from 'react-bootstrap';
import styled from 'styled-components';
import { BRANCO, PRETO_10 } from '../../styles/variaveis';

export const Container = styled.section`
  background-color: ${BRANCO};

  @media (max-width: 768px) {
    padding: 0 8px;
  }
`;

export const Content = styled.section`
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    text-align: center;
    font-size: 39px;
    color: ${PRETO_10};
  }

  .container {
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 31px;
    }
  }

  @media (max-width: 478px) {
    h1 {
      text-align: left;
    }
  }
`;

export const AccordionPrimary = styled(Accordion)`
  background-color: ${BRANCO};
  border-bottom: 1px solid #00000020;

  span {
    font-size: 20px;
    color: ${PRETO_10};
  }

  li {
    list-style: none;
    font-size: 16px;
    color: ${PRETO_10};
    padding-left: 8px;
  }

  @media (max-width: 768px) {
    span {
      font-size: 16px;
    }
  }
`;

export const AccordionSecondary = styled(Accordion.Toggle)`
  border: none;
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${BRANCO};
  width: 100%;

  span {
    font-size: 24px;
    color: ${PRETO_10};
  }

  @media (max-width: 768px) {
    span {
      font-size: 16px;
    }
  }
`;
