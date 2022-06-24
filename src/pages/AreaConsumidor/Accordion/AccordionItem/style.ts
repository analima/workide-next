import styled from 'styled-components';
import { BRANCO, AZUL } from '../../../../styles/variaveis';
import ChevronDownIcon from '../../../../assets/circle-chevron-down-blue.svg';

const Content = styled.div`
  margin: 2px 0 10px;

  .accordion-header {
    .accordion-button {
      box-shadow: none;
      color: ${AZUL};
      font-size: 26px;
      padding: 24px;
      background-color: ${BRANCO};

      &::after {
        background-image: url(${ChevronDownIcon});
        color: ${AZUL};
      }
    }

    @media (max-width: 478px) {
      font-size: 24px;
    }
  }

  .accordion-body {
    padding: 32px 10px;

    @media (max-width: 478px) {
      padding: 16px;
    }
  }
`;

export default Content;
