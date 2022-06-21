import { lighten } from 'polished';
import styled from 'styled-components';
import { AZUL, BRANCO, CINZA_10 } from '../../../styles/variaveis';

interface ILabelCheck {
  checked: boolean;
}

interface IServicoImagemProps {
  url: string;
}

export const Content = styled.section`
  height: fit-content;

  .voltar-botao {
    width: 213px;
    height: 56px;
    border-radius: 8px;
    color: rgba(0, 143, 229, 1);
    border-color: rgba(0, 143, 229, 1);
    margin-left: auto;
    margin-top: 50px;

    border: 1px solid rgba(0, 143, 229, 1);
    padding: 16px 40px;
    border-radius: 10px;
    text-decoration: none;

    &:hover {
      background-color: rgba(0, 143, 229, 1);
      border-color: rgba(0, 143, 229, 1);
      color: #ffffff;
    }
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 16px 32px;
  font-weight: bold;
  color: ${BRANCO};
  background-color: ${AZUL};
  border-radius: 8px;
  border: none;

  &:hover {
    background-color: ${lighten(0.1, AZUL)};
  }

  svg {
    margin-right: 16px;
    font-size: 16px;
  }

  @media (max-width: 478px) {
    width: 100%;
    margin-top: 16px;
  }
`;

export const LabelCheck = styled.div<ILabelCheck>`
  margin: 8px;

  label {
    padding: 8px 16px;
    color: ${props => (props.checked ? BRANCO : AZUL)};
    background-color: ${props => (props.checked ? AZUL : BRANCO)};
    border-radius: 24px;
    border: solid 1px ${AZUL};
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    text-align: center;

    @media (max-width: 1400px) {
      width: 130px;
    }
  }

  input {
    display: none;
  }
`;

export const Organizar = styled.div`
  margin-left: 32px;
  text-align: right;

  > label {
    margin-right: 100px;

    @media (max-width: 1200px) {
      margin-right: 70px;
    }
  }

  > div {
    justify-content: flex-end;
    display: flex;

    @media (max-width: 390px) {
      flex-wrap: wrap;
    }
  }

  @media (max-width: 992px) {
    > label {
      margin-right: 0;
    }

    margin: 16px 8px;
    display: flex;
    align-items: center;
  }
`;

export const Servico = styled.div``;

export const ServicoTitulo = styled.div`
  & {
    cursor: pointer;
  }

  label {
    margin: 8px 0;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    span {
      display: flex;
      justify-content: center;
      font-size: 10px;
      margin: 8px 0;
    }
  }
`;

export const ServicoDescricao = styled.div`
  p {
    text-align: justify;
  }
`;

export const ServicoImagem = styled.div<IServicoImagemProps>`
  display: flex;
  justify-content: center;
  margin: 16px 0;
  border-radius: 8px;
  width: 100px;
  height: 100px;
  background-color: ${CINZA_10};
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center;
`;

export const ServicoAcao = styled.div`
  .dropdown {
    display: flex;
    justify-content: flex-end;

    button {
      box-shadow: none;
    }

    .dropdown-toggle::after {
      content: none;
    }
  }
`;

export const ServicoOpcao = styled.div`
  display: flex;
  justify-content: space-around;

  @media (max-width: 478px) {
    display: grid;
    grid-template-columns: auto auto;
  }
`;

export const Opcao = styled.div`
  margin: 4px;

  svg {
    margin-right: 4px;
  }
`;

export const Registro = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const RegistroQuantidade = styled.div`
  color: ${AZUL};
  font-weight: bold;
`;

export const Paginacao = styled.div`
  button {
    background-color: ${BRANCO};
    border: none;

    &:nth-child(1) {
      margin-right: 3px;
    }
  }
`;

export const ContainerInput = styled.div`
  width: 100%;

  @media (max-width: 1400px) {
    width: 95%;
  }
  @media (max-width: 1200px) {
    width: 90%;
  }
  @media (max-width: 992px) {
    width: 100%;
  }
`;
