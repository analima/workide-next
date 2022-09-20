import styled from 'styled-components';

type Props = {
  isEmpty: boolean;
};

const Content = styled.div<Props>`
  padding: 0px;
  border-radius: 5px;
  display: grid;
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
