import styled from 'styled-components';
import { AZUL } from '../../../../styles/variaveis';

interface Props {
  reputacao?: boolean;
}

const Content = styled.section``;

export const Scroll = styled.div<Props>`
  height: ${props => (props.reputacao ? '400px' : 'auto')};

  overflow: scroll;
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  -ms-overflow-style: none; /* IE 10+ */
  scrollbar-width: none; /* Firefox */
`;

export const BordaAzul = styled.div`
  padding: 24px;
  border: solid 1px ${AZUL};
  border-radius: 8px;
  margin-top: 34px;
`;

export const SolicitarRecomendacao = styled.a`
  text-decoration: none;
  color: ${AZUL};
`;

export default Content;
