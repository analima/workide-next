import { useCallback, useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import {
  ContainerFiltro,
  Content,
  Filtro,
  Body,
  Resultados,
  NenhumProjetoContent,
} from './style';
import Image from 'next/image'
import SeloExlusivo from '../../../../assets/exclusive.svg';
import { Paginacao } from '../Paginacao';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import { Card } from '../../../../components/Card';
import { addDays, format, parseISO } from 'date-fns';
import { Titulo } from '../../../../components/Titulo';
import { LARANJA, VERMELHO_70 } from '../../../../styles/variaveis';
import { dataValidation } from '../../../../utils/DateValidator';
import iconSelectPosition from '../../../../assets/IconSelectPosition.svg';
import { useHistory } from 'react-router-dom';
import { pessoas_api } from '../../../../services/pessoas_api';
import { useAuth } from '../../../../contexts/auth';
import { VscBell } from 'react-icons/vsc';
import { Spinner } from '../../../../components/Spinner';

interface IPropostas {
  id: number;
  idProjeto: number;
  nome: string;
  exclusivo: boolean;
  dataInicioEstimada: string;
  dataHoraCriacao: string;
  prazoConclusao: number;
  messagesAmount?: number;
  status: {
    codigo: string;
    descricao: string;
  };
  fornecedorSelecionado: boolean;

  projeto: {
    nome: string;
    pessoaConsumidor: {
      nomeTratamento: string;
      id: number;
      nome: string;
    };
  };
}

type PropostaProps = {
  total: number;
  pages: number;
  values: IPropostas[];
};

export function Propostas() {
  const [enviada, setEnviada] = useState(false);
  const [aguardandoPagamento, setAguardandoPagamento] = useState(false);
  const [recusada, setRecusada] = useState(false);
  const [revisaoEnviada, setRevisaoEnviada] = useState(false);
  const [pausado, setPausado] = useState(false);
  const [cancelado, setCancelado] = useState(false);
  const [paraRevisar, setParaRevisar] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [filtro, setFiltro] = useState('&filter=status.codigo_notIn=ACEITA');
  const [order, setOrder] = useState('&order=dataHoraUltimaAtualizacao');
  const [by, setBy] = useState(true);

  const { user } = useAuth();

  const [minhasPropostas, setMinhasPropostas] = useState<IPropostas[]>([]);
  const history = useHistory();

  const getPropostaMessagesAmount = useCallback(
    async (data: IPropostas[]): Promise<IPropostas[]> => {
      const newData = data.map(async (proposta: IPropostas) => {
        let {
          data: { values: messages },
        } = await pessoas_api.get(
          `/pessoas/${proposta.projeto.pessoaConsumidor.id}/mensagens?filter=idProposta=${proposta.id}`,
        );
        messages = messages.filter(
          (m: any) => m.pessoaDestinatario.id === user.id && !m.lida,
        );
        return { ...proposta, messagesAmount: messages.length };
      });
      return Promise.all(newData);
    },
    [user.id],
  );

  useEffect(() => {
    oportunidades_api
      .get<PropostaProps>(
        `/projetos/propostas?limit=5${filtro}&page=${pagina}${order}${
          by ? '=desc' : '=asc'
        }`,
      )
      .then(async response => {
        if (!response) {
          return;
        }
        const { data } = response;
        setMinhasPropostas(data.values);
        setTotalPaginas(data.pages);

        const proposta = await getPropostaMessagesAmount(data.values);
        setMinhasPropostas(proposta);
      });
  }, [by, filtro, order, pagina, getPropostaMessagesAmount]);

  const paginaProposta = useCallback(
    async (proposta: IPropostas) => {
      history.push('/fornecedor/propostas', {
        idProposta: proposta.id,
        idProjeto: proposta.idProjeto,
      });
    },
    [history],
  );

  useEffect(() => {
    if (
      enviada ||
      aguardandoPagamento ||
      recusada ||
      revisaoEnviada ||
      paraRevisar
    ) {
      const tmpArray = [];
      if (enviada) {
        tmpArray.push('ENVIADA');
      }
      if (aguardandoPagamento) {
        tmpArray.push('AGUARDANDO_PAGAMENTO');
      }
      if (recusada) {
        tmpArray.push('CANCELADA');
      }
      if (revisaoEnviada) {
        tmpArray.push('REVISAO_ENVIADA');
      }
      if (paraRevisar) {
        tmpArray.push('REVISAO');
      }
      if (pausado) {
        tmpArray.push('REVISAO');
      }
      if (cancelado) {
        tmpArray.push('REVISAO');
      }
      setFiltro(
        `&filter=status.codigo_notIn=ACEITA,status.codigo=${tmpArray.join(
          '|',
        )}`,
      );
    } else {
      setFiltro('&filter=status.codigo_notIn=ACEITA');
    }
  }, [
    enviada,
    aguardandoPagamento,
    recusada,
    revisaoEnviada,
    paraRevisar,
    pausado,
    cancelado,
  ]);

  return (
    <Content>
      <Card>
        <Body>
          <Row>
            <Col lg={12}>
              <ContainerFiltro>
                <Filtro
                  checked={enviada}
                  onClick={() => {
                    setEnviada(!enviada);
                    setPagina(1);
                  }}
                >
                  Enviada
                </Filtro>
                <Filtro
                  checked={aguardandoPagamento}
                  onClick={() => {
                    setAguardandoPagamento(!aguardandoPagamento);
                    setPagina(1);
                  }}
                >
                  Aguardando Pagamento
                </Filtro>
                <Filtro
                  checked={recusada}
                  onClick={() => {
                    setRecusada(!recusada);
                    setPagina(1);
                  }}
                >
                  Recusada
                </Filtro>
                <Filtro
                  checked={revisaoEnviada}
                  onClick={() => {
                    setRevisaoEnviada(!revisaoEnviada);
                    setPagina(1);
                  }}
                >
                  Revisão Enviada
                </Filtro>
                <Filtro
                  checked={paraRevisar}
                  onClick={() => {
                    setParaRevisar(!paraRevisar);
                    setPagina(1);
                  }}
                >
                  Para Revisar
                </Filtro>
                <Filtro
                  checked={pausado}
                  onClick={() => {
                    setPausado(!pausado);
                    setPagina(1);
                  }}
                >
                  Pausado
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
              </ContainerFiltro>
            </Col>
          </Row>

          <Resultados>
            {minhasPropostas.length ? (
              <Table responsive="xl" className="table-borderless">
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th>
                      <Image
                        src={iconSelectPosition}
                        alt=""
                        onClick={() => {
                          setOrder('&order=projeto.nome');
                          setBy(!by);
                        }}
                      />{' '}
                      Projeto
                    </th>
                    <th>
                      <Image
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
                    <th>
                      <Image
                        src={iconSelectPosition}
                        alt=""
                        onClick={() => {
                          setOrder('&order=projeto.idPessoaConsumidor');
                          setBy(!by);
                        }}
                      />{' '}
                      Cliente
                    </th>
                    <th>
                      <Image
                        src={iconSelectPosition}
                        alt=""
                        onClick={() => {
                          setOrder('&order=prazoConclusao');
                          setBy(!by);
                        }}
                      />{' '}
                      Conclusão
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {minhasPropostas.map((proposta: IPropostas) => (
                    <tr
                      onClick={() => paginaProposta(proposta)}
                      key={proposta.id}
                    >
                      <td>
                        <div>
                          <VscBell color={VERMELHO_70} />
                          <div className="message-amount">
                            {proposta.messagesAmount === undefined ? (
                              <Spinner size="10px" />
                            ) : (
                              <>{proposta.messagesAmount}</>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        {proposta.fornecedorSelecionado ? (
                          <SeloExlusivo />
                        ) : (
                          ' '
                        )}
                      </td>
                      <td className="nome">{proposta.projeto.nome}</td>
                      <td>
                        {dataValidation(
                          proposta.dataHoraCriacao ||
                            proposta.dataInicioEstimada,
                        )}
                      </td>
                      {proposta.status.codigo === 'CRIADO' && (
                        <td>
                          <span className="label criado">
                            {proposta.status.descricao}
                          </span>
                        </td>
                      )}

                      {proposta.status.codigo === 'ACEITA' && (
                        <td>
                          <span className="label criado">
                            {proposta.status.descricao}
                          </span>
                        </td>
                      )}

                      {proposta.status.codigo === 'RECEBENDO_PROPOSTAS' && (
                        <td>
                          <span className="label recebendo-propostas">
                            {proposta.status.descricao}
                          </span>
                        </td>
                      )}

                      {proposta.status.codigo === 'ENVIADA' && (
                        <td>
                          <span className="label recebendo-propostas">
                            {proposta.status.descricao}
                          </span>
                        </td>
                      )}

                      {proposta.status.codigo === 'PROPOSTA_ACEITA' && (
                        <td>
                          <span className="label aceita">
                            {proposta.status.descricao}
                          </span>
                        </td>
                      )}

                      {proposta.status.codigo === 'AGUARDANDO_PAGAMENTO' && (
                        <td>
                          <span className="label aguardando-pagamento">
                            {proposta.status.descricao}
                          </span>
                        </td>
                      )}

                      {proposta.status.codigo === 'PAGAMENTO_EFETUADO' && (
                        <td>
                          <span className="label pagamento-efetuado">
                            {proposta.status.descricao}
                          </span>
                        </td>
                      )}

                      {proposta.status.codigo === 'AGUARDANDO_INICIO' && (
                        <td>
                          <span className="label aguardando">
                            {proposta.status.descricao}
                          </span>
                        </td>
                      )}

                      {proposta.status.codigo === 'PROJETO_INICIADO' && (
                        <td>
                          <span className="label iniciado">
                            {proposta.status.descricao}
                          </span>
                        </td>
                      )}

                      {proposta.status.codigo === 'STANDBY' && (
                        <td>
                          <span className="label standby">
                            {proposta.status.descricao}
                          </span>
                        </td>
                      )}

                      {proposta.status.codigo === 'CONCLUIDO_PARCIALMENTE' && (
                        <td>
                          <span className="label concluido">
                            {proposta.status.descricao}
                          </span>
                        </td>
                      )}

                      {proposta.status.codigo === 'REVISAO' && (
                        <td>
                          <span className="label revisao">
                            {proposta.status.descricao}
                          </span>
                        </td>
                      )}

                      {proposta.status.codigo === 'REVISADA' && (
                        <td>
                          <span className="label revisao">
                            {proposta.status.descricao}
                          </span>
                        </td>
                      )}

                      {proposta.status.codigo === 'RECUSADA' && (
                        <td>
                          <span className="label recusada">
                            {proposta.status.descricao}
                          </span>
                        </td>
                      )}

                      {proposta.status.codigo === 'CANCELADA' && (
                        <td>
                          <span className="label cancelada">
                            {proposta.status.descricao}
                          </span>
                        </td>
                      )}

                      {proposta.status.codigo === 'PROJETO_CANCELADO' && (
                        <td>
                          <span className="label cancelada">
                            {proposta.status.descricao}
                          </span>
                        </td>
                      )}
                      <td>
                        {proposta.projeto.pessoaConsumidor.nomeTratamento}
                      </td>

                      <td>
                        {format(
                          addDays(
                            parseISO(
                              proposta.dataHoraCriacao ||
                                proposta.dataInicioEstimada,
                            ),
                            Number(proposta.prazoConclusao),
                          ),
                          'dd/MM/yyyy',
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <NenhumProjetoContent>
                <Titulo
                  titulo="Nenhuma proposta até o momento"
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
