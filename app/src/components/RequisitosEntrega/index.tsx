import { useCallback } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaEllipsisV } from 'react-icons/fa';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { oportunidades_api } from '../../services/oportunidades_api';
import {
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
  ContainerAcoes,
  LabelData,
  Porcentagem,
  Progresso,
  Requisito,
  RequisitoContainer,
  RequisitoDescricao,
  RequisitoProgresso,
  RequisitoStatus,
  RequisitoTitulo,
  TitleStatus,
  ContentRequisitos,
} from './style';

interface IRequisito {
  status: string;
  dataHoraUltimaAtualizacao: string;
  descricao: string;
  id: number;
}

interface IRequisitosEntregaProps {
  titulo: string;
  requisitos: IRequisito[];
  visao: 'consumidor' | 'fornecedor';
  status: string;
  idProjeto: number;
  getProjeto: () => void;
}

export const RequisitosEntrega = ({
  visao,
  titulo,
  requisitos,
  status,
  idProjeto,
  getProjeto,
}: IRequisitosEntregaProps) => {
  function handlePorcentage() {
    const total = requisitos.length;
    const aceito = requisitos.filter(i => i.status === 'ACEITO').length;
    if (total === aceito) return '100';
    const progresso = ((aceito / total) * 100).toFixed(0);
    return isNaN(Number(progresso)) ? 0 : Number(progresso);
  }
  const handleAceitar = useCallback(
    async (id: number) => {
      try {
        oportunidades_api.patch(
          `/projetos/${idProjeto}/requisitos/${id}/analisar`,
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
          `/projetos/${idProjeto}/requisitos/${id}/analisar`,
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
    [idProjeto, getProjeto],
  );

  const EnviarEntregavel = useCallback(
    async (id: number) => {
      try {
        oportunidades_api.patch(
          `/projetos/${idProjeto}/requisitos/${id}/enviar`,
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
      <RequisitoContainer>
        <RequisitoTitulo cor={status === 'INICIADO' ? VERDE : CINZA_40}>
          {titulo}
        </RequisitoTitulo>

        <RequisitoProgresso>
          <BarraProgresso>
            {status === 'INICIADO' && (
              <Progresso porcentagem={handlePorcentage()} cor={VERDE}>
                <Porcentagem>{handlePorcentage()}%</Porcentagem>
              </Progresso>
            )}
          </BarraProgresso>
        </RequisitoProgresso>
        {requisitos.map(requisito => (
          <Requisito key={requisito.id}>
            <RequisitoDescricao>{requisito.descricao}</RequisitoDescricao>

            <RequisitoStatus>
              {requisito.status === 'ACEITO' && visao === 'fornecedor' && (
                <ContentRequisitos>
                  <LabelData>
                    {dataValidation(requisito.dataHoraUltimaAtualizacao)}
                  </LabelData>
                  <FiCheckCircle size={20} color={VERDE} />
                </ContentRequisitos>
              )}

              {requisito.status === 'ACEITO' && visao === 'consumidor' && (
                <ContentRequisitos>
                  <LabelData>
                    {dataValidation(requisito.dataHoraUltimaAtualizacao)}
                  </LabelData>
                  <FiCheckCircle size={20} color={VERDE} />
                </ContentRequisitos>
              )}

              {requisito.status === 'RECUSADO' && visao === 'fornecedor' && (
                <ContentRequisitos>
                  <LabelData>
                    {dataValidation(requisito.dataHoraUltimaAtualizacao)}
                  </LabelData>
                  <FiXCircle size={20} color={VERMELHO} />
                </ContentRequisitos>
              )}

              {requisito.status === 'RECUSADO' && visao === 'consumidor' && (
                <ContainerAcoes>
                  <Dropdown>
                    <Dropdown.Toggle
                      key="toggle"
                      variant="none"
                      id="dropdown-basic"
                    >
                      <LabelData>
                        {dataValidation(requisito.dataHoraUltimaAtualizacao)}
                      </LabelData>

                      <FiXCircle color={VERMELHO} title="Recusar" size={20} />
                      <FaEllipsisV size={20} color={CINZA_40} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu key="menu">
                      <Dropdown.Item
                        key="aprovar"
                        onClick={() => EnviarEntregavel(requisito.id)}
                      >
                        Solicitar nova análise
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </ContainerAcoes>
              )}

              {requisito.status === 'EM_ANALISE' && visao === 'consumidor' && (
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

              {requisito.status === 'EM_ANALISE' && visao === 'fornecedor' && (
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
                        onClick={() => handleAceitar(requisito.id)}
                      >
                        Aprovar
                      </Dropdown.Item>
                      <Dropdown.Item
                        key="compartilhar"
                        onClick={() => handleRecusar(requisito.id)}
                      >
                        Reprovar
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </ContainerAcoes>
              )}

              {requisito.status === 'CRIADO' && visao === 'consumidor' && (
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
                        onClick={() => EnviarEntregavel(requisito.id)}
                      >
                        Solicitar análise
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </ContainerAcoes>
              )}

              {requisito.status === 'CRIADO' && visao === 'fornecedor' && (
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
            </RequisitoStatus>
          </Requisito>
        ))}
      </RequisitoContainer>
    </Container>
  );
};
