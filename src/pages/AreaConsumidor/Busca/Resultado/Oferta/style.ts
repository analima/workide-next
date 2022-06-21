import styled from 'styled-components';

type Props = {
  isEmpty: boolean;
};

export const Content = styled.div<Props>`
  padding: 0px;
  border-radius: 5px;
  display: ${props => (props.isEmpty ? 'block' : 'grid')};
`;

export const Avatar = styled.div`
  display: flex;
  justify-content: center;
`;

export const ContainerCard = styled.div`
  display: flex;
  flex-wrap: wrap;
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
