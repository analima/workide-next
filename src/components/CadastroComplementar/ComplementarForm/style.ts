import styled from 'styled-components';
import {
  AZUL,
  BRANCO,
  LARANJA,
  LARANJA_10,
  PRETO_10,
} from '../../../styles/variaveis';
import { Link } from 'react-router-dom';

type Props = {
  selected: boolean;
};

const Content = styled.section`
  #container-checkbox {
    margin-left: 140px;

    @media (max-width: 360px) {
      margin-left: 40px;
    }
  }

  #checkbox-sem-fins-lucrativos {
    margin-left: 360px;

    @media (max-width: 540px) {
      margin-left: 200px;
    }
    @media (max-width: 390px) {
      margin-left: 140px;
    }
    @media (max-width: 360px) {
      margin-left: 40px;
    }
  }
  .fechar {
    top: 0;
    right: 0;
    margin: 16px;
    cursor: pointer;
    position: absolute;

    &:hover {
      opacity: 0.7;
    }
  }

  .btn-add {
    align-items: center;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
  }

  .formacao {
    .row {
      margin-top: 80px;
    }
  }

  .btn {
    font-weight: bold;
    font-size: 16px;
    padding: 16px 40px;
    border-radius: 8px;
  }

  .container {
    padding: 16px 0;
  }

  .content-toggle {
    display: flex;
    align-items: center;
    gap: 16px;

    span {
      font-size: 16px;
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

  .title-causas {
    font-size: 16px;
    margin-left: 80px;
  }

  a {
    color: ${AZUL};
    background-color: transparent;
    border: 1px ${AZUL} solid;
    text-decoration: none;
    padding: 16px 40px;
    font-weight: bold;
    border-radius: 8px;
    font-size: 12px;
    text-decoration: none;
    transition: background-color 0.2s;
  }
`;

export const ButtonSkip = styled.button`
  border: none;
  outline: none;
  background-color: ${LARANJA};
  color: ${BRANCO};
  font-weight: bold;
  font-size: 16px;
  padding: 16px 40px;
  border-radius: 8px;

  &:hover {
    background-color: ${LARANJA_10};
  }
`;

export const Subtitulo = styled.h2`
  color: ${PRETO_10};
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const ContainerCausas = styled.div<Props>`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  list-style: none;
  margin-top: 16px;
  @media (max-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 540px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 400px) {
    grid-template-columns: repeat(1, 1fr);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  li {
    background: #f5f5f5;
    border: 2px solid #f5f5f5;
    height: 173px;
    width: 173px;
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    text-align: center;

    cursor: pointer;
    @media (max-width: 400px) {
      margin: 0 auto;
    }

    svg {
      display: none;
    }
  }

  svg.p {
    display: flex;
    font-size: 9px;
    position: absolute;
    z-index: 2;
  }

  img.selected {
    filter: brightness(32%);
    opacity: 3;
    border: 0;
    z-index: 1;
  }
`;

export const NumberOfCharacters = styled.span`
  font-size: 16px;
  margin-top: 16px;
`;

export const Actions = styled.section`
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;
  gap: 16px;
`;

export const SkipButton = styled(Link)`
  background: ${LARANJA} !important;
  color: ${BRANCO} !important;
  border: none !important;
`;

export default Content;
