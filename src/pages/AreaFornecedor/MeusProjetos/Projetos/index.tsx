import { useCallback, useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import {
  ContainerFiltro,
  Content,
  Filtro,
  NenhumProjetoContent,
  Body,
  Resultados,
} from './style';
import { Paginacao } from '../Paginacao';
import { dataValidation } from '../../../../utils/DateValidator';
import { addDays, format, parseISO } from 'date-fns';
import { LARANJA, VERMELHO_70 } from '../../../../styles/variaveis';
import { Titulo } from '../../../../components/Titulo';
import { Card } from '../../../../components/Card';
import { useHistory } from 'react-router-dom';
import { VscBell } from 'react-icons/vsc';

import iconSelectPosition from '../../../../assets/IconSelectPosition.svg';
import { pessoas_api } from '../../../../services/pessoas_api';

import { useAuth } from '../../../../contexts/auth';
import { Spinner } from '../../../../components/Spinner';
import { consultas_api } from '../../../../services/consultas_api';

interface IProjeto {
  id: number;
  nome: string;
  exclusivo: boolean;
  dataInicioEstimada: string;
  dataHoraInicio: string;
  dataHoraCriacao: string;
  prazoConclusao: number;
  dataHoraFim: string;
  messagesAmount?: number;
  idPropostaAceita: number;
  pessoaConsumidor: {
    id: number;
    nomeTratamento: string;
  };
  idPessoaConsumidor: number;
  status: string;
}

type ProjetoProps = {
  total: number;
  pages: number;
  values: IProjeto[];
};

interface IProps {
  pesquisaNome?: string;
}

interface IStatusProjeto {
  [status: string]: string;
}

export function Projetos({ pesquisaNome = '' }: IProps) {
  const [emAndamento, setEmAndamento] = useState(false);
  const [cancelado, setCancelado] = useState(false);
  const [concluido, setConcluido] = useState(false);
  const [desistenciaAndamento, setDesistenciaAndamento] =
    useState<boolean>(false);
  const [concluidoParcialmente, setConcluidoParcialmente] =
    useState<boolean>(false);
  const [solicitouConclusao, setSolicitouConclusao] = useState(false);
  const [prontoParaComecar, setProntoParaComecar] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [order, setOrder] = useState('&order=dataHoraCriacao');
  const [by, setBy] = useState(true);
  const statusProjeto: IStatusProjeto = {
    AGUARDANDO_INICIO: 'Pronto para começar',
    DESISTENCIA_INICIADA: 'Desistência em Andamento',
    CONCLUSAO_SOLICITADA: 'Solicitou conclusão',
    CONCLUIDO: 'Concluido',
    CANCELADO: 'Cancelado',
    INICIADO: 'Em andamento',
    CONCLUIDO_PARCIALMENTE: 'Concluido Parcialmente',
    RECEBENDO_PROPOSTAS: 'Recebendo Propostas',
    PROPOSTA_ACEITA: 'Proposta Aceita',
    AGUARDANDO_PAGAMENTO: 'Aguardando Pagamento',
    PAGAMENTO_EFETUADO: 'Pagamento Efetuado',
    STANDBY: 'Pausado',
  };

  const { user } = useAuth();

  const [meusProjetos, setMeusProjetos] = useState<IProjeto[]>([]);
  const [filtro, setFiltro] = useState('');

  const history = useHistory();

  const getProjectsMessagesAmount = useCallback(
    async (data: IProjeto[]): Promise<IProjeto[]> => {
      const newData = data.map(async (projeto: IProjeto) => {
        let {
          data: { values: messages },
        } = await pessoas_api.get(
          `/pessoas/${projeto.idPessoaConsumidor}/mensagens?filter=idProposta=${projeto.idPropostaAceita}`,
        );
        messages = messages.filter(
          (m: any) => m.pessoaDestinatario.id === user.id && !m.lida,
        );
        return { ...projeto, messagesAmount: messages.length };
      });
      return Promise.all(newData);
    },
    [user.id],
  );

  useEffect(() => {
    if (!user) return;

    let bodyToSearch: any = {
      id_pessoa_fornecedor: user.id,
    };

    if (pesquisaNome) {
      bodyToSearch.termo = pesquisaNome;
    }

    consultas_api
      .post<ProjetoProps>(
        `/consulta/oportunidades/fornecedor?limit=5${filtro}&page=${pagina}${order}${
          by ? '=desc' : '=asc'
        }`,
        bodyToSearch,
      )
      .then(async response => {
        if (!response) {
          return;
        }
        const { data } = response;
        setTotalPaginas(data.pages);

        // save projects without messages amount, and show a load
        setMeusProjetos(data.values);

        const projectsWithMessagesAmount = await getProjectsMessagesAmount(
          data.values,
        );
        setMeusProjetos(projectsWithMessagesAmount);
      });
  }, [
    by,
    filtro,
    order,
    pagina,
    getProjectsMessagesAmount,
    pesquisaNome,
    user,
  ]);

  const paginaProjeto = useCallback(
    (id: number) => {
      history.push(`/fornecedor/projeto/andamento`, { id });
    },
    [history],
  );

  useEffect(() => {
    if (
      concluido ||
      solicitouConclusao ||
      prontoParaComecar ||
      cancelado ||
      emAndamento ||
      desistenciaAndamento ||
      concluidoParcialmente
    ) {
      const tmpArray = [];
      if (concluido) {
        tmpArray.push('CONCLUIDO');
      }
      if (cancelado) {
        tmpArray.push('CANCELADO');
      }
      if (emAndamento) {
        tmpArray.push('INICIADO');
      }
      if (solicitouConclusao) {
        tmpArray.push('CONCLUSAO_SOLICITADA');
      }
      if (prontoParaComecar) {
        tmpArray.push('AGUARDANDO_INICIO');
      }
      if (desistenciaAndamento) {
        tmpArray.push('DESISTENCIA_INICIADA');
      }
      if (concluidoParcialmente) {
        tmpArray.push('CONCLUIDO_PARCIALMENTE');
      }
      setFiltro('&filter=status=' + tmpArray.join('|'));
    } else {
      setFiltro('');
    }
  }, [
    concluido,
    emAndamento,
    solicitouConclusao,
    cancelado,
    prontoParaComecar,
    desistenciaAndamento,
    concluidoParcialmente,
  ]);

  return (
    <Content>
      <Card>
        <Body>
          <Row>
            <Col lg={12}>
              <ContainerFiltro>
                <Filtro
                  checked={prontoParaComecar}
                  onClick={() => {
                    setProntoParaComecar(!prontoParaComecar);
                    setPagina(1);
                  }}
                >
                  Pronto para começar
                </Filtro>
                <Filtro
                  checked={emAndamento}
                  onClick={() => {
                    setEmAndamento(!emAndamento);
                    setPagina(1);
                  }}
                >
                  Em andamento
                </Filtro>
                <Filtro
                  checked={concluido}
                  onClick={() => {
                    setConcluido(!concluido);
                    setPagina(1);
                  }}
                >
                  Concluído
                </Filtro>
                <Filtro
                  checked={cancelado}
                  onClick={() => {
                    setCancelado(!cancelado);
                    setPagina(1);
                  }}
                >
                  Cancelado
                </Filtro>

                <Filtro
                  checked={solicitouConclusao}
                  onClick={() => {
                    setSolicitouConclusao(!solicitouConclusao);
                    setPagina(1);
                  }}
                >
                  Solicitou conclusão
                </Filtro>
                <Filtro
                  checked={desistenciaAndamento}
                  onClick={() => {
                    setDesistenciaAndamento(!desistenciaAndamento);
                    setPagina(1);
                  }}
                >
                  Desistência em andamento
                </Filtro>
                <Filtro
                  checked={concluidoParcialmente}
                  onClick={() => {
                    setConcluidoParcialmente(!concluidoParcialmente);
                    setPagina(1);
                  }}
                >
                  Concluido parcialmente
                </Filtro>
              </ContainerFiltro>
            </Col>
          </Row>

          <Resultados>
            {meusProjetos.length ? (
              <Table responsive="xl" className="table-borderless">
                <thead>
                  <tr>
                    <th></th>
                    <th>
                      <img
                        src={iconSelectPosition}
                        alt=""
                        onClick={() => {
                          setOrder('&order=nome');
                          setBy(!by);
                        }}
                      />{' '}
                      Projeto
                    </th>
                    <th>
                      <img
                        src={iconSelectPosition}
                        alt=""
                        onClick={() => {
                          setOrder('&order=dataHoraCriacao');
                          setBy(!by);
                        }}
                      />{' '}
                      Início
                    </th>
                    <th>
                      <img
                        src={iconSelectPosition}
                        alt=""
                        onClick={() => {
                          setOrder('&order=status');
                          setBy(!by);
                        }}
                      />{' '}
                      Status
                    </th>
                    <th>
                      <img
                        src={iconSelectPosition}
                        alt=""
                        onClick={() => {
                          setOrder('&order=idPessoaConsumidor');
                          setBy(!by);
                        }}
                      />
                      Cliente
                    </th>
                    <th>
                      <img
                        src={iconSelectPosition}
                        onClick={() => {
                          setOrder('&order=prazoConclusao');
                          setBy(!by);
                        }}
                        alt=""
                      />{' '}
                      Conclusão prevista
                    </th>

                    <th>
                      <img
                        src={iconSelectPosition}
                        onClick={() => {
                          setOrder('&order=dataHoraFim');
                          setBy(!by);
                        }}
                        alt=""
                      />{' '}
                      Conclusão real
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {meusProjetos.map((projeto: IProjeto) => (
                    <tr
                      onClick={() => paginaProjeto(projeto.id)}
                      key={projeto.id}
                    >
                      <td>
                        <div>
                          <VscBell color={VERMELHO_70} />
                          <div className="message-amount">
                            {projeto.messagesAmount === undefined ? (
                              <Spinner size="10px" />
                            ) : (
                              <>{projeto.messagesAmount}</>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="nome">{projeto.nome}</td>
                      <td>
                        {dataValidation(
                          projeto.dataHoraCriacao || projeto.dataInicioEstimada,
                        )}
                      </td>
                      {projeto.status === 'CRIADO' && (
                        <td>
                          <span className="label criado">
                            {statusProjeto[projeto.status]}
                          </span>
                        </td>
                      )}

                      {projeto.status === 'RECEBENDO_PROPOSTAS' && (
                        <td>
                          <span className="label recebendo-propostas">
                            {statusProjeto[projeto.status]}
                          </span>
                        </td>
                      )}

                      {projeto.status === 'PROPOSTA_ACEITA' && (
                        <td>
                          <span className="label aceita">
                            {statusProjeto[projeto.status]}
                          </span>
                        </td>
                      )}

                      {projeto.status === 'AGUARDANDO_PAGAMENTO' && (
                        <td>
                          <span className="label aguardando-pagamento">
                            {statusProjeto[projeto.status]}
                          </span>
                        </td>
                      )}

                      {projeto.status === 'PAGAMENTO_EFETUADO' && (
                        <td>
                          <span className="label pagamento-efetuado">
                            {statusProjeto[projeto.status]}
                          </span>
                        </td>
                      )}

                      {projeto.status === 'AGUARDANDO_INICIO' && (
                        <td>
                          <span className="label aguardando">
                            {statusProjeto[projeto.status]}
                          </span>
                        </td>
                      )}

                      {projeto.status === 'INICIADO' && (
                        <td>
                          <span className="label iniciado">
                            {statusProjeto[projeto.status]}
                          </span>
                        </td>
                      )}

                      {projeto.status === 'STANDBY' && (
                        <td>
                          <span className="label standby">
                            {statusProjeto[projeto.status]}
                          </span>
                        </td>
                      )}

                      {projeto.status === 'CONCLUIDO' && (
                        <td>
                          <span className="label concluido">
                            {statusProjeto[projeto.status]}
                          </span>
                        </td>
                      )}

                      {projeto.status === 'CONCLUIDO_PARCIALMENTE' && (
                        <td>
                          <span className="label concluido">
                            {statusProjeto[projeto.status]}
                          </span>
                        </td>
                      )}
                      {projeto.status === 'CANCELADO' && (
                        <td>
                          <span className="label cancelado">
                            {statusProjeto[projeto.status]}
                          </span>
                        </td>
                      )}
                      {projeto.status === 'CONCLUSAO_SOLICITADA' && (
                        <td>
                          <span className="label conclusao_solicitada">
                            Conclusão solicitada
                          </span>
                        </td>
                      )}

                      {projeto.status === 'DESISTENCIA_INICIADA' && (
                        <td>
                          <span className="label desistencia_iniciada">
                            {statusProjeto[projeto.status]}
                          </span>
                        </td>
                      )}
                      <td>{projeto?.pessoaConsumidor?.nomeTratamento}</td>

                      <td>
                        {format(
                          addDays(
                            parseISO(
                              projeto?.dataHoraCriacao ||
                                projeto?.dataInicioEstimada,
                            ),
                            Number(projeto.prazoConclusao),
                          ),
                          'dd/MM/yyyy',
                        )}
                      </td>

                      <td>
                        {projeto.dataHoraFim ? (
                          format(parseISO(projeto?.dataHoraFim), 'dd/MM/yyyy')
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <NenhumProjetoContent>
                <Titulo
                  titulo="Nenhuma projeto até o momento"
                  tamanho={22}
                  cor={LARANJA}
                  negrito
                />
              </NenhumProjetoContent>
            )}
          </Resultados>

          <Row className="mt-3">
            <Col lg={12}>
              <Paginacao
                totalPaginas={totalPaginas}
                pagina={pagina}
                setPagina={setPagina}
              />
            </Col>
          </Row>
        </Body>
      </Card>
    </Content>
  );
}
