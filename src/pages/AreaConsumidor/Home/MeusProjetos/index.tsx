import { useCallback, useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { Card } from '../../../../components/Card';
import { Titulo } from '../../../../components/Titulo';
import iconSelectPosition from '../../../../assets/IconSelectPosition.svg';
import { Skeleton } from '../../../../components/Skeleton';
import { Spinner } from '../../../../components/Spinner';
import Image from 'next/image'
import { LARANJA, VERMELHO_70 } from '../../../../styles/variaveis';
import {
  Header,
  Body,
  Resultados,
  NenhumProjetoContent,
  FiltrosContainer,
  Filtro,
} from './style';
import Content from './style';
import { useQuery } from '../../../../hooks/geral';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import { dataValidation } from '../../../../utils/DateValidator';
import { useHistory } from 'react-router';
import Paginacao  from './Paginacao';
import { pessoas_api } from '../../../../services/pessoas_api';
import { useAuth } from '../../../../contexts/auth';
import { VscBell } from 'react-icons/vsc';

interface IProjeto {
  id: number;
  nome: string;
  dataInicioEstimada: string;
  dataHoraCriacao: string;
  dataHoraInicio: string;
  dataHoraUltimaAtualizacao: string;
  dataHoraFim: string;
  prazoConclusao: number;
  idPessoaConsumidor: number;
  idPessoaFornecedor?: number;
  messagesAmount: number;
  propostaAceita?: {
    id: number;
  };
  status: {
    codigo: string;
    descricao: string;
  };
}

type FiltroType = {
  [key: string]: boolean;
};

type PropostaProps = {
  total: number;
  pages: number;
  values: IProjeto[];
};

export default function MeusProjetos() {
  const query = useQuery();
  const [filtro, setFiltro] = useState<FiltroType>({
    AGUARDANDO_INICIO: false,
    AGUARDANDO_PAGAMENTO: false,
    CANCELADO: false,
    CONCLUIDO: false,
    INICIADO: false,
    ORCAMENTO_ENVIADO: false,
    RECEBENDO_PROPOSTAS: false,
    PAUSADO: false,
    CONCLUSAO_SOLICITADA: false,
    CONCLUIDO_PARCIALMENTE: false,
    DESISTENCIA_INICIADA: false,
  });

  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [order, setOrder] = useState('&order=dataHoraUltimaAtualizacao');
  const [by, setBy] = useState(false);
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const [meusProjetos, setMeusProjetos] = useState<Array<IProjeto>>(
    [] as Array<IProjeto>,
  );
  const history = useHistory();

  const paginaProjeto = useCallback(
    (id: number) => {
      history.push(`/consumidor/projeto/andamento`, { id });
    },
    [history],
  );

  const handleSetFiltro = useCallback((key: any) => {
    setFiltro(oldFiltro => ({
      ...oldFiltro,
      [key]: !oldFiltro[key],
    }));
    setPagina(1);
  }, []);

  const getProjectsMessagesAmount = useCallback(
    async (data: IProjeto[]) => {
      const newData = data.map(async (projeto: IProjeto) => {
        const {
          data: { values: proposals },
        } = await oportunidades_api.get(
          `/projetos/${projeto.id}/propostas?limit=0`,
        );

        let messagesAmount = 0;

        for (const proposal of proposals) {
          try {
            const {
              data: { values: messages },
            } = await pessoas_api.get(
              `/pessoas/${proposal.idPessoaFornecedor}/mensagens?filter=idProposta=${proposal.id}`,
            );
            const messagesToUserLogged = messages.filter(
              (m: any) => m.pessoaDestinatario.id === user.id && !m.lida,
            );
            messagesAmount += messagesToUserLogged.length;
          } catch (error) {
            console.log(error);
          }
        }

        return { ...projeto, messagesAmount };
      });

      return Promise.all(newData);
    },
    [user.id],
  );

  useEffect(() => {
    setLoading(true);
    const filtroArray = Object.keys(filtro).filter(key => filtro[key]);
    const filtroQuery = `&filter=status.codigo=${filtroArray.join('|')}`;
    oportunidades_api
      .get<PropostaProps>(
        `/projetos/consumidor?limit=5${
          filtroArray.length ? filtroQuery : ''
        }&page=${pagina}${order}${by ? '=asc' : '=desc'}`,
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
        setLoading(false);
      });

    const section = query.get('section');
    if (section === 'meus-projetos') {
      if (window.innerWidth > 768) {
        window.scrollTo(0, 800);
      } else {
        window.scrollTo(0, 1400);
      }
    }
  }, [by, filtro, order, pagina, query, getProjectsMessagesAmount]);

  return (
    <Content id="meus-projetos">
      <Card>
        <Header>
          <Titulo titulo="Meus projetos" negrito={false} />
        </Header>

        <Body>
          <FiltrosContainer>
            <p>Exibir projetos que estão:</p>

            <Filtro
              checked={filtro.RECEBENDO_PROPOSTAS}
              onClick={() => handleSetFiltro('RECEBENDO_PROPOSTAS')}
            >
              Recebendo propostas
            </Filtro>

            <Filtro
              checked={filtro.INICIADO}
              onClick={() => handleSetFiltro('INICIADO')}
            >
              Em andamento
            </Filtro>
            <Filtro
              checked={filtro.CONCLUIDO}
              onClick={() => handleSetFiltro('CONCLUIDO')}
            >
              Concluído
            </Filtro>
            <Filtro
              checked={filtro.CANCELADO}
              onClick={() => handleSetFiltro('CANCELADO')}
            >
              Cancelado
            </Filtro>
            <Filtro
              checked={filtro.PAUSADO}
              onClick={() => handleSetFiltro('PAUSADO')}
            >
              Pausado
            </Filtro>
            <Filtro
              checked={filtro.AGUARDANDO_INICIO}
              onClick={() => handleSetFiltro('AGUARDANDO_INICIO')}
            >
              Aguardando início
            </Filtro>
            <Filtro
              checked={filtro.AGUARDANDO_PAGAMENTO}
              onClick={() => handleSetFiltro('AGUARDANDO_PAGAMENTO')}
            >
              Aguardando pagamento
            </Filtro>

            <Filtro
              checked={filtro.ORCAMENTO_ENVIADO}
              onClick={() => handleSetFiltro('ORCAMENTO_ENVIADO')}
            >
              Orçamento enviado
            </Filtro>
            <Filtro
              checked={filtro.CONCLUSAO_SOLICITADA}
              onClick={() => handleSetFiltro('CONCLUSAO_SOLICITADA')}
            >
              Informou Conclusão
            </Filtro>
            <Filtro
              checked={filtro.CONCLUIDO_PARCIALMENTE}
              onClick={() => handleSetFiltro('CONCLUIDO_PARCIALMENTE')}
            >
              Concluido parcialmente
            </Filtro>
            <Filtro
              checked={filtro.DESISTENCIA_INICIADA}
              onClick={() => handleSetFiltro('DESISTENCIA_INICIADA')}
            >
              Desistência em andamento
            </Filtro>
          </FiltrosContainer>

          <Resultados>
            {meusProjetos.length ? (
              <Table responsive="xl" className="table-borderless">
                <thead>
                  <tr>
                    <th></th>
                    <th>
                      {' '}
                      <Image
                        src={iconSelectPosition}
                        alt=""
                        onClick={() => {
                          setOrder('&order=projeto.nome');
                          setBy(!by);
                        }}
                      />{' '}
                      Nome
                    </th>
                    <th>
                      {' '}
                      <Image
                        src={iconSelectPosition}
                        alt=""
                        onClick={() => {
                          setOrder('&order=dataHoraCriacao');
                          setBy(!by);
                        }}
                      />{' '}
                      Publicado em
                    </th>
                    <th>
                      {' '}
                      <Image
                        src={iconSelectPosition}
                        alt=""
                        onClick={() => {
                          setOrder('&order=dataInicioEstimada');
                          setBy(!by);
                        }}
                      />{' '}
                      Início em
                    </th>
                    <th>
                      {' '}
                      <Image
                        src={iconSelectPosition}
                        alt=""
                        onClick={() => {
                          setOrder('&order=dataHoraFim');
                          setBy(!by);
                        }}
                      />{' '}
                      Concluído em
                    </th>
                    <th>
                      {' '}
                      <Image
                        src={iconSelectPosition}
                        alt=""
                        onClick={() => {
                          setOrder('&order=status.codigo');
                          setBy(!by);
                        }}
                      />{' '}
                      Status
                    </th>
                  </tr>
                </thead>
                {meusProjetos.map(obj => {
                  return (
                    <tbody key={obj.id}>
                      <tr onClick={() => paginaProjeto(obj.id)} key={obj.id}>
                        <td>
                          <div>
                            {loading ? (
                              <Skeleton width="17px" height="17px" />
                            ) : (
                              <>
                                <VscBell color={VERMELHO_70} />
                                <div className="message-amount">
                                  {obj.messagesAmount === undefined ? (
                                    <Spinner size="10px" />
                                  ) : (
                                    <>{obj.messagesAmount}</>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="nome">
                          {loading ? (
                            <Skeleton width="16px" height="16px" />
                          ) : (
                            obj.nome
                          )}
                        </td>
                        <td>
                          {loading ? (
                            <Skeleton width="16px" height="16px" />
                          ) : (
                            dataValidation(obj.dataHoraCriacao)
                          )}
                        </td>
                        <td>
                          {loading ? (
                            <Skeleton width="16px" height="16px" />
                          ) : obj.dataHoraInicio ? (
                            dataValidation(obj.dataHoraInicio)
                          ) : (
                            '-'
                          )}
                        </td>
                        <td>
                          {loading ? (
                            <Skeleton width="16px" height="16px" />
                          ) : obj.status.codigo === 'CONCLUIDO' ? (
                            dataValidation(obj.dataHoraFim)
                          ) : (
                            '-'
                          )}
                        </td>
                        {obj.status.codigo === 'CRIADO' && (
                          <td>
                            {loading ? (
                              <Skeleton width="16px" height="16px" />
                            ) : (
                              <span className="label criado">
                                {obj.status.descricao}
                              </span>
                            )}
                          </td>
                        )}
                        {obj.status.codigo === 'RECEBENDO_PROPOSTAS' && (
                          <td>
                            {loading ? (
                              <Skeleton width="16px" height="16px" />
                            ) : (
                              <span className="label recebendo-propostas">
                                {obj.status.descricao}
                              </span>
                            )}
                          </td>
                        )}
                        {obj.status.codigo === 'PROPOSTA_ACEITA' && (
                          <td>
                            {loading ? (
                              <Skeleton width="16px" height="16px" />
                            ) : (
                              <span className="label aceita">
                                {obj.status.descricao}
                              </span>
                            )}
                          </td>
                        )}
                        {obj.status.codigo === 'AGUARDANDO_PAGAMENTO' && (
                          <td>
                            {loading ? (
                              <Skeleton width="16px" height="16px" />
                            ) : (
                              <span className="label aguardando-pagamento">
                                {obj.status.descricao}
                              </span>
                            )}
                          </td>
                        )}
                        {obj.status.codigo === 'PAGAMENTO_EFETUADO' && (
                          <td>
                            {loading ? (
                              <Skeleton width="16px" height="16px" />
                            ) : (
                              <span className="label pagamento-efetuado">
                                {obj.status.descricao}
                              </span>
                            )}
                          </td>
                        )}
                        {obj.status.codigo === 'AGUARDANDO_INICIO' && (
                          <td>
                            {loading ? (
                              <Skeleton width="16px" height="16px" />
                            ) : (
                              <span className="label aguardando">
                                {obj.status.descricao}
                              </span>
                            )}
                          </td>
                        )}
                        {obj.status.codigo === 'INICIADO' && (
                          <td>
                            {loading ? (
                              <Skeleton width="16px" height="16px" />
                            ) : (
                              <span className="label iniciado">
                                {obj.status.descricao}
                              </span>
                            )}
                          </td>
                        )}
                        {obj.status.codigo === 'PAUSADO' && (
                          <td>
                            {loading ? (
                              <Skeleton width="16px" height="16px" />
                            ) : (
                              <span className="label pausado">
                                {obj.status.descricao}
                              </span>
                            )}
                          </td>
                        )}
                        {obj.status.codigo === 'CONCLUIDO' && (
                          <td>
                            {loading ? (
                              <Skeleton width="16px" height="16px" />
                            ) : (
                              <span className="label concluido">
                                {obj.status.descricao}
                              </span>
                            )}
                          </td>
                        )}

                        {obj.status.codigo === 'CONCLUIDO_PARCIALMENTE' && (
                          <td>
                            {loading ? (
                              <Skeleton width="16px" height="16px" />
                            ) : (
                              <span className="label concluido">
                                {obj.status.descricao}
                              </span>
                            )}
                          </td>
                        )}
                        {obj.status.codigo === 'CANCELADO' && (
                          <td>
                            {loading ? (
                              <Skeleton width="16px" height="16px" />
                            ) : (
                              <span className="label cancelado">
                                {obj.status.descricao}
                              </span>
                            )}
                          </td>
                        )}

                        {obj.status.codigo === 'CONCLUSAO_SOLICITADA' && (
                          <td>
                            {loading ? (
                              <Skeleton width="16px" height="16px" />
                            ) : (
                              <span className="label conclusao-solicitada">
                                {obj.status.descricao}
                              </span>
                            )}
                          </td>
                        )}

                        {obj.status.codigo === 'DESISTENCIA_INICIADA' && (
                          <td>
                            {loading ? (
                              <Skeleton width="16px" height="16px" />
                            ) : (
                              <span className="label desistencia_iniciada">
                                {obj.status.descricao}
                              </span>
                            )}
                          </td>
                        )}
                      </tr>
                    </tbody>
                  );
                })}
              </Table>
            ) : (
              <NenhumProjetoContent>
                <Titulo
                  titulo="Você não tem nada aqui. "
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
