import styled from 'styled-components';
import { CINZA_40, CINZA_80 } from '../../../styles/variaveis';

export const Content = styled.section`
  width: 100vw;
  mim-height: 530px;
  padding: 40px 0;

  span {
    color: ${CINZA_80};
    font-weight: bold;
  }

  h2 {
    text-align: center;
    margin-bottom: 24px;
    font-size: 39px;
  }

  .depoimentos {
    background-color: white;
    padding: 32px 40px 64px 40px;
    color: ${CINZA_40};

    h3 {
      font-weight: bold;
    }

    img {
      margin: 10px 10px 10px 0;
    }
  }

  .embed-responsive {
    iframe {
      min-height: 327px;
      width: 100%;
    }
  }
`;
