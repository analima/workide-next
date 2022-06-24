import styled from 'styled-components';
import { PRETO_10 } from '../../../styles/variaveis';

const Cabecalho = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 1rem 0;

  em {
    font-style: normal;
    font-weight: bold;
  }

  @media (max-width: 414px) {
    flex-direction: column;

    a {
      margin: 16px 0;
      width: 100%;
    }
  }
`;

export const Cards = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 2rem 0;

  @media (max-width: 991px) {
    flex-direction: column;

    * + * {
      margin-top: 1rem;
    }
  }
`;

export const Contadores = styled.section``;

export const ContadoresTitulo = styled.h2`
  font-weight: bold;
  font-size: 32px;
  color: ${PRETO_10};
`;

export const ContadoresSubtitulo = styled.p`
  font-size: 1.5rem;
  color: ${PRETO_10};
`;

export default Cabecalho;
