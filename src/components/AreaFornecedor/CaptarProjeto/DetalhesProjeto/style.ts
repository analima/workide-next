import { lighten } from 'polished';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';
import {
  AZUL,
  AZUL_60,
  BRANCO,
  CINZA_40,
  LARANJA,
  PRETO_10,
  PRETO_60,
  VERDE,
} from '../../../../styles/variaveis';

const Content = styled.section``;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 16px;

  .content-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 16px;

    .content-project-info {
      display: flex;
      align-items: center;
      gap: 8px;

      h1 {
        margin: 0;
        font-weight: 400;
        font-size: 32px;
        color: ${AZUL};
        overflow: hidden; // Removendo barra de rolagem
        text-overflow: ellipsis; // Adicionando "..." ao final
        display: -webkit-box;
        -webkit-line-clamp: 3; // Quantidade de linhas
        -webkit-box-orient: vertical;
        word-break: break-word;
      }

      svg {
        width: 32px;
        height: 32px;

        @media (max-width: 768px) {
          width: 28px;
          height: 28px;
        }

        @media (max-width: 576px) {
          width: 30px;
          height: 30px;
        }

        @media (max-width: 320px) {
          width: 28px;
          height: 28px;
        }
      }
    }

    @media (max-width: 768px) {
      flex-direction: column;
      justify-content: start;
      gap: 8px;

      .content-project-info {
        h1 {
          font-size: 24px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const HeaderInfo = styled.div`
  padding: 0 46px 0px 0px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  p {
    margin-bottom: -2px;
    font-size: 12px;
    font-weight: bold;
    color: ${PRETO_10};
  }

  strong {
    color: ${VERDE};
    font-size: 18px;
  }

  span {
    color: ${PRETO_60};
  }

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

export const FaixaProBono = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 220px;
  gap: 8px;

  svg {
    width: 70px;
    height: 70px;
  }

  .voluntariado {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    > div {
      display: flex;
      flex-direction: column;
    }
    p {
      font-size: 10px;
      margin: 0;
      font-weight: bold;
    }

    span {
      font-size: 18px;
      font-weight: bold;
      color: ${AZUL};
      margin: 0;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

export const FaixaPrecoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  width: 264px;

  span {
    text-align: right;
    width: 100%;
    color: ${PRETO_10};
    font-size: 14px;
    font-weight: bold;
  }

  p {
    text-align: right;
    font-size: 10px;
    font-weight: bold;
    color: ${PRETO_10};
  }

  @media (max-width: 768px) {
    width: 100%;

    p {
      text-align: left;
    }
  }
`;

export const ContentFaixa = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

export const ValorServico = styled.div`
  display: flex;
  justify-content: flex-end;

  h1 {
    text-align: right;
    font-size: 20px;
    margin: 0;
    font-weight: bold;
    color: ${VERDE};
  }

  @media (max-width: 991px) {
    h1 {
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

export const FaixaPrecoLabel = styled.label`
  font-size: 10px;
  font-weight: 700;
  color: ${PRETO_10};
`;

export const HeaderContentButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  margin-top: 40px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }

  span {
    font-size: 18px;
    font-weight: bold;
    color: ${PRETO_10};
  }

  div {
    display: flex;
  }
`;

export const Compartilhar = styled.a`
  padding: 16px 40px;
  width: 236px;
  font-weight: bold;
  font-size: 16px;
  border: none;
  text-decoration: none;
  border-radius: 8px;
  color: ${AZUL};
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    margin-right: 8px;
  }

  @media (max-width: 1200px) {
    padding: 16px 24px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 16px 40px;
  }

  @media (max-width: 478px) {
    padding: 8px 16px;

    svg {
      display: none;
    }
  }
`;

export const Button = styled.button`
  padding: 16px 40px;
  font-weight: bold;
  width: 236px;
  font-size: 16px;
  border-radius: 8px;
  color: ${BRANCO};
  background-color: ${AZUL};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  &:hover {
    background-color: ${lighten(0.1, AZUL)};
  }

  @media (max-width: 1200px) {
    padding: 16px 24px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 16px auto;
  }

  @media (max-width: 478px) {
    padding: 8px 16px;
  }
`;

export const ContainerBody = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${AZUL_60};
  border-radius: 8px;
  padding: 16px;
  margin-top: 42px;
  gap: 40px;
`;

export const TableItens = styled(Table)`
  display: flex;
  margin-top: 40px;

  border-collapse: separate;
  border-spacing: 0 8px;
  margin-top: -8px;

  tr {
    border: 1px solid ${BRANCO};

    > td {
      &:last-child {
        width: auto;
      }
    }
  }

  td {
    width: 200px;
    padding: 10px;
    color: ${PRETO_60};
    word-break: break-word;

    strong {
      color: ${VERDE};
    }
  }

  @media (max-width: 768px) {
    tr {
      display: flex;
      flex-direction: column;
    }
  }
`;

export const LabelDefault = styled.label`
  padding: 4px 16px;
  border: solid 1px ${CINZA_40};
  border-radius: 8px;
  margin: 4px;
  color: ${CINZA_40};
  font-size: 12px;
  font-weight: bold;
`;

export const ContainerPerguntas = styled.div`
  margin-top: 40px;
`;

export const CardPergunta = styled.div`
  margin-bottom: 24px;
`;

export const CardPerguntaIndividual = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 492px) {
    flex-wrap: wrap;
  }
`;

export const CardRespostaIndividual = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const QuemPergunta = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: ${PRETO_60};
`;

export const Pergunta = styled.span`
  font-size: 16px;
  color: ${PRETO_60};
`;

export const Resposta = styled.span`
  font-size: 16px;
  color: ${PRETO_60};
`;

export const DataPergunta = styled.span`
  font-size: 14px;
  color: ${PRETO_60};
`;

export const DataResposta = styled.span`
  font-size: 14px;
  color: ${PRETO_60};
`;

export const ContainerInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;

  @media (max-width: 1000px) {
    justify-content: center;
    gap: 8px;
  }
`;

export const ButtonPergunta = styled.button`
  padding: 16px 32px;
  font-weight: bold;
  font-size: 12px;
  border: 2px solid ${AZUL};
  background-color: ${BRANCO};
  border-radius: 8px;
  color: ${AZUL};
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${AZUL};
    color: ${BRANCO};
  }

  @media (max-width: 1200px) {
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 478px) {
  }
`;

export const FotoPerfil = styled.img`
  object-fit: cover;
  width: 152px;
  height: 152px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  cursor: pointer;
  -webkit-transition: -webkit-transform 0.5s ease;
  transition: transform 0.5s ease;

  :hover {
    -webkit-transform: scale(1.03);
    transform: scale(1.03);
  }

  @media (max-width: 478px) {
    width: 100px;
    height: 100px;
    margin: 16px 0;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 16px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const NomeTitulo = styled.h3`
  color: ${AZUL};
  font-size: 20;
  font-weight: bold;
  margin: 0;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    text-align: center;
    font-size: 16px;
  }
`;

export const Avaliacao = styled.div`
  display: flex;
  align-items: center;

  span {
    color: ${LARANJA};
    margin-right: 8px;
    font-size: 16px;
  }

  .estrela {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 478px) {
    display: flex;
    justify-content: center;
  }
`;

export const SobreDrescricao = styled.p`
  text-align: justify;
  font-size: 16px;
  color: ${PRETO_10};
  word-break: break-word;

  @media (max-width: 478px) {
    margin-top: 0px;
  }
`;

export const Medalhas = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  svg {
    width: 32px;
  }

  @media (max-width: 478px) {
    display: flex;
    justify-content: center;
  }
`;

export const ContentButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 48px;
`;

export const ButtonVoltar = styled(ButtonPergunta)``;

export const InputStyled = styled.input`
  width: 100%;
  padding: 0.75rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  @media (max-width: 660px) {
    max-width: 100%;
    width: 100%;
  }
`;

export default Content;
