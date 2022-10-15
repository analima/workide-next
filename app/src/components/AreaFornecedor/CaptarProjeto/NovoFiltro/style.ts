import styled from 'styled-components';
import { AZUL, BRANCO, PRETO_10 } from '../../../../styles/variaveis';

export const Content = styled.section`
  border-radius: 8px;

  h4 {
    font-size: 16px;
  }

  @media (max-width: 178px) {
    width: 100%;
  }
`;

export const CardFiltro = styled.div`
  .form-check {
    display: flex;
    gap: 4px;

    input {
      margin: 0;
    }
  }

  @media (max-width: 995px) {
    margin: 4px 0;
    padding: 2px 2px;
  }

  @media (max-width: 400px) {
    padding: 6px 0;
    margin: 1px 0;
    font-size: 16px;
  }

  .content-toggle {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;

    span {
      font-size: 16px;
      color: ${PRETO_10};
    }

    .toggle > input {
      display: none;
    }

    .toggle > label {
      position: relative;
      display: block;
      height: 30px;
      width: 62px;
      background-color: #fff;
      border: 1px ${AZUL} solid;
      border-radius: 100px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .toggle > label:after {
      position: absolute;
      left: 8px;
      top: 3px;
      display: block;
      width: 22px;
      height: 22px;
      border-radius: 100px;
      background: ${AZUL};
      box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.05);
      content: '';
      transition: all 0.3s ease;
    }

    .toggle > label:active:after {
      transform: scale(1.15, 0.85);
    }

    .toggle > input:checked ~ label {
      background-color: ${AZUL};
      border: 1px ${AZUL} solid;
    }

    .toggle > input:checked ~ label:after {
      left: 30px;
      background-color: ${BRANCO};
    }
    .toggle > input:disabled ~ label {
      background-color: #d5d5d5;
      pointer-events: none;
    }
    .toggle > input:disabled ~ label:after {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
`;
