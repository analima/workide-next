import { useCallback } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaEllipsisV } from 'react-icons/fa';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { oportunidades_api } from '../../services/oportunidades_api';
import {
  AZUL,
  CINZA_30,
  CINZA_40,
  LARANJA,
  VERDE,
  VERMELHO,
} from '../../styles/variaveis';
import { dataValidation } from '../../utils/DateValidator';
import {
  BarraProgresso,
  Container,
  LabelData,
  Porcentagem,
  Progresso,
  Metodo,
  MetodoContainer,
  MetodoDescricao,
  MetodoProgresso,
  MetodoStatus,
  MetodoTitulo,
  ContainerAcoes,
  TitleStatus,
  ContentRequisitos,
} from './style';

interface IMetodo {
  status: string;
  dataHoraUltimaAtualizacao: string;
  descricao: string;
  id: number;
}

interface IMetodosEntregaProps {
  titulo: string;
  metodos: IMetodo[];
  visao: 'consumidor' | 'fornecedor';
  status: string;
  idProjeto: number;
  getProjeto: () => void;
}

export const MetodosEntrega = ({
  visao,
  titulo,
  metodos,
  status,
  idProjeto,
  getProjeto,
}: IMetodosEntregaProps) => {
  function handlePorcentage() {
    const total = metodos.length;
    const aceito = metodos.filter(i => i.status === 'ACEITO').length;
    const progresso = ((aceito / total) * 100).toFixed(0);
    return progresso;
  }
  const handleAceitar = useCallback(
    async (id: number) => {
      try {
        oportunidades_api.patch(
          `/projetos/${idProjeto}/entregaveis/${id}/analisar`,
          {
            status: 'ACEITO',
          },
        );
        setTimeout(() => {
          getProjeto();
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    },
    [idProjeto, getProjeto],
  );

  const handleRecusar = useCallback(
    async (id: number) => {
      try {
        oportunidades_api.patch(
          `/projetos/${idProjeto}/entregaveis/${id}/analisar`,
          {
            status: 'RECUSADO',
          },
        );
        setTimeout(() => {
          getProjeto();
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    },
    [getProjeto, idProjeto],
  );

  const EnviarEntregavel = useCallback(
    async (id: number) => {
      try {
        oportunidades_api.patch(
          `/projetos/${idProjeto}/entregaveis/${id}/enviar`,
        );
        setTimeout(() => {
          getProjeto();
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    },
    [idProjeto, getProjeto],
  );

  return (
    <Container>
      <MetodoContainer>
        <MetodoTitulo cor={status === 'INICIADO' ? AZUL : CINZA_40}>
          {titulo}
        </MetodoTitulo>

        <MetodoProgresso>
          <BarraProgresso>
            {status === 'INICIADO' && (
              <Progresso porcentagem={handlePorcentage()} cor={AZUL}>
                <Porcentagem>{handlePorcentage()}%</Porcentagem>
              </Progresso>
            )}
          </BarraProgresso>
        </MetodoProgresso>

        {metodos.map(metodo => (
          <Metodo key={metodo.id}>
            <MetodoDescricao>{metodo.descricao}</MetodoDescricao>

            <MetodoStatus>
              {metodo.status === 'ACEITO' && visao === 'consumidor' && (
                <ContentRequisitos>
                  <LabelData>
                    {dataValidation(metodo.dataHoraUltimaAtualizacao)}
                  </LabelData>
                  <FiCheckCircle size={20} color={VERDE} />
                </ContentRequisitos>
              )}

              {metodo.status === 'ACEITO' && visao === 'fornecedor' && (
                <ContentRequisitos>
                  <LabelData>
                    {dataValidation(metodo.dataHoraUltimaAtualizacao)}
                  </LabelData>
                  <FiCheckCircle size={20} color={VERDE} />
                </ContentRequisitos>
              )}

              {metodo.status === 'RECUSADO' && visao === 'consumidor' && (
                <ContentRequisitos>
                  <LabelData>
                    {dataValidation(metodo.dataHoraUltimaAtualizacao)}
                  </LabelData>
                  <FiXCircle size={20} color={VERMELHO} />
                </ContentRequisitos>
              )}

              {metodo.status === 'RECUSADO' && visao === 'fornecedor' && (
                <ContainerAcoes>
                  <Dropdown>
                    <Dropdown.Toggle
                      key="toggle"
                      variant="none"
                      id="dropdown-basic"
                    >
                      <LabelData>
                        {dataValidation(metodo.dataHoraUltimaAtualizacao)}
                      </LabelData>

                      <FiXCircle color={VERMELHO} title="Recusar" size={20} />
                      <FaEllipsisV size={20} color={CINZA_40} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu key="menu">
                      <Dropdown.Item
                        key="aprovar"
                        onClick={() => EnviarEntregavel(metodo.id)}
                      >
                        Solicitar nova análise
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </ContainerAcoes>
              )}

              {metodo.status === 'EM_ANALISE' && visao === 'fornecedor' && (
                <ContainerAcoes>
                  <Dropdown>
                    <Dropdown.Toggle
                      key="toggle"
                      variant="none"
                      id="dropdown-basic"
                      disabled
                    >
                      <TitleStatus cor={LARANJA}>Em análise</TitleStatus>

                      <FaEllipsisV size={20} color={CINZA_40} />
                    </Dropdown.Toggle>
                  </Dropdown>
                </ContainerAcoes>
              )}

              {metodo.status === 'EM_ANALISE' && visao === 'consumidor' && (
                <ContainerAcoes>
                  <Dropdown>
                    <Dropdown.Toggle
                      key="toggle"
                      variant="none"
                      id="dropdown-basic"
                      disabled={
                        status === 'CONCLUIDO' ||
                        status === 'CONCLUIDO_PARCIALMENTE' ||
                        status === 'AGUARDANDO_INICIO' ||
                        status === 'CANCELADO' ||
                        status === 'DESISTENCIA_INICIADA'
                      }
                    >
                      <TitleStatus cor={LARANJA}>Analisar</TitleStatus>
                      <FaEllipsisV size={20} color={CINZA_40} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu key="menu">
                      <Dropdown.Item
                        key="aprovar"
                        onClick={() => handleAceitar(metodo.id)}
                      >
                        Aprovar
                      </Dropdown.Item>
                      <Dropdown.Item
                        key="compartilhar"
                        onClick={() => handleRecusar(metodo.id)}
                      >
                        Reprovar
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </ContainerAcoes>
              )}

              {metodo.status === 'CRIADO' && visao === 'fornecedor' && (
                <ContainerAcoes>
                  <Dropdown>
                    <Dropdown.Toggle
                      key="toggle"
                      variant="none"
                      id="dropdown-basic"
                      disabled={
                        status === 'CONCLUIDO' ||
                        status === 'CONCLUIDO_PARCIALMENTE' ||
                        status === 'AGUARDANDO_INICIO' ||
                        status === 'CANCELADO' ||
                        status === 'DESISTENCIA_INICIADA'
                      }
                    >
                      <TitleStatus cor={CINZA_30}> Aguardando...</TitleStatus>
                      <FaEllipsisV size={20} color={CINZA_40} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu key="menu">
                      <Dropdown.Item
                        key="aprovar"
                        onClick={() => EnviarEntregavel(metodo.id)}
                      >
                        Solicitar análise
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </ContainerAcoes>
              )}

              {metodo.status === 'CRIADO' && visao === 'consumidor' && (
                <ContainerAcoes>
                  <Dropdown>
                    <Dropdown.Toggle
                      key="toggle"
                      variant="none"
                      id="dropdown-basic"
                      disabled
                    >
                      <TitleStatus cor={CINZA_30}> Aguardando...</TitleStatus>
                      <FaEllipsisV size={20} color={CINZA_40} />
                    </Dropdown.Toggle>
                  </Dropdown>
                </ContainerAcoes>
              )}
            </MetodoStatus>
          </Metodo>
        ))}
      </MetodoContainer>
    </Container>
  );
};
