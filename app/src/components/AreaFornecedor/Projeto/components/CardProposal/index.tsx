import { ChangeEvent, useCallback, useRef, useEffect, useState } from 'react';
import { Alert, Card, Col, Row } from 'react-bootstrap';
import { ModalAnalyzeReview } from '../../../../../components/ModalAnalyzeReview';
import { RequirementsList } from '../../../../../components/RequirementsList';
import { Spacer } from '../../../../../components/Spacer';

import { Titulo } from '../../../../../components/Titulo';
import { UserPanel } from '../../../../../components/UserPanel';
import {
  AZUL,
  AZUL_60,
  BRANCO,
  CINZA_20,
  CINZA_30,
  CINZA_40,
  LARANJA,
  PRETO_10,
} from '../../../../../styles/variaveis';
import IconeVoluntario  from '../../../../../assets/icon-voluntare.svg';

import {
  ButtonMainStyled,
  Container,
  ContentButtonStyled,
  ContentChatStyled,
  ContentDescription,
  ContentFooterStyled,
  ContentInputStyled,
  DescriptionStyled,
  FileStyled,
  HeaderStepsStyled,
  TitleDescriptionStyled,
  TypographyDescriptionStyled,
  TypographyFooter,
  InputStyled,
  ContentFileStyled,
  Download,
  ValorTotal,
  ContainerAnexoChat,
  Label,
  ContainerIcone,
  TextoObersavacao,
  ErrorAxexo,
  CondicoesGeraisContent,
} from './styled';
import ContentStyled from './styled';
import { FiArrowUpCircle } from 'react-icons/fi';
import { pessoas_api } from '../../../../../services/pessoas_api';
import { oportunidades_api } from '../../../../../services/oportunidades_api';
import { useHistory } from 'react-router';
import { dataValidation } from '../../../../../utils/DateValidator';
import { arquivos_api } from '../../../../../services/arquivos_api';
import {
  formatToPrice,
  handleSplitAt,
} from '../../../../../helpers/formatsHelper';
import { BsPaperclip } from 'react-icons/bs';
import { ModalInformation } from '../../../../../components/ModalInformation';
import { typeFile } from '../../../../../utils/typeFile';
import { FiXCircle } from 'react-icons/fi';
import { Skeleton } from '../../../../../components/Skeleton';
import { useAuth } from '../../../../../contexts/auth';
import { useValorProjetoPago } from '../../../../../contexts/valorProjetoPago';
import BuscarFaturaProjeto from '../../../../../utils/buscarFaturaProjeto';
import { IS_EMPTY } from 'src/const';

interface DetalhesPropostaProps {
  dataInicioEstimada: string;
  descricao: string;
  entregaveis: {
    id: number;
    descricao: string;
    status: string;
  }[];
  id: number;
  idPessoaFornecedor: number;
  idProjeto: number;
  parcelas: number;
  prazoConclusao: number;
  requisitos: {
    id: number;
    descricao: string;
    status: string;
  }[];
  condicoesGerais: string[];
  status: {
    codigo: string;
    descricao: string;
  };
  valor: number;
  totalHoras: number;
  arquivos: IAnexos[];
}

interface IAnexos {
  id: string;
  url: string;
}

interface DataProps {
  detalhesProposta: DetalhesPropostaProps;
  idConsumidor: number;
  idProjeto: number;
}

interface ListPerguntasProps {
  arquivo: {
    id: number;
    nome: string;
    url: string;
  };
  dataHoraCriacao: string;
  id: number;
  lida: boolean;
  idProposta: number;
  idPropostaEntregavel: number;
  idPropostaRequisito: number;
  pessoaDestinatario: {
    id: number;
    nome: string;
    id_arquivo: string;
  };
  pessoaRemetente: {
    id: number;
    nome: string;
    id_arquivo: string;
    nome_tratamento: string;
  };
  texto: string;
}

const CardProposal = ({
  detalhesProposta,
  idConsumidor,
  idProjeto,
}: DataProps) => {
  const [modalAnalyzeReview, setModalAnalyzeReview] = useState<boolean>(false);
  const history = useHistory();
  const [chat, setChat] = useState('');
  const [listPerguntas, setListPerguntas] = useState<ListPerguntasProps[]>(
    [] as ListPerguntasProps[],
  );
  const [loadingAnexo, setLoadingAnexo] = useState<boolean>(false);
  const [modalInformation, setModalInformation] = useState<boolean>(false);

  const { user } = useAuth();
  const { adicinarProjeto, buscarProjeto } = useValorProjetoPago();

  const [anexo, setAnexo] = useState<any[]>([]);
  const [idAnexo, setIdAnexo] = useState<string>('');
  const [statusProjeto, setStatusProjeto] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [taxa, setTaxa] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const ContainerMessagesRef = useRef<any>(null);
  const [escopo, setEscopo] = useState('');
  const [error, setError] = useState('');
  const [isProBono, setIsProBono] = useState(false);
  const [valorProjetoPago, setValorProjetoPago] = useState(0);

  useEffect(() => {
    const markMessagesLikeRead = async () => {
      for (let pergunta of listPerguntas) {
        if (!pergunta.lida && pergunta.pessoaDestinatario.id === user.id) {
          pessoas_api.patch(`/pessoas/mensagens/${pergunta.id}/lida`, {
            lida: true,
          });
        }
      }
    };
    markMessagesLikeRead();
  }, [listPerguntas, user]);

  const handleGetProjectInvoiceValue = useCallback(async () => {
    try {
      if (buscarProjeto(detalhesProposta.idProjeto)) {
        setValorProjetoPago(
          buscarProjeto(detalhesProposta.idProjeto)?.valorComTaxa || IS_EMPTY,
        );
        return;
      }
      const projetoPago = await BuscarFaturaProjeto.buscarFatura(
        idConsumidor || 0,
        detalhesProposta.idProjeto,
      );
      if (projetoPago) {
        adicinarProjeto(projetoPago);
        setValorProjetoPago(projetoPago?.valorComTaxa || IS_EMPTY);
      } else {
        const valorTotal =
          detalhesProposta.valor * (1 - 0.12) > 14
            ? detalhesProposta.valor * (1 - 0.12)
            : detalhesProposta.valor + 14;
        setValorProjetoPago(valorTotal);
      }
    } catch (error: any) {
      console.error(error);
    }
  }, [
    buscarProjeto,
    detalhesProposta.idProjeto,
    detalhesProposta.valor,
    idConsumidor,
    adicinarProjeto,
  ]);

  const BuscaMensagem = useCallback(async () => {
    try {
      handleGetProjectInvoiceValue();
      const { data } = await pessoas_api.get<{ values: ListPerguntasProps[] }>(
        `/pessoas/${idConsumidor}/mensagens?filter=idProposta=${detalhesProposta.id}&order=dataHoraCriacao=ASC`,
      );
      setListPerguntas(data.values);
    } catch (error) {
      console.log(error);
    }
  }, [detalhesProposta.id, idConsumidor, handleGetProjectInvoiceValue]);

  const handleChat = useCallback(async () => {
    if (chat === '' && !anexo) {
      return;
    }
    setIsDisabled(true);
    try {
      const { data: listPergunta } = await pessoas_api.post<ListPerguntasProps>(
        `/pessoas/${idConsumidor}/mensagens`,
        {
          texto: chat,
          id_arquivo: idAnexo ? idAnexo : undefined,
          id_proposta: detalhesProposta.id,
        },
      );
      setListPerguntas(oldState => [...oldState, listPergunta]);

      setChat('');
      setAnexo([]);
      setIdAnexo('');
      setInterval(() => {
        setIsDisabled(false);
      }, 2000);

      setTimeout(() => {
        if (ContainerMessagesRef.current) {
          ContainerMessagesRef.current.scrollTop =
            ContainerMessagesRef.current.scrollHeight;
        }
      }, 500);
    } catch (error: any) {
      console.error(error.response);
    }
  }, [anexo, chat, detalhesProposta.id, idAnexo, idConsumidor]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (idConsumidor) {
        BuscaMensagem();
      }
      if (ContainerMessagesRef.current) {
        ContainerMessagesRef.current.scrollTop =
          ContainerMessagesRef.current.scrollHeight;
      }
    }, 10000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    oportunidades_api.get(`/projetos/${Number(idProjeto)}`).then(({ data }) => {
      setStatusProjeto(data.status.codigo);
      setIsProBono(data.proBono);
      setEscopo(data.escopo);
    });
  }, [idProjeto]);

  useEffect(() => {
    BuscaMensagem();
  }, [BuscaMensagem]);

  async function handleDeleteProposta() {
    try {
      await oportunidades_api.delete(
        `/projetos/propostas/${detalhesProposta.id}`,
      );

      setModalInformation(true);
      setTimeout(() => {
        setModalInformation(false);
        history.push('/fornecedor/meus-projetos');
      }, 3000);
    } catch (err: any) {
      console.error(err.response.data);
      setError(err.response.data.message);
    }
  }

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      try {
        setLoadingAnexo(true);
        setErrorMsg('');
        if (!event.target.files) throw new Error('Nenhum arquivo selecionado');
        if (event.target.files[0].size > 5000000) {
          setLoadingAnexo(false);
          return setErrorMsg('O arquivo não pode ser maior que 5MB');
        }

        const newFile = event.target.files[0];
        const typePpxtRegex = /(?!.*[.](?:pptx|ppt)$).*/;

        if (
          (newFile && typeFile.includes(newFile.type)) ||
          typePpxtRegex.test(newFile.name)
        ) {
          const file = new FormData();
          file.append('file', newFile);
          const { data } = await arquivos_api.post('/arquivos', file);
          setIdAnexo(data.id);
          setChat(handleSplitAt(data.url) + ' ');
          setLoadingAnexo(false);
        } else {
          setLoadingAnexo(false);
        }
      } catch (err: any) {
        setLoadingAnexo(false);
        console.log(err);
      }
    },
    [],
  );

  useEffect(() => {
    const fee = detalhesProposta.valor / (1 - 0.12) - detalhesProposta.valor;
    fee > 14 ? setTaxa(fee) : setTaxa(14);
  }, [detalhesProposta.valor]);

  useEffect(() => {
    if (detalhesProposta.idProjeto) {
      oportunidades_api
        .get(`/projetos/${detalhesProposta.idProjeto}`)
        .then(({ data }) => {
          setEscopo(data.escopo);
        });
    }

    if (idProjeto) {
      oportunidades_api.get(`/projetos/${idProjeto}`).then(({ data }) => {
        setEscopo(data.escopo);
      });
    }
  }, [detalhesProposta.idProjeto, idProjeto]);

  return (
    <ContentStyled>
      <Card>
        <Container>
          {error.length ? (
            <Row>
              <Col lg={12}>
                <Alert
                  variant="danger"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  {error}
                  <FiXCircle
                    className="fechar"
                    onClick={() => setError('')}
                    size={20}
                    color="#c53030"
                  />
                </Alert>
              </Col>
              <Spacer size={30} />
            </Row>
          ) : (
            <></>
          )}
          <HeaderStepsStyled>
            {detalhesProposta.status &&
              detalhesProposta?.status.codigo === 'REVISAO' && (
                <Titulo cor={AZUL} tamanho={24} titulo="Revisão solicitada" />
              )}

            {detalhesProposta.status &&
              detalhesProposta?.status.codigo === 'AGUARDANDO_PAGAMENTO' && (
                <Titulo
                  cor={AZUL}
                  tamanho={24}
                  titulo={detalhesProposta.status.descricao}
                />
              )}

            {detalhesProposta.status &&
              detalhesProposta?.status.codigo === 'REVISADA' && (
                <Titulo cor={AZUL} tamanho={24} titulo="Proposta revisada" />
              )}

            {detalhesProposta.status &&
              detalhesProposta?.status.codigo === 'ACEITA' && (
                <Titulo cor={AZUL} tamanho={24} titulo="Proposta aceita" />
              )}

            {detalhesProposta.status &&
              detalhesProposta?.status.codigo === 'RECUSADA' && (
                <Titulo
                  cor={CINZA_30}
                  tamanho={24}
                  titulo="Proposta recusada"
                />
              )}

            {detalhesProposta.status &&
              detalhesProposta?.status.codigo === 'PROJETO_CANCELADO' && (
                <Titulo
                  cor={CINZA_30}
                  tamanho={24}
                  titulo="Proposta cancelada"
                />
              )}

            {detalhesProposta.status &&
              detalhesProposta?.status.codigo === 'ENVIADA' && (
                <Titulo cor={CINZA_30} tamanho={24} titulo="" />
              )}
            <ContentButtonStyled>
              {detalhesProposta.status &&
                detalhesProposta?.status.codigo === 'REVISAO' && (
                  <>
                    <ButtonMainStyled
                      onClick={() => handleDeleteProposta()}
                      color={'#fc7b49'}
                    >
                      Cancelar Proposta
                    </ButtonMainStyled>

                    <ButtonMainStyled
                      color={AZUL_60}
                      onClick={() => {
                        setModalAnalyzeReview(!modalAnalyzeReview);
                      }}
                    >
                      ANALISAR REVISÃO
                    </ButtonMainStyled>
                  </>
                )}

              {detalhesProposta.status &&
                detalhesProposta?.status.codigo === 'ENVIADA' && (
                  <ButtonMainStyled
                    onClick={() => handleDeleteProposta()}
                    color={'#fc7b49'}
                  >
                    Cancelar Proposta
                  </ButtonMainStyled>
                )}

              {detalhesProposta.status &&
                detalhesProposta?.status.codigo === 'REVISADA' && (
                  <ButtonMainStyled
                    onClick={() => handleDeleteProposta()}
                    color={'#fc7b49'}
                  >
                    Cancelar Proposta
                  </ButtonMainStyled>
                )}
            </ContentButtonStyled>
          </HeaderStepsStyled>
          <ContentDescription>
            <Col lg={6} className="mt-4">
              <HeaderStepsStyled>
                <div>
                  <Titulo
                    titulo="Informações das entregas"
                    cor={
                      detalhesProposta.status?.codigo === 'RECUSADA' ||
                      detalhesProposta.status?.codigo === 'CANCELADA'
                        ? CINZA_30
                        : PRETO_10
                    }
                    tamanho={25}
                  />
                  <span>
                    {detalhesProposta?.dataInicioEstimada === null
                      ? 'Inicio Imediado'
                      : dataValidation(detalhesProposta.dataInicioEstimada)}
                  </span>
                </div>
                {detalhesProposta.valor > 0 ? (
                  <ValorTotal status={detalhesProposta?.status?.codigo}>
                    {taxa ? (
                      <p>{formatToPrice(detalhesProposta.valor + taxa)}</p>
                    ) : (
                      <Skeleton width="100px" height="30px" />
                    )}
                    {detalhesProposta.parcelas > 1 ? (
                      <span>em até {detalhesProposta.parcelas}x no cartão</span>
                    ) : (
                      <span>À vista</span>
                    )}
                  </ValorTotal>
                ) : (
                  <div className="voluntariado">
                    <IconeVoluntario />
                    <span>VOLUNTÁRIO</span>
                  </div>
                )}
              </HeaderStepsStyled>
              <Spacer size={40} />
              <DescriptionStyled>
                <TitleDescriptionStyled>
                  Descrição A ser feito (Escopo)
                </TitleDescriptionStyled>
                <TypographyDescriptionStyled>
                  {detalhesProposta.descricao}
                </TypographyDescriptionStyled>
              </DescriptionStyled>
              <Spacer size={40} />

              {escopo === 'FECHADO' && (
                <>
                  <RequirementsList
                    title="Pré requisitos para entrega"
                    listItems={detalhesProposta.requisitos?.map(
                      item => item.descricao,
                    )}
                  />
                  <Spacer size={40} />
                  <RequirementsList
                    title="Métodos de Entrega ou Entregáveis"
                    listItems={detalhesProposta.entregaveis?.map(
                      item => item.descricao,
                    )}
                  />
                  <Spacer size={40} />
                </>
              )}

              <ContentFooterStyled>
                <p>
                  Combinei de entrega esse projeto em:
                  <span>
                    {detalhesProposta?.prazoConclusao}
                    {detalhesProposta?.prazoConclusao === 1 ? ' dia' : ' dias'}
                  </span>
                </p>

                {detalhesProposta.valor > 0 && (
                  <p>
                    Valor total:
                    <span>{formatToPrice(valorProjetoPago)}</span>
                  </p>
                )}

                {escopo === 'ABERTO' && (
                  <Col lg={12}>
                    <p>
                      Quantidade de horas: {''}
                      <span>{detalhesProposta.totalHoras}h</span>
                    </p>
                  </Col>
                )}

                {escopo === 'ABERTO' && !isProBono && (
                  <p>
                    O valor da minha hora é:{' '}
                    <span>
                      {formatToPrice(
                        detalhesProposta.valor / detalhesProposta.totalHoras,
                      )}
                    </span>
                  </p>
                )}

                <p>
                  Com disponibilidade:
                  <span>
                    {detalhesProposta.dataInicioEstimada === null
                      ? 'Imediada'
                      : dataValidation(detalhesProposta.dataInicioEstimada)}
                  </span>
                </p>
                <TextoObersavacao>
                  * As datas de entrega e de início do projeto, estão sujeitas a
                  alterações, conforme revisão.
                </TextoObersavacao>
              </ContentFooterStyled>
              <Spacer size={20} />
              {detalhesProposta.arquivos && (
                <TypographyFooter>
                  Enviei este arquivo como proposta
                </TypographyFooter>
              )}
              <FileStyled>
                {detalhesProposta.arquivos &&
                  detalhesProposta.arquivos.map((item: IAnexos) => (
                    <Download
                      href={item.url}
                      download
                      target="blank"
                      key={item.id}
                    >
                      {item.url.split('-')[3]}
                    </Download>
                  ))}
              </FileStyled>

              <CondicoesGeraisContent>
                <strong>
                  Condições gerais ou regras para o cancelamento do serviço
                </strong>

                <div>
                  {detalhesProposta.condicoesGerais?.map((item: string) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </CondicoesGeraisContent>
            </Col>

            <Col lg={5} className="mt-4">
              <ContentChatStyled>
                <Titulo titulo="Comentários" tamanho={25} />
                <Spacer size={20} />

                {listPerguntas.length > 0 ? (
                  <div className="area-msg" ref={ContainerMessagesRef}>
                    {listPerguntas.map(item => (
                      <>
                        <UserPanel
                          key={item.id}
                          isAnexo={!!item.arquivo}
                          image={item.pessoaRemetente?.id_arquivo}
                          name={item.pessoaRemetente.nome_tratamento}
                          text={item.arquivo ? item.arquivo.url : item.texto}
                          date={item.dataHoraCriacao}
                        />
                        <Spacer size={10} />
                      </>
                    ))}
                  </div>
                ) : (
                  <div className="area-sem-msg">
                    <Titulo
                      titulo="Não há histórico de mensagens"
                      tamanho={16}
                      cor={CINZA_40}
                    />
                  </div>
                )}

                {listPerguntas.length === 0 ||
                statusProjeto === 'CANCELADO' ||
                detalhesProposta.status?.codigo === 'RECUSADA' ||
                detalhesProposta.status?.codigo ===
                  'PROJETO_CANCELADO' ? null : (
                  <ContentInputStyled>
                    <ContentFileStyled>
                      <ContainerAnexoChat>
                        <div className="div-label">
                          <Label htmlFor="file">
                            <ContainerIcone>
                              {loadingAnexo ? (
                                <div
                                  className="spinner-border text-secundary"
                                  role="status"
                                ></div>
                              ) : (
                                <BsPaperclip color={BRANCO} />
                              )}
                            </ContainerIcone>
                          </Label>
                          <input
                            id="file"
                            name="file"
                            type="file"
                            onChange={handleFileChange}
                            disabled={
                              statusProjeto === 'CANCELADO' ||
                              detalhesProposta.status?.codigo ===
                                'PROJETO_CANCELADO'
                            }
                          />
                        </div>
                      </ContainerAnexoChat>
                      <InputStyled
                        disabled={
                          isDisabled ||
                          statusProjeto === 'CANCELADO' ||
                          detalhesProposta.status?.codigo ===
                            'PROJETO_CANCELADO'
                        }
                        value={chat}
                        type="text"
                        onKeyUp={(e: any) => {
                          if (
                            e.keyCode === 13 &&
                            statusProjeto !== 'CANCELADO'
                          ) {
                            handleChat();
                          }
                        }}
                        placeholder="Digite aqui um comentario"
                        onChange={evt => {
                          if (
                            statusProjeto === 'CANCELADO' &&
                            detalhesProposta.status?.codigo ===
                              'PROJETO_CANCELADO'
                          )
                            return;
                          setChat(evt.target.value);
                        }}
                      />
                    </ContentFileStyled>
                    <button
                      disabled={
                        isDisabled ||
                        statusProjeto === 'CANCELADO' ||
                        detalhesProposta.status?.codigo === 'PROJETO_CANCELADO'
                      }
                      onClick={() => {
                        if (statusProjeto === 'CANCELADO') return;
                        handleChat();
                      }}
                    >
                      <FiArrowUpCircle
                        size={24}
                        color={
                          statusProjeto === 'CANCELADO' ||
                          detalhesProposta.status?.codigo ===
                            'PROJETO_CANCELADO'
                            ? CINZA_20
                            : AZUL_60
                        }
                      />
                    </button>
                  </ContentInputStyled>
                )}
              </ContentChatStyled>
              <ErrorAxexo>{errorMsg}</ErrorAxexo>
            </Col>
          </ContentDescription>
        </Container>
        <ModalAnalyzeReview
          visao="fornecedor"
          showModal={modalAnalyzeReview}
          setShowModal={setModalAnalyzeReview}
          text="O Consumidor solicitou que você revise os seguintes dados:"
          title="Solicitação de Revisão de Orçamento"
          id_proposta={detalhesProposta.id}
          id_projeto={detalhesProposta.idProjeto}
        />
        <ModalInformation
          color={LARANJA}
          title="Proposta cancelada com sucesso"
          showModal={modalInformation}
        />
      </Card>
    </ContentStyled>
  );
};

export default CardProposal;
