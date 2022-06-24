import styled from 'styled-components';
import { AZUL, CINZA_10 } from '../../../../../styles/variaveis';

const Container = styled.div`
  ul {
    list-style: none;
    padding: 0;
  }

  .resultados {
    font-size: 10px;
    margin-top: 16px;
  }
`;

export const Grupo = styled.div`
  margin-top: 24px;
`;

export const GrupoResultado = styled.div`
  border: 1px solid ${CINZA_10};
  border-radius: 4px;
  padding: 8px 32px;
  max-height: 320px;
  overflow-y: scroll;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SubAreaContainer = styled.div`
  padding: 8px 0;

  span {
    font-size: 16px;
    font-weight: bold;
    color: ${AZUL};
  }
`;

export const SubAreaItem = styled.div`
  display: flex;
  padding: 8px 0;
`;

export default Container;
