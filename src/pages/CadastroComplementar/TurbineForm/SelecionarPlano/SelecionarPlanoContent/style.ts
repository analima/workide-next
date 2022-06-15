import styled from 'styled-components';
import { AZUL, BRANCO, LARANJA, VERDE } from '../../../../../styles/variaveis';
import { GhostButton } from '../../../../../components/GhostButton';

interface IPropButton {
  selected: boolean;
}

export const Container = styled.div`
  width: 100%;
`;
export const TituloGradiente = styled.h3`
  background: -webkit-linear-gradient(${AZUL}, ${VERDE});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 48px;
  font-weight: bold;

  @media (max-width: 478px) {
    text-align: center;
  }
`;

export const Subtitle = styled.span`
  font-size: 20px;
  font-weight: 700;
  margin-top: 10px;
  color: rgba(73, 73, 73, 0.8);
`;

export const ContainerPlans = styled.div`
  width: 100%;
  height: auto;
  border-radius: 8px;
  background-color: white;
  margin-top: 50px;
  padding: 16px 24px;
  overflow-x: auto;
`;

export const TablePlans = styled.table`
  width: 100%;
  min-width: 880px;

  thead tr,
  tbody tr {
    display: flex;
    width: 100%;
  }

  thead tr {
    height: 180px;
    align-items: flex-start;

    @media (max-width: 1200px) {
      height: 220px;
    }
  }

  tbody tr {
    height: 60px;
    td {
      :first-child {
        align-items: flex-start;
      }
    }
  }

  thead tr td,
  tbody tr td {
    width: 20%;
    padding: 0 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    img {
      width: 24px;
      height: 24px;
    }

    span.gratuito {
      color: ${VERDE};
    }

    span.estudante {
      color: rgba(73, 73, 73, 0.8);
    }

    span.pro {
      color: ${AZUL};
    }

    span.premium {
      color: ${LARANJA};
    }
  }
`;

export const GhostButtonPlano = styled(GhostButton)<IPropButton>`
  font-size: 16px;
  width: 167px;
  padding: 0;
  margin-bottom: 10px;
  background-color: ${props => (props.selected ? AZUL : BRANCO)};
  color: ${props => (props.selected ? BRANCO : AZUL)};
  transition: all 300ms;
`;

export const ContainerButtons = styled.div`
  width: 100%;
  margin-top: 64px;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 380px) {
    flex-direction: column-reverse;
    align-items: flex-end;
  }
`;

export const GhostButtonContinuar = styled(GhostButton)`
  color: ${BRANCO};
  background-color: ${AZUL};
  width: 218px;
  font-size: 20px;

  @media (max-width: 460px) {
    width: 190px;
  }
`;

export const GhostButtonVoltar = styled(GhostButton)`
  color: ${AZUL};
  background-color: ${BRANCO};
  width: 142px;
  margin-right: 50px;
  font-size: 20px;

  @media (max-width: 380px) {
    margin-right: 20px;
  }
  @media (max-width: 460px) {
    margin-right: 0;
    margin-top: 10px;
  }
`;
