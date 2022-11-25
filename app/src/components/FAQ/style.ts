import { Accordion, Row } from 'react-bootstrap';
import styled from 'styled-components';
import {
  AZUL,
  AZUL_60,
  BRANCO,
  BRANCO_GELO,
  CINZA_20,
  CINZA_40,
} from '../../styles/variaveis';

export const Content = styled.div``;

export const RowCentered = styled(Row)`
  display: flex;
  justify-content: center;
`;

export const Subtitulo = styled.h2`
  font-size: 16px;
  font-weight: bold;
  color: ${CINZA_40};
`;

export const ContainerFilterTags = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
`;

export const FilterTags = styled.div<{ selected: boolean }>`
  border: 1px solid ${AZUL_60};
  color: ${props => (props.selected ? BRANCO : AZUL_60)};
  background-color: ${props => (props.selected ? AZUL_60 : 'transparent')};
  padding: 4px 12px;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
`;

export const ContainerFilterTopics = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

export const FilterTopicCard = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 288px;
  height: 93px;

  background-color: ${props => (props.selected ? BRANCO_GELO : BRANCO)};

  font-size: 12px;
  font-weight: bold;
  color: ${CINZA_40};
  cursor: pointer;

  box-shadow: ${props =>
    props.selected ? '0px 0px 8px rgba(0, 0, 0, 0.1)' : 'none'};
  transition: all 0.3s ease-in-out;
`;

export const ContainerPost = styled(Accordion)``;

export const PostItem = styled.div`
  background: ${BRANCO};
  margin-bottom: 24px;
  padding: 18px 27px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const PostFaqCardBody = styled(Accordion.Collapse)`
  margin-top: 10px;

  p {
    color: ${CINZA_40};
  }
`;

export const ContainerTagPost = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const TagItemPost = styled.p`
  color: ${AZUL} !important;
`;

export const ContentButton = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 578px) {
    width: 50%;
    min-width: 90px;
    max-width: 150px;
    margin: 10px auto;
  }
`;

export const Button = styled.button`
  padding: 16px 40px;
  cursor: pointer;
  font-weight: bold;
  color: ${AZUL};
  background-color: ${BRANCO};
  border-radius: 8px;
  border: 1px solid ${AZUL};
  font-size: 12px;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${AZUL};
    color: ${BRANCO};
  }

  @media (max-width: 478px) {
    width: 100%;
    margin-top: 16px;
  }
`;
