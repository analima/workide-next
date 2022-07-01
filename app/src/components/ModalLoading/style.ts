import { PRETO_10 } from './../../styles/variaveis';
import styled from 'styled-components';

type Props = {
  showModal?: boolean;
};

export const Content = styled.div<Props>`
  padding: ${({ showModal }) => (showModal ? '54px 25px' : '0')};
  display: ${({ showModal }) => (showModal ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  h2 {
    text-align: center;
  }

  .container-loading {
    min-width: 150px;
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }
`;

export const ContainerAvatar = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  span {
    background-color: ${PRETO_10};
    color: #fff;
    padding: 15px;
    border-radius: 6px;
    height: fit-content;
    /* width: 100px; */
  }
`;
