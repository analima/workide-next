import styled from 'styled-components';

import { BRANCO, CINZA_10, VERMELHO } from '../../styles/variaveis';

interface FotoProps {
  urlFoto?: string;
  isChangePhoto: boolean;
}

export const Container = styled.div<FotoProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    display: none;
  }

  label {
    max-height: 196px;
    max-width: 196px;
    background-color: ${CINZA_10};
    border-radius: 8px;
    color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s ease-in-out;
    background-size: cover;
    background-position: center;
    background-image: ${props =>
      props.urlFoto ? `url(${props.urlFoto})` : 'none'};

    &:hover {
      cursor: ${props => (props.isChangePhoto ? 'auto' : 'pointer')};
    }
  }

  .image {
    padding: 0;
    height: 196px;
    width: 196px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .overlay {
    padding: 0;
    height: 196px;
    width: 196px;
    border-radius: 50%;
    transition: background-color 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
      content: 'Editar foto';

      span {
        display: inline;
        color: ${BRANCO};
      }
    }

    span {
      display: ${props => (props.urlFoto ? 'none' : 'initial')};
      color: ${props => (props.urlFoto ? BRANCO : '#212529')};
    }
  }

  .error-message {
    margin-top: 8px;
    text-align: center;
    color: ${VERMELHO};
  }
`;

export const ContentEdit = styled.div`
  input {
    display: none;
  }
`;
