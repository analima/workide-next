import { lighten } from 'polished';
import styled from 'styled-components';
import { AZUL, BRANCO } from '../../../../../styles/variaveis';

const Content = styled.div``;

export const ContainerHeader = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  grid-gap: 25px;

  p {
    margin: 0;
  }
`;

type Props = {
  quantidadeItem: number;
};

export const CardContainer = styled.div<Props>`
  display: ${props => (props.quantidadeItem > 3 ? 'grid' : 'flex')};
  place-items: center;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-gap: 32px;
`;

export const Button = styled.button`
  background-color: ${AZUL};
  transition: all 0.2s ease-in-out;
  padding: 16px 40px;
  margin: 0;
  width: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: none;
  color: ${BRANCO};
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: ${lighten(0.1, AZUL)};
  }

  @media (max-width: 991px) {
    margin: 8px 0;
  }

  @media (max-width: 350px) {
    width: 100%;
  }
`;

export default Content;
