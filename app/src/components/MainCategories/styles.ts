import styled from 'styled-components';
import { BRANCO, LARANJA, PRETO_10 } from '../../styles/variaveis';

export const Content = styled.section`
  background-color: ${BRANCO};

  h1 {
    text-align: center;
    font-weight: 400;
    font-size: 39px;
    color: ${PRETO_10};
  }

  span {
    display: block;
    color: ${PRETO_10};
    text-align: center;

    a {
      text-decoration: none;
    }
  }

  @media (max-width: 768px) {
    padding: 0px 20px;

    h1 {
      font-size: 31px;
    }
  }

  @media (max-width: 478px) {
    padding: 0px 8px;

    h1 {
      text-align: left;
    }
  }
`;

export const ContentLabel = styled.div`
  max-width: 1200px;
  padding-top: 48px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 27px;

  @media (max-width: 991px) {
  }

  @media (max-width: 530px) {
    gap: 8px;
  }
`;

export const Label = styled.label`
  padding: 8px 24px;
  background-color: ${LARANJA};
  color: ${BRANCO};
  font-size: 24px;
  border-radius: 7px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
