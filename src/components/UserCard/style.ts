import styled from 'styled-components';
import { AZUL, BRANCO, LARANJA } from '../../styles/variaveis';

export const ContainerStyled = styled.div`
  background-color: ${BRANCO};
  padding: 36px;
  display: flex;
  gap: 28px;
  border-radius: 8px;

  @media (max-width: 570px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const ContainerImageStyled = styled.div`
  img {
    width: 152px;
    height: 152px;
    border-radius: 8px;
    object-fit: cover;

    cursor: pointer;
    -webkit-transition: -webkit-transform 0.5s ease;
    transition: transform 0.5s ease;

    :hover {
      -webkit-transform: scale(1.03);
      transform: scale(1.03);
    }
  }
`;
export const ContentCardStyled = styled.div`
  width: 100%;
`;

type Props = {
  visao?: string;
};

export const HeaderStyled = styled.div<Props>`
  p {
    margin-bottom: 12px;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    color: ${({ visao }) => (visao === 'fornecedor' ? AZUL : LARANJA)};

    cursor: pointer;

    :hover {
      opacity: 0.8;
    }
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const RankingStyled = styled.div`
  p {
    color: #686868 !important;
  }
`;

export const EvaluationStyled = styled.div`
  display: flex;
  gap: 5px;
  p {
    color: ${LARANJA};
    margin: 0;
  }
`;

export const ContentMedalStyled = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 4px 0;
  svg {
    width: 32px;
  }
`;

export const ContentTextStyled = styled.p`
  font-weight: bold;
  font-size: 16px;
  color: #494949;
  word-break: break-word;
  text-align: left;
`;

export const TypographyProjectsStyled = styled.p`
  font-weight: 400;
  font-size: 16px;
  color: #494949;
`;

export const ContainerActionsStyled = styled.div`
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

export const GhostButtonStyled = styled.button`
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;
  padding: 16px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid #999;
  color: #999;
  font-weight: bold;
  font-size: 10px;
  text-transform: uppercase;

  &:hover {
    color: ${BRANCO};
    background-color: ${AZUL};
    border-color: ${BRANCO};
  }

  @media (max-width: 478px) {
    width: 100%;
    font-size: 12px;
  }
`;

export const ButtonMainStyled = styled.button`
  background-color: ${AZUL};
  transition: all 0.2s ease-in-out;
  padding: 16px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid ${AZUL};
  color: ${BRANCO};
  font-weight: bold;
  font-size: 10px;
  text-transform: uppercase;

  &:hover {
    color: ${AZUL};
    background-color: ${BRANCO};
  }

  @media (max-width: 478px) {
    width: 100%;
    font-size: 12px;
  }
`;
