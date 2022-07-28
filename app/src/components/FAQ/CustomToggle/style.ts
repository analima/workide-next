import styled from 'styled-components';
import { CINZA_40 } from '../../../styles/variaveis';

export const PostFaqCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  color: ${CINZA_40};
  margin: 0px;
  cursor: pointer;

  span {
    font-size: 16px;
    font-weight: bold;
    width: 250px;
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    margin: 0px;
    max-height: 24px;
    width: 850px;
  }
`;

export const ContainerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 578px) {
    width: 120%;
  }
`;
