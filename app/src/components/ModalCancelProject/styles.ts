import styled from 'styled-components';
import { AZUL_60, BRANCO, LARANJA, PRETO_60 } from '../../styles/variaveis';

export const Text = styled.p`
  color: ${PRETO_60};
`;

export const Container = styled.div`
  width: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;

  strong {
    color: ${PRETO_60};
  }
`;

export const TitleModal = styled.span`
  font-size: 25px;
  font-weight: bold;
  color: ${PRETO_60};
  margin-bottom: 16px;
`;

type Props = {
  color: string;
  recused?: boolean;
};

export const ButtonMainStyled = styled.button<Props>`
  background-color: ${props =>
    props.color !== 'DEFAULT' ? props.color : '#FFF'};
  transition: all 0.2s ease-in-out;
  padding: 16px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid
    ${props => (props.color !== 'DEFAULT' ? props.color : AZUL_60)};
  color: ${props => (props.color !== 'DEFAULT' ? BRANCO : AZUL_60)};
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;

  &:hover {
    color: ${props => (props.color !== 'DEFAULT' ? AZUL_60 : BRANCO)};
    color: ${props => props.recused && LARANJA};
    background-color: ${props =>
      props.color !== 'DEFAULT' ? BRANCO : AZUL_60};
  }

  @media (max-width: 478px) {
    width: 100%;
    font-size: 12px;
  }
`;

export const ContainerButtons = styled.div`
  display: flex;
  width: 100%;
  margin-top: 16px;
  gap: 48px;
  justify-content: flex-end;
`;
