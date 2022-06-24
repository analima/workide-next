import styled from 'styled-components';
import { LARANJA, PRETO_10 } from '../../../../styles/variaveis';

const Content = styled.section`
  .container-sobre__image {
    margin-right: 30px;
  }
`;

export const Avaliacao = styled.div`
  margin: 4px 0;

  span {
    color: ${LARANJA};
    margin-right: 8px;
  }

  @media (max-width: 478px) {
    display: flex;
    justify-content: center;
  }
`;

export const Medalhas = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 4px 0;

  svg {
    width: 32px;
  }

  @media (max-width: 478px) {
    display: flex;
    justify-content: center;
  }
`;

export const FotoPerfil = styled.img`
  width: 280px;
  height: 280px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  object-fit: cover;

  @media (max-width: 478px) {
    width: 100px;
    height: 100px;
    margin: 16px 0;
  }
`;

export const SobreDrescricao = styled.p`
  text-align: left;
  font-size: 16px;
  color: ${PRETO_10};

  @media (max-width: 478px) {
    margin-top: 0px;
  }
`;

export const ContentImg = styled.div`
  position: relative;
`;

export default Content;
