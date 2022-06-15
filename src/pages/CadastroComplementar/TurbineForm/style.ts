import styled from 'styled-components';
import { AZUL, BRANCO } from '../../../styles/variaveis';

export const Content = styled.section`
  textarea {
    border-radius: 8px;
  }

  .especialidades {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    label {
      margin-bottom: 15px;
    }
  }

  .accordion-body {
    display: grid;
    grid-template-columns: 3fr 3fr 3fr 3fr;

    .form-check {
      padding: 10px 25px;
    }
  }

  .btn {
    font-weight: bold;
    font-size: 16px;
    padding: 16px 40px;
    border-radius: 8px;
  }

  .content-toggle {
    display: flex;
    align-items: center;
    gap: 16px;

    span {
      font-size: 18px;
      font-weight: bold;
      color: ${AZUL};
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

  @supports (-webkit-appearance: none) or (-moz-appearance: none) {
    input[type='radio'] {
      margin-left: 15% !important;
      --active: ${AZUL};
      --active-inner: #fff;
      --focus: 2px rgba(39, 94, 254, 0.3);
      --border: #bbc1e1;
      --border-hover: #275efe;
      --background: #fff;
      --disabled: #f6f8ff;
      --disabled-inner: #e1e6f9;
      -webkit-appearance: none;
      -moz-appearance: none;
      height: 21px;
      outline: none;
      display: inline-block;
      vertical-align: top;
      position: relative;
      margin: 0;
      cursor: pointer;
      border: 1px solid var(--bc, var(--border));
      background: var(--b, var(--background));
      transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
      &:after {
        content: '';
        display: block;
        left: 0;
        top: 0;
        position: absolute;
        transition: transform var(--d-t, 0.3s) var(--d-t-e, ease),
          opacity var(--d-o, 0.2s);
      }
      &:checked {
        --b: var(--active);
        --bc: var(--active);
        --d-o: 0.3s;
        --d-t: 0.6s;
        --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
      }
      &:disabled {
        --b: var(--disabled);
        cursor: not-allowed;
        opacity: 0.9;
        &:checked {
          --b: var(--disabled-inner);
          --bc: var(--border);
        }
        & + label {
          cursor: not-allowed;
        }
      }
      &:hover {
        &:not(:checked) {
          &:not(:disabled) {
            --bc: var(--border-hover);
          }
        }
      }
      &:focus {
        box-shadow: 0 0 0 var(--focus);
      }
      &:not(.switch) {
        width: 21px;
        &:after {
          opacity: var(--o, 0);
        }
        &:checked {
          --o: 1;
        }
      }
      & + label {
        font-size: 14px;
        line-height: 21px;
        display: inline-block;
        vertical-align: top;
        cursor: pointer;
        margin-left: 4px;
      }
    }

    input[type='radio'] {
      border-radius: 50%;
      &:after {
        width: 19px;
        height: 19px;
        border-radius: 50%;
        background: var(--active-inner);
        opacity: 0;
        transform: scale(var(--s, 0.7));
      }
      &:checked {
        --s: 0.5;
      }
    }

    @media (max-width: 800px) {
      .accordion-body {
        flex-direction: column;
      }
    }

    @media (max-width: 766px) {
      .accordion-body {
        display: grid;
        grid-template-columns: 2fr 2fr;

        .form-check {
          padding: 10px 25px;
        }
      }
    }

    @media (max-width: 414px) {
      .accordion-body {
        display: grid;
        grid-template-columns: 1fr;

        .form-check {
          padding: 10px 25px;
        }
      }
    }
  }
`;

export const Actions = styled.section`
  display: flex;
  justify-content: flex-end;
  margin: 32px 0;

  * + * {
    margin-left: 16px;
  }

  button:last-child {
    background-color: ${AZUL};
    color: ${BRANCO};
    padding: 16px 40px;
    max-height: 60px;
    min-width: 140px;
  }
`;

export const Subtitulo = styled.h2`
  color: ${AZUL};
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;
