import styled from 'styled-components';
import { LARANJA, PRETO_10 } from '../../styles/variaveis';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: contain;
  }

  div {
    p {
      font-size: 18px;
      font-weight: bold;
      color: ${PRETO_10};
      opacity: 0.8;
      margin: 0;
    }
  }

  @media (max-width: 600px) {
    div {
      p {
        font-size: 16px;
      }
    }
  }
`;

export const Avaliacao = styled.div`
  display: flex;
  align-items: center;

  span {
    color: ${LARANJA};
    margin-right: 8px;
  }

  svg {
    width: 22px;
    height: 22px;
  }
`;
