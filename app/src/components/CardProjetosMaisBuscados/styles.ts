import styled from 'styled-components';
import { BRANCO, BRANCO_GELO, CINZA_50, LARANJA } from '../../styles/variaveis';

export const Container = styled.div`
  background-color: ${BRANCO};
`;

export const Content = styled.div`
  width: 100%;
  background-color: ${BRANCO_GELO};
  display: flex;
  justify-content: space-evenly;
  padding-top: 83px;
  padding-bottom: 83px;

  h1 {
    font-size: 64px;
    color: ${CINZA_50};
    width: 412px;
    font-weight: bold;

    svg {
      cursor: pointer;
      margin-left: 16px;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .content-subarea {
    h2 {
      font-size: 32px;
      font-weight: bold;
      color: ${LARANJA};
      transform: rotate(0deg) scale(1);

      :hover {
        cursor: pointer;
        transform: rotate(0deg) scale(1.3);
      }
    }

    h3 {
      font-size: 24px;
      font-weight: bold;
      color: ${LARANJA};
      transform: rotate(0deg) scale(1);

      :hover {
        cursor: pointer;
        transform: rotate(0deg) scale(1.3);
      }
    }

    h4 {
      font-size: 20px;
      font-weight: bold;
      color: ${LARANJA};
      transform: rotate(0deg) scale(1);

      :hover {
        cursor: pointer;
        transform: rotate(0deg) scale(1.3);
      }
    }
  }

  @media (max-width: 576px) {
    padding-bottom: 0;
    padding-top: 20px;
    h1 {
      font-size: 40px;
      width: 300px;
      padding-left: 8px;
    }

    .content-subarea {
      padding-left: 8px;
      h2 {
        font-size: 24px;
      }

      h3 {
        font-size: 18px;
      }

      h4 {
        font-size: 16px;
      }
    }
  }

  @media (max-width: 478px) {
    flex-direction: column;

    h1 {
      font-size: 39px;
      font-weight: 400;
      display: flex;
      text-align: left;
      flex-direction: column;
      width: 100%;

      svg {
        width: 100%;
        margin-left: 0;
        display: flex;
        text-align: center;
      }
    }
  }
`;
