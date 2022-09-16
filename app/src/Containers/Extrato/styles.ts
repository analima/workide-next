import { AZUL, BRANCO, PRETO_10 } from 'src/styles/variaveis';
import styled from 'styled-components';

interface IButtonProps {
  active: boolean;
}

export const Container = styled.div``;

export const Header = styled.div``;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 62px;

  select {
    width: 389px;
    height: 50px;
    border: 1px solid red;
  }
`;

export const ContentFilter = styled.div`
  width: 993px;
  display: flex;
  flex-direction: column;

  .content-buttons-filters {
    display: flex;
    align-items: center;
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
`;

export const ContentCardExtrato = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
