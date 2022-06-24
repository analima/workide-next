import styled from 'styled-components';
import {
  AZUL_70,
  CINZA_20,
  CINZA_30,
  CINZA_40,
  PRETO,
} from '../../../../styles/variaveis';

const Content = styled.section`
  padding: 0px;
  margin: 0px;
`;

export const Container = styled.div`
  padding: 0px;
  margin: 0px;
`;

export const ActiveMoreInfos = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InformacaoContainer = styled.div`
  padding: 32px;
  border: solid 1px ${AZUL_70};
  border-radius: 8px;
  margin: 8px 0px;
  height: 624px;

  .info-certifications {
    overflow-y: scroll;
    margin-top: 8px;

    ::-webkit-scrollbar {
      display: none;
    }

    > span {
      display: flex;
      padding: 5px 10px;
      border: 1px solid ${CINZA_20};
      color: ${CINZA_40};
      border-radius: 6px;
      font-weight: 100;
      font-size: 0.8em;

      & + span {
        margin-top: 4px;
      }
    }
  }

  .info-skills {
    height: 90%;
    overflow-y: scroll;
    margin-top: 8px;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const Profissoes = styled.div``;

export const GrayParagraph = styled.p`
  color: ${CINZA_40};

  @media (max-width: 478px) {
    text-align: center;
  }
`;

export const GrayParagraphSmall = styled.p`
  color: ${CINZA_40};
  font-size: 0.9em;

  @media (max-width: 478px) {
    text-align: center;
  }
`;

export const LabelContainer = styled.div`
  height: 310px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 478px) {
    text-align: center;
  }
`;

export const LabelPrimary = styled.p`
  margin: 4px;
  color: ${PRETO};
  font-size: 12px;
  font-weight: bold;
`;

export const LabelDefaultContainer = styled.div`
  height: 500px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 478px) {
    text-align: center;
  }
`;

export const LabelDefault = styled.label`
  padding: 3px 10px;
  border: solid 1px ${CINZA_30};
  border-radius: 4px;
  margin: 4px;
  color: ${CINZA_40};
  font-size: 12px;
`;

export const InfoSection = styled.div<{ height?: number }>`
  height: ${props => (props.height ? props.height + 'px' : '340px')};
  overflow-y: scroll;
  margin-bottom: 32px;

  ::-webkit-scrollbar {
    display: none;
  }

  .info-curso {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    padding: 5px;
    border: 1px solid ${CINZA_20};
    border-radius: 8px;

    strong {
      color: ${CINZA_40};
      margin-bottom: 16px;
    }

    span {
      color: ${CINZA_40};
      margin-bottom: 16px;
    }

    & + div {
      margin-top: 8px;
    }
  }
`;

export const ContainerLanguages = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Content;
