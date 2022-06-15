import styled from 'styled-components';
import { CINZA_40, VERDE } from '../../../../styles/variaveis';

export const Content = styled.div`
  label {
    &:first-child {
      margin-right: 1rem;
    }

    color: ${CINZA_40};
    font-weight: bold;
  }

  .form-check .form-check-input {
    margin: 0 8px;
  }

  .form-check {
    display: flex;
    align-items: center;
  }

  .label-green {
    label {
      color: ${VERDE};
    }
    input:checked {
      background-color: ${VERDE};
    }
  }
`;

export const ContentCheck = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }
`;
