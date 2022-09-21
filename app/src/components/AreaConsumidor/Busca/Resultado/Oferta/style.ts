import { BRANCO } from 'src/styles/variaveis';
import styled from 'styled-components';

type Props = {
  isEmpty: boolean;
};

const Content = styled.div<Props>`
  display: grid;
  background-color: ${BRANCO};
  padding: 8px 8px 24px 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;

  .ordenation {
    display: flex;
    justify-content: center;
    gap: 16px;
    padding: 24px 0;

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

export const Avatar = styled.div`
  display: flex;
  justify-content: center;
`;

export const ContainerCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  @media (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
  }

  @media (max-width: 991px) {
    justify-items: center;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    justify-items: center;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 520px) {
    justify-items: center;
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default Content;
