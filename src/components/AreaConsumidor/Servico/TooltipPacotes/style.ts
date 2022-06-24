import styled from 'styled-components';
import {
  AZUL,
  BRANCO,
  CINZA_40,
  CINZA_80,
  PRETO_10,
  VERDE,
} from '../../../../styles/variaveis';

interface SizeProps {
  sizePage: number;
  user?: boolean;
}

const Content = styled.div<SizeProps>`
  padding: 16px 20px;
  background-color: ${BRANCO};
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  position: sticky;
  top: ${props => (props.user ? '0px' : '100px')};
  width: 460px;

  @media (max-width: 500px) {
    width: 100%;
  }

  .container {
    .col-btn-descricao {
      margin-top: 8px;
      padding: 0;

      button {
        width: 100%;
        border-radius: 8px 0 0 8px;
        padding: 16px;
        background-color: ${AZUL};
        box-shadow: none;
        font-weight: bold;

        @media (max-width: 478px) {
          border-radius: 8px 8px 0 0;
          margin-top: 0;
        }
      }
    }

    .col-box-descricao {
      padding: 0;
      margin-top: 8px;

      @media (max-width: 478px) {
        margin-top: 0;
      }
    }
  }
`;
interface ButtonPacoteProps {
  active?: boolean;
}

export const ContentButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

export const ButtonPacote = styled.span<ButtonPacoteProps>`
  font-size: 12px;
  font-weight: bold;
  color: ${PRETO_10};
  border-bottom: ${props => (props.active ? `2px solid ${AZUL}` : 'none')};
  padding: 8px 16px;
  cursor: pointer;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  align-items: flex-start;
  text-align: center;
`;

export const Descricao = styled.div`
  @media (max-width: 478px) {
    border-radius: 0 0 8px 8px;
  }
`;

export const DescricaoTitulo = styled.p`
  font-weight: bold;
  font-size: 16px;
  color: ${PRETO_10};
`;

export const DescricaoTexto = styled.p`
  color: ${CINZA_40};
  font-size: 12.8px;
  width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const DescricaoRodapeContainer = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  div:first-child {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const DescricaoRodape = styled.div`
  height: 162px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  overflow-y: scroll;
  scroll-behavior: smooth;

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

  div {
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }
  span {
    font-size: 12px;
    color: ${CINZA_40};
  }
`;

export const ContentValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;

  span {
    font-size: 14px;
    color: ${PRETO_10};
  }

  strong {
    font-size: 18px;
    font-weight: bold;
    color: ${VERDE};
  }
`;

interface ICorProps {
  cor: string;
}

export const ContentInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-top: 16px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;

    svg {
      cursor: pointer;
    }
  }

  @media (max-width: 1200px) {
    gap: 8px;
  }
`;

export const TooltipMember = styled.div`
  padding: 10px;
  border-radius: 16px;
  background-color: #494949;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
`;

export const LabelInfo = styled.span<ICorProps>`
  font-size: 10px;
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 8px;
  background-color: ${props => props.cor};
  color: ${BRANCO};
`;

export const Button = styled.button`
  padding: 16px 32px;
  font-weight: bold;
  color: ${BRANCO};
  background-color: ${AZUL};
  border-radius: 8px;
  font-size: 12px;
  border: none;
  white-space: nowrap;

  @media (max-width: 478px) {
    width: 100%;
    margin-top: 16px;
  }
`;

export default Content;
