import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Card, Col } from 'react-bootstrap';
import { ModalAnalyzeReview } from '../../../../ModalAnalyzeReview';
import { RequirementsList } from '../../../../RequirementsList';
import { Spacer } from '../../../../Spacer';
import {
  formatToPrice,
  handleSplitAt,
} from '../../../../../helpers/formatsHelper';
import { Titulo } from '../../../../Titulo';
import { UserPanel } from '../../../../UserPanel';
import IconeVoluntario from '../../../../../assets/icon-voluntare.svg';
import PDFIcon from '../../../../../assets/print-icon.svg';

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
import {
  ButtonMainStyled,
  Container,
  ContentButtonStyled,
  ContentChatStyled,
  ContentDescription,
  ContentFooterStyled,
  ContentInputStyled,
  DescriptionStyled,
  HeaderStepsStyled,
  TitleDescriptionStyled,
  TypographyDescriptionStyled,
  TypographyFooter,
  InputStyled,
  ContentFileStyled,
  ContainerAnexos,
  Anexos,
  ContainerAnexoChat,
  Label,
  ContainerIcone,
  ValorTotal,
  TextoObersavacao,
  ErrorAxexo,
  CondicoesGeraisContent,
} from './styled';
import ContentStyled from './styled';
import { oportunidades_api } from '../../../../../services/oportunidades_api';
import { dataValidation } from '../../../../../utils/DateValidator';
import { pessoas_api } from '../../../../../services/pessoas_api';
import { FiArrowUpCircle } from 'react-icons/fi';
import { ModalRecuseProposal } from '../../../../ModalRecuseProposal';
import { arquivos_api } from '../../../../../services/arquivos_api';
import { BsPaperclip } from 'react-icons/bs';
import { ModalInformation } from '../../../../ModalInformation';
import { useAuth } from '../../../../../contexts/auth';
import { typeFile } from '../../../../../utils/typeFile';
import { ModalAcceptProposal } from '../../../../ModalAcceptProposal';
import { useHistory } from 'react-router-dom';
import { Skeleton } from '../../../../Skeleton';

interface IProps {
  id_proposta: number;
}

interface PropostaProps {
  dataInicioEstimada: string;
  dataHoraCriacao: string;
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
  id: number;
  url: string;
}

interface ListPerguntasProps {
  arquivo: {
    id: number;
    nome: string;
    url: string;
  };
  lida: boolean;
  dataHoraCriacao: string;
  id: number;
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
interface FornecedorProps {
  nome: string;
  resumo_profissional: string;
  id_arquivo: number;
  id: number;
}

interface ProjetoProps {
  nome: string;
  status: {
    codigo: string;
    descricao: string;
  };
  proBono: boolean;
  escopo: string;
}

const CardProposal = ({ id_proposta }: IProps) => {
  const history = useHistory();
  const [modalAnalyzeReview, setModalAnalyzeReview] = useState<boolean>(false);
  const [showModalInformation, setShowModalInformation] =
    useState<boolean>(false);
  const [modalRecuseProposal, setModalRecuseProposal] =
    useState<boolean>(false);

  const [dadosProposta, setDadosProposta] = useState<PropostaProps>(
    {} as PropostaProps,
  );
  const [listPerguntas, setListPerguntas] = useState<ListPerguntasProps[]>(
    [] as ListPerguntasProps[],
  );
  const [dadosFornecedor, setDadosFornecedor] = useState<FornecedorProps>(
    {} as FornecedorProps,
  );

  const [anexo, setAnexo] = useState<any[]>([]);
  const [idAnexo, setIdAnexo] = useState<string>('');
  const [loadingAnexo, setLoadingAnexo] = useState<boolean>(false);
  const [chat, setChat] = useState('');
  const [projeto, setProjeto] = useState<ProjetoProps>({} as ProjetoProps);
  const [isDisabled, setIsDisabled] = useState(false);
  const { user } = useAuth();
  const [taxa, setTaxa] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);
  const [showModalPagamento, setShowModalPagamento] = useState(false);
  const ContainerMessagesRef = useRef<any>(null);

  /**
   * Responsavel por setar os valores do input nome
   * @function handleInputCompany
   * @param {string} elm - valor que será setado no input.
   */

  const getProjeto = useCallback(async () => {
    oportunidades_api
      .get<ProjetoProps>(`/projetos/${dadosProposta.idProjeto}`)
      .then(({ data }) => {
        setProjeto(data);
      });
  }, [dadosProposta.idProjeto]);

  useEffect(() => {
    getProjeto();
  }, [getProjeto]);

  const getProposta = useCallback(async () => {
    oportunidades_api
      .get<PropostaProps>(`/projetos/propostas/${id_proposta}`)
      .then(({ data }) => {
        setDadosProposta(data);
      });

    if (dadosProposta.idPessoaFornecedor) {
      pessoas_api
        .get(`/pessoas/${dadosProposta.idPessoaFornecedor}`)
        .then(response => {
          setDadosFornecedor(response.data);
        });
    }
  }, [dadosProposta.idPessoaFornecedor, id_proposta]);

  useEffect(() => {
    getProposta();
  }, [
    dadosProposta.idPessoaFornecedor,
    getProposta,
    id_proposta,
    modalAnalyzeReview,
  ]);

  useEffect(() => {
    getProjeto();
    getProposta();
  }, [getProjeto, getProposta, showModalPagamento]);

  async function handleChat() {
    if (chat === '' && !anexo) {
      return;
    }
    setIsDisabled(true);

    try {
      const { data: listPergunta } = await pessoas_api.post<ListPerguntasProps>(
        `/pessoas/${dadosProposta.idPessoaFornecedor}/mensagens`,
        {
          texto: chat,
          id_arquivo: idAnexo ? idAnexo : undefined,
          id_proposta: id_proposta,
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
      console.error(error);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (dadosProposta.idPessoaFornecedor) {
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

  const BuscaMensagem = useCallback(async () => {
    try {
      const { data } = await pessoas_api.get<{ values: ListPerguntasProps[] }>(
        `/pessoas/${dadosFornecedor.id}/mensagens?filter=idProposta=${id_proposta}&order=dataHoraCriacao=ASC`,
      );
      setListPerguntas(data.values);
    } catch (error) {
      console.log(error);
    }
  }, [dadosFornecedor.id, id_proposta]);

  useEffect(() => {
    BuscaMensagem();
  }, [BuscaMensagem]);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      try {
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
        console.log(err.response.data.error);
      }
    },
    [],
  );

  function saveLocalStorage() {
    localStorage.setItem(
      '@freelas_town:cart',
      JSON.stringify({
        nome: projeto.nome,
        preco: dadosProposta.valor,
        adicional: 'Não há adicionais',
        adicionalPreco: 0,
        parcelas: dadosProposta.parcelas,
        idPessoaConsumidor: user.id_pessoa,
        idPessoaFornecedor: dadosProposta.idPessoaFornecedor,
        taxa: 0,
      }),
    );
  }

  async function handleAceitarProposta() {
    try {
      if (projeto.proBono) {
        setLoadingButton(true);
        await oportunidades_api.patch(
          `/projetos/propostas/${id_proposta}/aceitar`,
        );
        setShowModalInformation(true);

        setTimeout(() => {
          setShowModalInformation(false);
          setLoadingButton(false);

          getProjeto();
          getProposta();
        }, 2000);
      } else {
        setLoadingButton(true);
        setShowModalInformation(true);

        await oportunidades_api.patch(
          `/projetos/propostas/${id_proposta}/aceitar`,
        );
        setTimeout(() => {
          setShowModalInformation(false);
          saveLocalStorage();
          setShowModalInformation(false);
          setShowModalPagamento(true);
        }, 2000);
      }
    } catch (error: any) {
      console.error(error.response);
    }
  }

  useEffect(() => {
    const fee = dadosProposta.valor / (1 - 0.12) - dadosProposta.valor;
    fee > 14 ? setTaxa(fee) : setTaxa(14);
  }, [dadosProposta]);

  return (
    <ContentStyled>
      <ModalAcceptProposal
        showModal={showModalPagamento}
        setShowModal={setShowModalPagamento}
        descricao={`Pagamento do projeto - ${projeto.nome}`}
        tipo="servico"
        idPessoaConsumidor={user.id_pessoa}
        idPessoaFornecedor={dadosProposta.idPessoaFornecedor}
        idProjeto={dadosProposta.idProjeto}
        valor={dadosProposta.valor}
        nomeProjeto={projeto.nome}
      />
      {dadosProposta.id && (
        <Card>
          <Container>
            <HeaderStepsStyled>
              {dadosProposta.status &&
                dadosProposta?.status.codigo === 'REVISAO' && (
                  <Titulo cor={AZUL} tamanho={24} titulo="Aguardando revisão" />
                )}

              {dadosProposta.status &&
                dadosProposta?.status.codigo === 'AGUARDANDO_INICIO' && (
                  <Titulo
                    cor={AZUL}
                    tamanho={24}
                    titulo="Aguardando fornecedor iniciar"
                  />
                )}

              {dadosProposta.status &&
                dadosProposta?.status.codigo === 'REVISADA' && (
                  <Titulo cor={AZUL} tamanho={24} titulo="Proposta revisada" />
                )}

              {dadosProposta.status &&
                dadosProposta?.status.codigo === 'ACEITA' && (
                  <Titulo cor={AZUL} tamanho={24} titulo="Proposta aceita" />
                )}

              {dadosProposta.status &&
                dadosProposta?.status.codigo === 'ENVIADA' && (
                  <Titulo cor={AZUL} tamanho={24} titulo="" />
                )}

              {dadosProposta.status &&
                dadosProposta?.status.codigo === 'RECUSADA' && (
                  <Titulo
                    cor={CINZA_30}
                    tamanho={24}
                    titulo="Proposta recusada"
                  />
                )}

              {dadosProposta.status &&
                dadosProposta?.status.codigo === 'CANCELADA' && (
                  <Titulo
                    cor={CINZA_30}
                    tamanho={24}
                    titulo="Proposta cancelada"
                  />
                )}
              <ContentButtonStyled>
                {dadosProposta.status &&
                  dadosProposta?.status.codigo === 'REVISAO' && (
                    <>
                      <ButtonMainStyled
                        onClick={() => {
                          setModalRecuseProposal(!modalRecuseProposal);
                        }}
                        color={LARANJA}
                        recused
                      >
                        Recusar
                      </ButtonMainStyled>
                      <ButtonMainStyled
                        color={AZUL}
                        onClick={() => {
                          handleAceitarProposta();
                        }}
                      >
                        ACEITAR
                      </ButtonMainStyled>
                    </>
                  )}

                {dadosProposta.status &&
                  dadosProposta?.status.codigo === 'ENVIADA' && (
                    <>
                      <ButtonMainStyled
                        onClick={() => {
                          setModalRecuseProposal(!modalRecuseProposal);
                        }}
                        color={LARANJA}
                        recused
                      >
                        Recusar
                      </ButtonMainStyled>
                      <ButtonMainStyled
                        color={AZUL_60}
                        onClick={() => {
                          handleAceitarProposta();
                        }}
                      >
                        {loadingButton ? (
                          <span
                            className="spinner-border text-light"
                            role="status"
                          ></span>
                        ) : (
                          'ACEITAR'
                        )}
                      </ButtonMainStyled>

                      <ButtonMainStyled
                        color={'DEFAULT'}
                        onClick={() => {
                          setModalAnalyzeReview(!modalAnalyzeReview);
                        }}
                      >
                        Solicitar Revisão
                      </ButtonMainStyled>
                    </>
                  )}

                {dadosProposta.status &&
                  dadosProposta?.status.codigo === 'REVISADA' && (
                    <>
                      <ButtonMainStyled
                        onClick={() => {
                          setModalRecuseProposal(!modalRecuseProposal);
                        }}
                        color={LARANJA}
                        recused
                      >
                        Recusar
                      </ButtonMainStyled>
                      <ButtonMainStyled
                        color={AZUL_60}
                        onClick={() => {
                          handleAceitarProposta();
                        }}
                      >
                        ACEITAR
                      </ButtonMainStyled>

                      <ButtonMainStyled
                        color={'DEFAULT'}
                        onClick={() => {
                          setModalAnalyzeReview(!modalAnalyzeReview);
                        }}
                      >
                        Solicitar nova Revisão
                      </ButtonMainStyled>
                    </>
                  )}

                {dadosProposta.status &&
                  dadosProposta?.status.codigo === 'ACEITA' && (
                    <ButtonMainStyled
                      color={AZUL_60}
                      onClick={() =>
                        history.push('/consumidor/projeto/andamento', {
                          id: dadosProposta.idProjeto,
                        })
                      }
                    >
                      ACOMPANHAR PROJETO
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
                        dadosProposta?.status?.codigo !== 'RECUSADA'
                          ? PRETO_10
                          : CINZA_30
                      }
                      tamanho={25}
                    />
                    <span>
                      {' '}
                      {dadosProposta?.dataInicioEstimada === null
                        ? 'Inicio Imediado'
                        : dataValidation(dadosProposta.dataInicioEstimada)}
                    </span>
                  </div>
                  {taxa ? (
                    <>
                      {dadosProposta.valor > 0 ? (
                        <ValorTotal status={dadosProposta?.status?.codigo}>
                          <p>{formatToPrice(dadosProposta.valor + taxa)}</p>
                          {dadosProposta.parcelas > 1 ? (
                            <span>
                              em até {dadosProposta.parcelas}x no cartão
                            </span>
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
                    </>
                  ) : (
                    <section>
                      <Skeleton width="100%" height="30px" />
                    </section>
                  )}
                </HeaderStepsStyled>
                <Spacer size={40} />
                <DescriptionStyled>
                  <TitleDescriptionStyled>
                    Descrição do trabalho a ser feito (Escopo)
                  </TitleDescriptionStyled>
                  <TypographyDescriptionStyled>
                    {dadosProposta.descricao}
                  </TypographyDescriptionStyled>
                </DescriptionStyled>
                <Spacer size={40} />

                {projeto?.escopo === 'FECHADO' && (
                  <>
                    <RequirementsList
                      title="Pré requisitos para entrega"
                      listItems={dadosProposta?.requisitos.map(
                        item => item.descricao,
                      )}
                    />
                    <Spacer size={40} />
                    <RequirementsList
                      title="Métodos de Entrega ou Entregáveis"
                      listItems={dadosProposta?.entregaveis.map(
                        item => item.descricao,
                      )}
                    />
                    <Spacer size={40} />
                  </>
                )}
                <ContentFooterStyled>
                  <p>
                    Combinei de entregar esse projeto em:
                    <span>
                      {dadosProposta.prazoConclusao}
                      {dadosProposta.prazoConclusao === 1 ? ' dia' : ' dias'}
                    </span>
                  </p>
                  {projeto.escopo === 'ABERTO' && (
                    <Col lg={12}>
                      <p>
                        Quantidade de horas: {''}
                        <span>{dadosProposta.totalHoras}h</span>
                      </p>
                    </Col>
                  )}
                  {projeto.escopo === 'ABERTO' && !projeto.proBono && (
                    <p>
                      O valor da hora é:{' '}
                      <span>
                        {formatToPrice(
                          dadosProposta.valor / dadosProposta.totalHoras,
                        )}
                      </span>
                    </p>
                  )}
                  <p>
                    Com disponibilidade:
                    <span>
                      {dadosProposta.dataInicioEstimada !== null
                        ? dataValidation(dadosProposta.dataInicioEstimada)
                        : 'imediata'}
                    </span>
                  </p>
                  <TextoObersavacao>
                    * As datas de entrega e de início do projeto, estão sujeitas
                    a alterações, conforme revisão.
                  </TextoObersavacao>
                </ContentFooterStyled>
                {dadosProposta.arquivos?.length > 0 && (
                  <>
                    <Spacer size={10} />
                    <TypographyFooter>
                      Enviei este arquivo como proposta
                    </TypographyFooter>
                  </>
                )}
                <ContainerAnexos>
                  {dadosProposta.arquivos?.map((anexo, index) => (
                    <Anexos
                      key={index}
                      className="mx-1"
                      href={anexo.url}
                      download
                      target="blank"
                    >
                      {handleSplitAt(anexo?.url) + ' '}
                    </Anexos>
                  ))}
                </ContainerAnexos>

                <CondicoesGeraisContent>
                  <strong>
                    Condições gerais ou regras para o cancelamento do serviço
                  </strong>

                  <div>
                    {dadosProposta.condicoesGerais?.map((item: string) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                </CondicoesGeraisContent>
                {id_proposta && (
                  <div>
                    <div className="selected-items__container-icons-export">
                      <a
                        href={`/projetos/imprimir-proposta/${id_proposta}`}
                        target="_blank"
                        rel="noreferrer"
                        className="icon-pdf"
                      >
                        <PDFIcon color={AZUL} />
                      </a>
                    </div>
                  </div>
                )}
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
                            isAnexo={!!item.arquivo}
                            key={item.id}
                            image={item.pessoaRemetente.id_arquivo}
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
                  {projeto?.status?.codigo === 'CANCELADO' ||
                  dadosProposta.status?.codigo === 'CANCELADA' ||
                  dadosProposta.status?.codigo === 'RECUSADA' ? null : (
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
                              disabled={projeto?.status?.codigo === 'CANCELADO'}
                            />
                          </div>
                        </ContainerAnexoChat>
                        <InputStyled
                          disabled={
                            isDisabled ||
                            projeto?.status?.codigo === 'CANCELADO'
                          }
                          value={chat}
                          type="text"
                          onChange={evt => {
                            if (projeto?.status?.codigo === 'CANCELADO') return;
                            setChat(evt.target.value);
                          }}
                          onKeyUp={(e: any) => {
                            if (e.keyCode === 13) {
                              if (projeto?.status?.codigo === 'CANCELADO')
                                return;
                              handleChat();
                            }
                          }}
                          placeholder="Digite aqui um comentario"
                        />
                      </ContentFileStyled>
                      <button
                        disabled={
                          isDisabled || projeto?.status?.codigo === 'CANCELADO'
                        }
                        onClick={() => {
                          if (projeto?.status?.codigo === 'CANCELADO') return;
                          handleChat();
                        }}
                      >
                        <FiArrowUpCircle
                          size={30}
                          color={
                            projeto?.status?.codigo === 'CANCELADO'
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
          <ModalRecuseProposal
            showModal={modalRecuseProposal}
            setShowModal={setModalRecuseProposal}
            text="Você recusou uma proposta. Por que ela não interessante para você?"
            title="Ajude-nos a melhorar"
            id_usuario={1}
            id_proposta={id_proposta}
          />

          <ModalAnalyzeReview
            visao="consumidor"
            showModal={modalAnalyzeReview}
            setShowModal={setModalAnalyzeReview}
            text="Selecione o que você deseja que seu fornecedor revise nesse orçamento"
            title="Solicitação de Revisão de Orçamento"
            id_proposta={id_proposta}
            id_projeto={dadosProposta.idProjeto}
          />

          <ModalInformation
            showModal={showModalInformation}
            title="Proposta aceita com sucesso :)"
            color={AZUL}
          />
        </Card>
      )}
    </ContentStyled>
  );
};

export default CardProposal;
