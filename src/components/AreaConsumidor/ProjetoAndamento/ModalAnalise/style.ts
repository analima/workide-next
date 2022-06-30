import styled from 'styled-components';

import { lighten } from 'polished';
import {
  AZUL,
  BRANCO,
  CINZA_40,
  VERDE,
  VERMELHO,
} from '../../../../styles/variaveis';

const Content = styled.div``;

export const DescricaoItem = styled.p`
  margin: 0;
  font-size: 18px;
  color: ${CINZA_40};
  font-weight: bold;

  @media (max-width: 478px) {
    text-align: center;
  }
`;

export const ContainerAcoes = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 478px) {
    justify-content: center;
  }
`;

export const Aprovar = styled.div`
  margin: 0 4px;
  color: ${VERDE};
  font-weight: bold;
  cursor: pointer;
`;

export const Negar = styled.div`
  margin: 0 4px;
  color: ${VERMELHO};
  font-weight: bold;
  cursor: pointer;
`;

export const Anular = styled.div`
  margin: 0 4px;
  color: ${AZUL};
  cursor: pointer;
  font-weight: bold;
`;

export const ContainerComentario = styled.div`
  display: flex;
  padding: 16px 42px;

  @media (max-width: 478px) {
    padding: 16px;
  }
`;

export const Comentario = styled.div``;

export const ComentarioFoto = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 16px;
  object-fit: cover;
`;

export const ComentarioNome = styled.p`
  font-weight: bold;
  color: ${CINZA_40};
  margin-bottom: 8px;
`;

export const ComentarioTexto = styled.span``;

export const ComentarioData = styled.div`
  font-size: 12px;
`;

export const ArquivoAnexadoContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  margin-top: 16px;

  @media (max-width: 478px) {
    grid-template-columns: auto;
  }
`;

export const ArquivoAnexado = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${AZUL};
  color: ${BRANCO};
  padding: 4px 8px;
  text-decoration: none;
  border-radius: 8px;
  margin: 4px;

  &:hover {
    background-color: ${lighten(0.1, AZUL)};
    color: ${BRANCO};
  }
`;

export const ContainerMensagem = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
`;

export const Mensagem = styled.div`
  width: 95%;
`;

export const MensagemAnexoIcone = styled.div`
  margin-right: 16px;
`;

export const MensagemEnviarIcone = styled.div`
  margin-left: 16px;
`;

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

export const EnviarRequisito = styled.span`
  color: ${VERDE};
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: ${lighten(0.1, VERDE)};
  }
`;

export default Content;

