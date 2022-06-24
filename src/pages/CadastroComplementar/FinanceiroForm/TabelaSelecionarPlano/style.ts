import styled from 'styled-components';
import {
  AZUL,
  BRANCO,
  CINZA_40,
  LARANJA,
  VERDE,
} from '../../../../styles/variaveis';
import { GhostButton } from '../../../../components/GhostButton';

interface IPropButton {
  selected: boolean;
}

interface MensagemProps {
  mensagemEssencial: boolean;
}

const Container = styled.div`
  width: 100%;
  .overlay-prazo {
    background-color: red !important;
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
  margin-top: 24px;
  padding: 16px 24px;
  overflow-x: auto;
`;

export const TablePlans = styled.table<MensagemProps>`
  width: 100%;
  min-width: 880px;

  thead tr,
  tbody tr {
    display: flex;
    width: 100%;
  }

  thead tr {
    /* height: 180px; */
    height: 12rem;
    align-items: flex-start;

    @media (max-width: 1400px) {
      height: auto;
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

  .ajuda {
    display: flex;
    justify-content: center;

    span {
      svg {
        margin-left: 16px;
        z-index: 99999;
        cursor: pointer;
      }
    }
    .mensagem-essencial {
      position: absolute;
      margin-left: 200px;
      margin-top: 432px;
      width: 320px;
      border-radius: 8px;
      padding: 16px;
      background-color: ${CINZA_40};
      color: ${BRANCO};

      strong {
        font-size: 15px;
      }

      p {
        font-size: 15px;
      }
    }

    .mensagem-recebimento {
      position: absolute;
      margin-left: 200px;
      margin-top: 58px;
      max-width: 440px;
      border-radius: 8px;
      padding: 16px;
      background-color: ${CINZA_40};
      color: ${BRANCO};

      strong {
        font-size: 15px;
      }

      p {
        font-size: 15px;
      }
    }

    .mensagem-servico {
      position: absolute;
      margin-left: 200px;
      margin-top: 58px;
      max-width: 440px;
      border-radius: 8px;
      padding: 16px;
      background-color: ${CINZA_40};
      color: ${BRANCO};

      strong {
        font-size: 15px;
      }

      p {
        font-size: 15px;
      }
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

export const PrecoPlano = styled.h2`
  font-size: 24px;
  font-weight: 700;

  span {
    margin-right: 4px;
    font-size: 18px;
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

export const OverlayMessageFerramenta = styled.div`
  background: linear-gradient(
      0deg,
      rgba(73, 73, 73, 0.8),
      rgba(73, 73, 73, 0.8)
    ),
    linear-gradient(0deg, #ffffff, #ffffff);
  color: ${BRANCO};
  padding: 16px 12px;
  width: 400px;
  left: 550px;
  top: calc(50% + 30rem);

  font-size: 16px;
  line-height: 24px;

  border-radius: 8px;
  position: absolute;

  @media (min-width: 2150px) {
    left: 650px;
  }
  @media (min-width: 1950px) {
    left: 650px;
  }
  @media (max-width: 1700px) {
    left: 450px;
  }
  @media (max-width: 1550px) {
    left: 350px;
  }
  @media (max-width: 1000px) {
    left: 250px;
  }
  @media (max-width: 992px) {
    top: calc(50% + 50rem);
  }

  @media (max-width: 850px) {
    width: 250px;
  }
  @media (max-width: 480px) {
    top: calc(50% + 70rem);
    left: 50px;
  }
  @media (max-width: 440px) {
    top: calc(50% + 75rem);
    left: 50px;
  }
`;

export const OverlayMessagePrazo = styled(OverlayMessageFerramenta)`
  top: calc(50% + 50rem);
  width: fit-content;

  @media (max-width: 992px) {
    top: calc(50% + 75rem);
    width: 250px;
    left: 350px;
  }
  @media (max-width: 820px) {
    left: 250px;
  }
  @media (max-width: 770px) {
    left: 350px;
  }
  @media (max-width: 650px) {
    left: 250px;
  }
  @media (max-width: 500px) {
    left: 50px;
    top: calc(50% + 85rem);
  }
  @media (max-width: 440px) {
    left: 50px;
    top: calc(50% + 90rem);
  }

  @media (max-height: 770px) {
    top: calc(50% + 55rem);
  }
  @media (max-height: 640px) {
    top: calc(50% + 60rem);
  }
`;

export const OverlayMessageVoluntario = styled(OverlayMessageFerramenta)`
  top: calc(50% + 70rem);
  width: fit-content;

  @media (max-width: 1200px) {
    margin-top: 5rem;
  }

  @media (max-width: 992px) {
    margin-top: 25rem;
  }
  @media (max-width: 480px) {
    margin-top: 30rem;
  }

  @media (max-height: 840px) {
    top: calc(50% + 75rem);
  }
  @media (max-height: 680px) {
    top: calc(50% + 80rem);
  }
  @media (max-height: 510px) {
    top: calc(50% + 85rem);
  }
`;

export default Container;
