import styled, { css } from 'styled-components';
import {
  AMARELO,
  AZUL,
  AZUL_60,
  BRANCO,
  CINZA_80,
  PRETO_10,
  PRETO_60,
  VERDE,
  VERMELHO,
} from '../../styles/variaveis';

type Props = {
  selected?: boolean;
};

export const ContainerStyled = styled.section<Props>`
  border-radius: 8px;
  min-width: 400px;
  padding: 14px 15px;
  min-height: 284px;
  max-height: 285px;
  border: 1px solid #e5e5e5;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: ${props => props.selected && `2px solid ${VERDE}`};

  @media (max-width: 480px) {
    min-width: 100%;
    max-width: 100%;
    min-height: auto;
    max-height: auto;
    margin-bottom: 20px;
  }
`;

export const TypographyName = styled.p`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: ${PRETO_60};
  margin-bottom: 0;

  @media (max-width: 480px) {
    font-size: 16px;
    line-height: 20px;
  }
`;

export const TypographyDateStyled = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: ${PRETO_10};
  margin-bottom: 0;
`;

export const TypographyTextStyled = styled.p`
  font-weight: 400;
  line-height: 24px;
  color: ${PRETO_10};
  margin-bottom: 0;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-width: 380px;

  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

export const ContentSubAreaStyled = styled.div`
  max-height: 74px;

  ::-webkit-scrollbar-track {
    background-color: #f4f4f4;
  }
  ::-webkit-scrollbar {
    width: 4px;
    background: #f4f4f4;
  }
  ::-webkit-scrollbar-thumb {
    background: ${CINZA_80};
  }

  .content-area-label {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    @media (max-width: 480px) {
      max-height: 32px;
    }
  }
`;
export const LineSubAreaStyled = styled.p`
  padding: 5px;
  font-weight: bold;
  border: solid 2px ${VERDE};
  color: ${VERDE};
  border-radius: 24px;
  padding-left: 10px;
  font-size: 12px;
  margin-bottom: 0;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const ButtonPublishStyled = styled.button`
  text-transform: uppercase;
  margin-left: 68%;
  border: none;
  background-color: ${BRANCO};
  font-weight: 700;
  color: ${AZUL};
  margin-top: 8px;
  font-size: 16px;

  @media (max-width: 480px) {
    margin-left: 60%;
    font-size: 12px;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Images = styled.div`
  position: relative;
  display: flex;
  width: 120px;

  img.selected {
    filter: brightness(32%);
    opacity: 3;
    border: 0;
    z-index: 1;
  }

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    position: absolute;

    :first-child {
      position: relative;
      top: 0;
      left: 0;
      z-index: 2;
    }

    :nth-child(2) {
      left: 30px;
      z-index: 1;
    }
  }

  .length-img {
    position: absolute;
    left: 70px;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      font-size: 16px;
      color: ${BRANCO};
      font-weight: bold;
      border-radius: 50%;
      background-color: ${VERDE};
    }
  }
`;

export const TypeProject = styled.span`
  color: ${VERDE};
  font-weight: bold;
  font-size: 18px;
`;

type PropsStatus = {
  status: string;
};

export const TextStatus = styled.span<PropsStatus>`
  text-align: end;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;

  ${({ status }) =>
    status === 'PAUSADO' &&
    css`
      color: #849752;
    `}

  ${({ status }) =>
    status === 'CONCLUIDO' &&
    css`
      color: ${AZUL};
    `}

    ${({ status }) =>
    status === 'CANCELADO' &&
    css`
      color: ${VERMELHO};
    `}

    ${({ status }) =>
    status === 'AGUARDANDO_PAGAMENTO' &&
    css`
      color: ${AMARELO};
    `}

    ${({ status }) =>
    status === 'RECEBENDO_PROPOSTAS' &&
    css`
      color: ${AZUL_60};
    `}

    ${({ status }) =>
    status === 'AGUARDANDO_INICIO' &&
    css`
      color: ${VERDE};
    `}

    ${({ status }) =>
    status === 'CRIADO' &&
    css`
      color: ${VERDE};
    `}
`;
