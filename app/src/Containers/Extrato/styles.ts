import { AZUL, BRANCO, PRETO_10 } from 'src/styles/variaveis';
import styled from 'styled-components';

interface IButtonProps {
  active: boolean;
}

export const Container = styled.div``;

export const Header = styled.div`
  width: 100%;

  @media (max-width: 768px) {
    h2:first-child {
      font-size: 24px;
    }

    h2:last-child {
      font-size: 16px;
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 62px;

  select {
    width: 389px;
    height: 50px;
  }
`;

export const ContentFilter = styled.div`
  width: 993px;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  .content-buttons-filters {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    div {
      > select {
        max-width: 180px;
      }
    }

    .calendar {
      display: flex;
      align-items: flex-end;
      gap: 16px;
    }
  }

  @media (max-width: 1199px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    select {
      width: 100%;
    }
    .content-buttons-filters {
      margin-top: 16px;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;

      .calendar {
        flex-direction: row-reverse;
      }
    }
  }
`;

export const Main = styled.div`
  width: 993px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  @media (max-width: 1199px) {
    width: 100%;
  }
`;

export const ContentCardExtrato = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ButtonFilter = styled.button<IButtonProps>`
  background-color: ${props => (props.active ? AZUL : 'transparent')};
  border: solid 1px ${props => (props.active ? BRANCO : AZUL)};
  border-radius: 24px;
  color: ${props => (props.active ? BRANCO : AZUL)};
  padding: 4px 12px;
  font-size: 16px;
  transition: all 400ms;
  margin: 0 5px;
`;

export const ContentEntendaMelhor = styled.div`
  width: 100%;

  span {
    color: ${PRETO_10};
    font-weight: 700;
    font-size: 12.8px;
  }

  p {
    font-size: 12.8px;
    color: ${PRETO_10};
  }
`;

export const ContentButton = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 16px;
`;
