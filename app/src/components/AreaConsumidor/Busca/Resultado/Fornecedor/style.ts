import { lighten } from 'polished';
import styled from 'styled-components';
import { AZUL, BRANCO } from '../../../../../styles/variaveis';

const Content = styled.div`
  background-color: ${BRANCO};
  padding: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;

  .ordenation {
    display: flex;
    justify-content: center;
    gap: 16px;
    padding: 24px 0;

    .nivel {
      display: flex;
      align-items: center;
    }

    .avaliation {
      display: flex;
      align-items: center;
    }

    span {
      font-weight: 600;
      font-size: 16px;
      color: #767676;
      img {
        cursor: pointer;
      }
    }
  }
`;

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
  grid-template-columns: repeat(auto-fill, minmax(269px, auto));
  grid-gap: 8px;
  justify-items: center;
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
