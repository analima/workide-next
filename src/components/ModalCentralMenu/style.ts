import styled from 'styled-components';

import { AZUL, BRANCO, LARANJA } from '../../styles/variaveis';

export const Content = styled.div``;

export const ContentHeader = styled.div`
  padding-top: 25px;
  padding-bottom: 40px;
`;

export const ContentFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 240px;
  margin-top: 30px;
  margin-bottom: 40px;
`;
export const MenuProvider = styled.div``;
export const CardsProvider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;

  .cards {
    display: flex;
    flex-wrap: wrap;
    width: 160px;
  }

  @media (max-width: 520px) {
    align-items: center;
    justify-content: center;
    gap: 8px;

    .cards {
      margin-bottom: 16px;
      width: 100px;
      height: 100px;
    }
  }

  @media (max-width: 370px) {
    .cards {
      width: 80px;
      height: 80px;
    }
  }
`;

export const ContainerModal = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
`;

export const ContentProvider = styled.div``;

export const ContentMenuProvider = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: 23% 74%;
  margin-top: 10px;
  gap: 17px;
`;

export const ContentConsumer = styled.div``;

type PropsMenu = {
  isProvider?: boolean;
};

export const ItemMenu = styled.div<PropsMenu>`
  background-color: ${props => (props.isProvider ? LARANJA : AZUL)};
  border-radius: 4px;
  color: ${BRANCO};
  padding: 5px;
  font-weight: bold;
  margin-bottom: 8px;
  cursor: pointer;

  @media (max-width: 472px) {
    font-size: 12px;
    text-align: center;
  }
`;
