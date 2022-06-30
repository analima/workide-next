import styled from 'styled-components';
import { BRANCO, CINZA_10, LARANJA } from '../../../../../styles/variaveis';

interface BarraProps {
  porcentagem: number;
}

const Content = styled.article`
  margin-top: 2rem;
`;

export const Resumo = styled.div`
  display: flex;

  @media (max-width: 414px) {
    flex-direction: column;

    > * + * {
      margin-top: 1rem;
    }
  }
`;

export const Avaliacao = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;

  span {
    font-size: 48px;
    font-weight: bold;
  }

  small {
    font-size: 12px;
    font-weight: bold;
  }

  @media (max-width: 414px) {
    width: 100%;
  }
`;

export const Detalhes = styled.div`
  flex: 1;
`;

export const Detalhe = styled.div`
  margin: 8px 0;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Estrelas = styled.div`
  width: 110px;

  * + * {
    margin-left: 4px;
  }
`;

export const Barra = styled.div<BarraProps>`
  background-color: ${CINZA_10};
  height: 16px;
  flex: 1;
  margin-left: 1rem;
  border-radius: 8px;

  div {
    background-color: ${LARANJA};
    height: 16px;
    border-radius: 8px;
    width: ${props => props.porcentagem}%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    span {
      font-size: 11px;
      color: ${BRANCO};
      text-align: start;
      margin-left: 20px;
    }
  }
`;

export const Quantidade = styled.div`
  font-size: 0.8rem;
  display: flex;
  justify-content: flex-end;
`;

export default Content;
