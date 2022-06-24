import { lighten } from 'polished';
import styled from 'styled-components';
import { BRANCO, LARANJA, PRETO } from '../../../styles/variaveis';
import ChevronUpIcon from '../../../assets/circle-chevron-up.svg';
import ChevronDownIcon from '../../../assets/circle-chevron-down.svg';

const Content = styled.div`
  .accordion-header {
    .accordion-button:not(.collapsed) {
      background-color: ${LARANJA};
      color: ${BRANCO};

      &::after {
        background-image: url(${ChevronUpIcon});
        transform: rotate(-360deg);
      }
    }

    .accordion-button.collapsed {
      background-color: ${BRANCO};
      color: ${PRETO};

      &::after {
        background-image: url(${ChevronDownIcon});
      }
    }

    button:focus {
      border-color: ${BRANCO};
      box-shadow: 0 0 0 0.25rem ${lighten(0.2, LARANJA)};
    }
  }

  
`;

export default Content;
