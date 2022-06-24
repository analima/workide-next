import { lighten } from 'polished';
import styled from 'styled-components';
import {
  AZUL,
  BRANCO,
  CINZA_40,
  LARANJA,
  PRETO_10,
} from '../../../../styles/variaveis';
import { Link } from 'react-scroll';

interface Props {
  isActive?: boolean;
}

const Content = styled.section`
  position: relative;
  .text-grey {
    color: ${CINZA_40};
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
`;

export const ContentImg = styled.div`
  position: relative;
  bottom: 152px;
  width: 214px;
  height: 214px;

  > div {
    display: flex;

    span {
      font-size: 10px;

      p {
        font-size: 10px;
      }
    }
  }

  @media (max-width: 768px) {
    width: 164px;
    height: 164px;
    bottom: 120px;
  }

  @media (max-width: 468px) {
    width: 140px;
    height: 140px;
    bottom: 100px;
  }
`;

export interface CapaProps {
  CapaDefault: string;
}

export const ContentSpinnerLoading = styled.div<CapaProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.CapaDefault});
  background-size: cover;
`;

export const Avaliacao = styled.div`
  display: flex;
  align-items: center;
  margin: 4px 0;

  .nota {
    color: ${LARANJA};
    margin-right: 8px;
    font-weight: bold;
    font-size: 16px;
  }

  .estrela {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 468px) {
    .nota {
      font-size: 12px;
    }

    .estrela {
      width: 12px;
      height: 12px;
    }
  }
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1000px) {
    flex-direction: column;
    margin-top: 16px;
  }
`;

export const Acoes = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 16px;
  padding: 24px;
  position: absolute;
  top: 0;
  right: 0;

  svg {
    cursor: pointer;
  }

  .coracao {
    width: 40px;
    height: 40px;
    cursor: pointer;
  }

  @media (max-width: 991px) {
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 16px;
    margin-bottom: 16px;
  }
`;

export const NomeTitulo = styled.h2`
  color: ${PRETO_10};
  font-weight: bold;
  font-size: 16px;
  margin: 0;

  @media (max-width: 468px) {
    font-size: 12.8px;
  }
`;

export const FotoPerfil = styled.img`
  object-fit: cover;
  width: 214px;
  height: 214px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  border: 2px solid ${BRANCO};

  @media (max-width: 768px) {
    width: 164px;
    height: 164px;
  }

  @media (max-width: 468px) {
    width: 140px;
    height: 140px;
  }
`;

export const SobreDrescricao = styled.p`
  text-align: left;
  margin-top: 16px;
  font-size: 16px;
  font-weight: bold;
  color: ${CINZA_40};
  word-wrap: normal;
  word-break: normal;
`;

export const Button = styled.button<Props>`
  transition: all 0.2s ease-in-out;
  padding: 16px 40px;
  margin: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: none;
  color: ${({ isActive }) => (isActive ? BRANCO : AZUL)};
  background-color: ${({ isActive }) => (isActive ? AZUL : BRANCO)};
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: ${({ isActive }) => isActive && lighten(-0.1, AZUL)};
  }

  @media (max-width: 991px) {
    width: 100%;
    margin: 8px 0;
  }

  @media (max-width: 768px) {
    padding: 16px;
    font-size: 10px;
  }
`;

// --------------------------------

export const ContentCapa = styled.div`
  width: 100%;
  height: 264px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
`;

export const ContentInfo = styled.div`
  padding: 0 0 24px 24px;
  display: flex;
  gap: 24px;
  justify-content: space-between;
  height: 148px;

  @media (max-width: 468px) {
    gap: 8px;
  }
`;

export const ContentOtherInfo = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  padding: 38px 0;
  margin: 0;

  section {
    margin: 0;

    span {
      font-size: 12px;
      color: ${PRETO_10};
      font-weight: bold;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 8px 0;

    section {
      span {
        font-size: 10px;
      }
    }
  }
`;

export const ContentInfo2 = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50px;
  }

  span {
    font-size: 10px;
  }
`;
export const ContentInfo3 = styled.div`
  margin-bottom: 16px;
  display: flex;
  gap: 100px;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  background-color: ${BRANCO};
  padding: 8px 32px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    gap: 16px;
    padding: 8px 16px;
    justify-content: space-between;
  }

  @media (max-width: 468px) {
    gap: 8px;
  }
`;

export const LinkToScroll = styled(Link)`
  cursor: pointer;
  font-size: 12.8px;
  color: ${AZUL};
  font-weight: bold;
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 409px) {
    font-size: 10.8px;
  }
`;

export default Content;
