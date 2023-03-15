import { AZUL, PRETO_10 } from '../../../../styles/variaveis';
import styled from 'styled-components';

import { BRANCO, CINZA_40, LARANJA } from '../../../../styles/variaveis';
import { lighten } from 'polished';

const Content = styled.div`
  .content-infos {
    @media (max-width: 1400px) {
      margin-left: 30px;
    }

    @media (max-width: 1200px) {
      margin-left: 60px;
    }

    @media (max-width: 992px) {
      margin-left: 0px;
      margin-top: 15px;
    }
  }
`;

export const ContainerNameUser = styled.div`
  cursor: pointer;

  h2 {
    :hover {
      opacity: 0.8;
    }
  }
`;

export const FotoPerfil = styled.img`
  width: 176px;
  height: 176px;
  border-radius: 50%;
  object-fit: cover;
  -webkit-transition: -webkit-transform 0.5s ease;
  transition: transform 0.5s ease;
  cursor: pointer;

  &:hover {
    -webkit-transform: scale(1.05);
    transform: scale(1.03);
  }
`;

export const LabelRank = styled.label`
  color: ${CINZA_40};
  font-weight: bold;
`;

export const MobileCenter = styled.label`
  display: flex;
  align-items: center;

  iframe {
    width: 160px;
    height: 160px;
    border-radius: 50%;
  }

  @media (max-width: 1400px) {
    margin-right: 15px;
  }

  @media (max-width: 478px) {
    display: flex;
    justify-content: center;
  }
`;

export const LabelNota = styled.label`
  color: ${LARANJA};
  margin: 0 8px 0 0;
`;

export const Button = styled.button`
  transition: all 0.2s ease-in-out;
  padding: 16px 40px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid ${AZUL};
  color: ${BRANCO};
  background-color: ${AZUL};
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: ${lighten(0.1, AZUL)};
  }

  @media (max-width: 991px) {
    width: 100%;
    margin: 8px 0;
  }
`;

export const ContainerAcoes = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;

  button {
    margin-left: 16px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;

    button {
      margin-left: 0;
      margin-bottom: 15px;
    }
  }

  @media (max-width: 478px) {
    flex-direction: column;

    button {
      margin: 8px 0;
    }
  }
`;

export const Sobre = styled.p`
  text-align: left;
  font-size: 16px;
  color: ${PRETO_10};
  word-wrap: break-word;
`;

export default Content;
