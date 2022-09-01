import styled from 'styled-components';
import { AZUL, BRANCO } from '../../styles/variaveis';

export const Container = styled.section`
  background-color: ${AZUL};
  height: 487px;

  h1 {
    font-weight: 700;
    font-size: 44px;
    line-height: 66px;
    text-align: center;
    color: #ffffff;
    margin-top: 16px;
  }

  @media (max-width: 768px) {
    height: auto;
    padding-bottom: 32px;

    h1 {
      font-size: 32px;
    }
  }
`;

export const Content = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 0 16px;
  margin-top: 28px;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 500px) {
  }
`;

export const BoxDepositions = styled.div`
  width: 644px;
  height: 298px;
  background-color: ${BRANCO};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  padding: 36px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 10;
  }

  @media (max-width: 991px) {
    padding: 16px 24px;
  }

  @media (max-width: 768px) {
    width: 480px;
  }

  @media (max-width: 530px) {
    width: 100%;
  }
`;
