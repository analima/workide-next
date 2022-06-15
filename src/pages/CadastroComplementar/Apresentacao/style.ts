import { lighten } from 'polished';
import styled from 'styled-components';
import { AZUL, BRANCO, CINZA_40, VERDE } from '../../../styles/variaveis';

export const Avatar = styled.div`
  display: flex;
  justify-content: center;
`;

export const WrapperToggleAvatar = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 55px;
`;

export const Content = styled.section`
  padding-top: 19px;
`;

export const TituloGradiente = styled.h3`
  background: -webkit-linear-gradient(${AZUL}, ${VERDE});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 39px;
  font-weight: bold;

  @media (max-width: 478px) {
    text-align: center;
  }
`;

export const ContainerAvatarMeet = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 30px;
`;

export const ParagraphAvatarMeet = styled.p`
  background: ${CINZA_40};
  padding: 8px;
  font-size: 12.8px;
  width: 195px;
  color: ${BRANCO};
  border-radius: 16px 16px 16px 0px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);

  flex: none;
`;

export const ContainerImageAvatar = styled.div`
  flex: none;
  height: 257px;

  .image-avatar {
    height: 100%;
  }
`;

export const ContainerToggleAvatar = styled.div<{ isSelectedAvatar: boolean }>`
  display: flex;
  justify-content: center;
  width: 80px;
  height: 80px;
  overflow: hidden;
  cursor: pointer;

  ${props => props.isSelectedAvatar && `border: solid 2px ${AZUL};`}

  background: ${BRANCO};
  border-radius: 16px;
`;

export const Button = styled.button`
  padding: 16px 40px;
  font-weight: bold;
  color: ${BRANCO};
  background-color: ${AZUL};
  border-radius: 8px;
  border: 1px solid ${AZUL};
  text-decoration: none;
  transition: background-color 0.2s;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  font-size: 11px;

  &:hover {
    color: ${BRANCO};
    background-color: ${lighten(0.1, AZUL)};
  }

  @media (max-width: 478px) {
    width: 100%;
  }
`;

export const TransparentButton = styled.button`
  color: ${AZUL};
  background-color: transparent;
  border: none;
  margin: 2rem auto;
`;
