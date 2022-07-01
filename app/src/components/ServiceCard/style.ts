import styled from 'styled-components';
import {
  BRANCO,
  CINZA_10,
  LARANJA,
  PRETO_10,
  VERDE,
} from '../../styles/variaveis';

export const Content = styled.div`
  width: calc(237px + 2px);
  height: 364px;
  border: solid 1px ${CINZA_10};
  transition: all 0.2s;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background-color: ${BRANCO};

  &:hover {
    -webkit-box-shadow: 0px 4px 16px -3px rgba(0, 0, 0, 0.29);
    box-shadow: 0px 4px 16px -3px rgba(0, 0, 0, 0.29);
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

export const FillBlack = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 200px;
  background: linear-gradient(
    0deg,
    rgba(20, 20, 20, 0.6) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 1;
  cursor: pointer;
`;

export const ImageProfile = styled.img`
  width: 240px;
  height: 182px;

  object-fit: cover;
`;

export const ImageContainerInfos = styled.div`
  display: flex;
  justify-content: space-between;

  position: absolute;
  top: 10px;
  left: 10px;
  width: 100%;
  z-index: 2;
  cursor: pointer;
`;

export const ContainerServicePrice = styled.span`
  font-weight: bold;
  color: ${VERDE};
  font-size: 12px;
  margin: 0;
`;

export const ImageNameService = styled.p`
  position: absolute;
  bottom: -16px;
  padding: 8px;
  display: flex;
  cursor: pointer;
  font-size: 14px;
  color: ${BRANCO};
  font-weight: bold;
  z-index: 2;
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
`;

export const DescriptionParagraph = styled.p`
  font-size: 12px;
  color: ${PRETO_10};
  margin: 0;

  overflow: hidden; // Removendo barra de rolagem
  text-overflow: ellipsis; // Adicionando "..." ao final
  display: -webkit-box;
  -webkit-line-clamp: 3; // Quantidade de linhas
  -webkit-box-orient: vertical;
`;

export const Avaliacao = styled.div`
  margin: 4px 0;
  display: flex;
  align-items: center;

  span {
    color: ${LARANJA};
    font-size: 16px;
    margin-right: 8px;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const ContentInfoSecundary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 172px;
  padding: 4px;
`;

export const ContainerDados = styled.div`
  flex: 1;
`;

export const ContainerProfile = styled.div`
  display: flex;
  align-items: center;
  max-height: 60px;
  gap: 16px;

  span {
    font-size: 12px;
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
