import styled from 'styled-components';
import { BRANCO, CINZA_10, CINZA_40, VERDE } from '../../styles/variaveis';

interface IStatusEtapa {
  concluida: boolean;
}

export const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;

  > div {
  }
`;

export const EtapasProjetoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;

  background-color: ${BRANCO};
  padding: 32px;
  border-radius: 8px;

  @media (max-width: 478px) {
    padding: 16px;
  }
`;

export const EtapasLista = styled.ul`
  list-style: none;
  padding: 0;
  color: ${CINZA_40};
`;

export const Etapa = styled.li`
  /* display: flex;
  justify-content: space-between; */
  margin-top: 62px;
`;

export const EtapaData = styled.span``;

export const EtapaDescricao = styled.span``;

export const EtapaStatus = styled.div<IStatusEtapa>`
  width: 24px;
  height: 24px;
  background-color: ${props => (props.concluida ? VERDE : CINZA_10)};
  border-radius: 50%;
`;
