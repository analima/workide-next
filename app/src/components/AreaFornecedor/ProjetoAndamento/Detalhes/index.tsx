import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FiArrowUpCircle } from 'react-icons/fi';
import { Card } from '../../../../components/Card';
import { Button } from '../../../../components/Form/Button';
import { MetodosEntrega } from '../../../../components/MetodosEntrega';
import { ProgressBar } from '../../../../components/ProgessBar';
import { RequisitosEntrega } from '../../../../components/RequisitosEntrega';
import { Spacer } from '../../../../components/Spacer';
import { Titulo } from '../../../../components/Titulo';
import { UserPanel } from '../../../../components/UserPanel';
import {
  AZUL,
  AZUL_60,
  BRANCO,
  CINZA_20,
  CINZA_30,
  CINZA_40,
  LARANJA,
  PRETO_10,
  VERDE,
} from '../../../../styles/variaveis';

import { dataValidation } from '../../../../utils/DateValidator';
import ModalConcluir from '../ModalConcluir';
import {
  ArquivoAnexadoContainer,
  ButtonOrange,
  ContainerAcoes,
  TextoNegrito,
  Descricao,
  ContentChatStyled,
  ContentInputStyled,
  ContentFileStyled,
  Information,
  Label,
  ContainerIcone,
  ContainerAnexoChat,
  InputStyled,
  Download,
  ErrorAxexo,
  ValorTotal,
  ContainerProposalPrice,
  HourContainer,
  HourTitulo,
  ContentQuantidadeHora,
  CondicoesGeraisContent,
} from './style';
import Content from './style';
import IconeVoluntario from '../../../../assets/icon-voluntare.svg';

import { pessoas_api } from '../../../../services/pessoas_api';
import { usePropostaFornecedor } from '../../../../hooks/propostaFornecedor';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import { useHistory } from 'react-router';
import { ModalInformation } from '../../../../components/ModalInformation';
import { arquivos_api } from '../../../../services/arquivos_api';
import {
  formatToPrice,
  handleSplitAt,
} from '../../../../helpers/formatsHelper';
import { BsPaperclip } from 'react-icons/bs';
import { typeFile } from '../../../../utils/typeFile';
import { Skeleton } from '../../../../components/Skeleton';
import { ModalDesistir } from '../../../../components/ModalDesistir';
import { useAuth } from '../../../../contexts/auth';
import ModalCancelProject from '../../../../components/ModalCancelProject';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { InputHour } from '../../../../components/Form/InputHour';
import { AtividadesProps } from '../../../../hooks/propostaConsumidor';
import PDFIcon from '../../../../assets/print-icon.svg';
import { useValorProjetoPago } from '../../../../contexts/valorProjetoPago';
import BuscarFaturaProjeto from '../../../../utils/buscarFaturaProjeto';
import { IS_EMPTY } from 'src/const';

const SECONDS_TO_UPDATE_MESSAGE = 15 * 1000;

interface IAnexo {
  id: string;
  url: string;
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
    nome_tratamento: string;
  };
  pessoaRemetente: {
    id: number;
    nome: string;
    id_arquivo: string;
    nome_tratamento: string;
  };
  texto: string;
}

type DetalhesProps = {
  getProjeto: () => void;
};

const schema = Yup.object().shape({});

export default function Detalhes({ getProjeto }: DetalhesProps) {
  const history = useHistory();
  const [loadingAnexo, setLoadingAnexo] = useState<boolean>(false);
  const [combinarNovamente, setCombinarNovamente] = useState(false);
  const [modalCancelar, setModalCancelar] = useState(false);
  const [taxa, setTaxa] = useState(0);

  const [modalDesistir, setModalDesistir] = useState(false);
  const [modalConcluir, setModalConcluir] = useState(false);
  const [listPerguntas, setListPerguntas] = useState<ListPerguntasProps[]>(
    [] as ListPerguntasProps[],
  );
  const [isModalInformation, setIsModalInformation] = useState(false);
  const { project } = usePropostaFornecedor();
  const [isAvaliado, setIsAvaliado] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false);
  const [chat, setChat] = useState('');
  const [anexo, setAnexo] = useState<any[]>([]);
  const [idAnexo, setIdAnexo] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState('');
  const [mostraAvaliacao, setMostraAvaliacao] = useState(false);
  const ContainerMessagesRef = useRef<any>(null);
  const { user } = useAuth();
  const [updateHistory, setUpdateHistory] = useState<number[]>([]);
  const [atividades, setAtividades] = useState<AtividadesProps[]>([]);
  const [valorPagoProjeto, setValorProjetoPago] = useState(0);
  const { adicinarProjeto, buscarProjeto, jaFoiPago } = useValorProjetoPago();

  async function handleGetProjectInvoiceValue() {
    try {
      if (buscarProjeto(project.id)) {
        setValorProjetoPago(buscarProjeto(project.id)?.valorComTaxa || IS_EMPTY);
        return;
      }
      const projetoPago = await BuscarFaturaProjeto.buscarFatura(
        project.idPessoaConsumidor || IS_EMPTY,
        project.id,
      );

      if (projetoPago) {
        adicinarProjeto(projetoPago);
        setValorProjetoPago(projetoPago?.valorComTaxa || IS_EMPTY);
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (project) {
      setAtividades(project.propostaAceita.atividades);
    }
    handleGetProjectInvoiceValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  const { control } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  useForm({
    resolver: yupResolver(schema),
  });

  /**
   * Responsavel por setar os valores do input nome
   * @function handleInputCompany
   * @param {string} elm - valor que será setado no input.
   */

  async function handleChat() {
    if (chat === '' && !anexo) {
      return;
    }
    setIsDisabled(true);

    try {
      const { data: listPergunta } = await pessoas_api.post<ListPerguntasProps>(
        `/pessoas/${project.idPessoaConsumidor}/mensagens`,
        {
          texto: chat,
          id_arquivo: idAnexo ? idAnexo : undefined,
          id_proposta: project.propostaAceita?.id || IS_EMPTY,
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
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (project.idPessoaConsumidor) {
        BuscaMensagem();
      }
      if (ContainerMessagesRef.current) {
        ContainerMessagesRef.current.scrollTop =
          ContainerMessagesRef.current.scrollHeight;
      }
    }, 10000);
    return () => clearTimeout(timer);
  });

  const loadProjectData = useCallback(async () => {
    try {
      const { data } = await oportunidades_api.get(
        `/projetos/avaliacoes-consumidor/${project?.idPessoaConsumidor}`,
      );

      const arrayAux = data.values.filter((item: any) => {
        return item.idProjeto === project.id;
      });
      if (arrayAux.length > 0) setIsAvaliado(true);
      else setIsAvaliado(false);
      setMostraAvaliacao(true);
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }, [project.id, project?.idPessoaConsumidor]);

  useEffect(() => {
    loadProjectData();
    BuscaMensagem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.id, project?.idPessoaConsumidor]);

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
        `/pessoas/${project.idPessoaConsumidor}/mensagens?filter=idProposta=${project?.propostaAceita.id}&order=dataHoraCriacao=ASC`,
      );
      setListPerguntas(data.values);
      return data.values;
    } catch (error) {
      console.log(error);
    }
  }, [project.idPessoaConsumidor, project?.propostaAceita.id]);

  const handleIniciar = useCallback(async () => {
    try {
      await oportunidades_api.patch(`projetos/${project.id}/iniciar`);
      setIsModalInformation(true);

      setTimeout(async () => {
        setIsModalInformation(false);
        getProjeto();
        setTimeout(() => {
          loadProjectData();
          if (ContainerMessagesRef.current) {
            ContainerMessagesRef.current.scrollTop =
              ContainerMessagesRef.current.scrollHeight;
          }
        }, 500);
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }, [getProjeto, loadProjectData, project.id]);

  function handlePorcentage() {
    if (project.escopo === 'FECHADO') {
      const totalMetodos = project.propostaAceita.entregaveis.length;
      const totalRequisitos = project.propostaAceita.requisitos.length;
      const total = totalMetodos + totalRequisitos;

      const aceitoMetodos = project.propostaAceita.entregaveis.filter(
        (i: any) => i.status === 'ACEITO',
      ).length;
      const aceitoRequisitos = project.propostaAceita.requisitos.filter(
        (i: any) => i.status === 'ACEITO',
      ).length;
      const aceito = aceitoMetodos + aceitoRequisitos;

      const progresso = ((aceito / total) * 100).toFixed(0);
      return progresso;
    }

    if (project.escopo === 'ABERTO') {
      const total = project.totalHoras;
      const totalTrabalhadas = project.propostaAceita.atividades.reduce(
        (total, atividade) => total + atividade.horas,
        0,
      );
      const progresso = ((totalTrabalhadas / total) * 100).toFixed(0);

      return progresso;
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

  function handleCor(status: string) {
    switch (status) {
      case 'AGUARDANDO_INICIO':
        return `${VERDE}`;
      case 'AGUARDANDO_PAGAMENTO':
        return `${LARANJA}`;
      case 'CONCLUIDO_PARCIALMENTE':
        return `${AZUL}`;
    }
  }

  const autoUpdateMessage = useCallback(async () => {
    const now = new Date();
    if (
      updateHistory[updateHistory.length - 1] &&
      updateHistory[updateHistory.length - 1] - now.getTime() <
        SECONDS_TO_UPDATE_MESSAGE * 1000
    ) {
      return;
    }
    setUpdateHistory(update => [...update, now.getTime()]);
    setTimeout(() => {
      if (ContainerMessagesRef.current) {
        ContainerMessagesRef.current.scrollTop =
          ContainerMessagesRef.current.scrollHeight;
      }
    }, 500);
  }, [updateHistory]);

  useEffect(() => {
    setInterval(autoUpdateMessage, SECONDS_TO_UPDATE_MESSAGE);
  }, [autoUpdateMessage]);

  useEffect(() => {
    const fee =
      project.propostaAceita?.valor / (1 - 0.12) -
      project.propostaAceita?.valor;
    fee > 14 ? setTaxa(fee) : setTaxa(14);
  }, [project.propostaAceita]);

  return (
    <Content>
      <Card>
        <ModalDesistir
          idProjeto={project.id}
          showModal={modalDesistir}
          setShowModal={setModalDesistir}
          progresso={handlePorcentage()}
          isProBono={project.proBono}
          combinado={project.desistencia}
          combinarNovamente={combinarNovamente}
          idPessoa={project.idPessoaConsumidor}
          getProjeto={getProjeto}
          setLoading={setLoading}
          userType="fornecedor"
        />

        <ModalCancelProject
          showModal={modalCancelar}
          setShowModal={setModalCancelar}
          idProject={project.id}
          visao="fornecedor"
          getProjeto={getProjeto}
          proBono={project.proBono}
          setLoading={setLoading}
        />

        <ModalConcluir
          idProjeto={project.id}
          showModal={modalConcluir}
          setShowModal={setModalConcluir}
          progresso={handlePorcentage()}
          getProjeto={getProjeto}
          isProBono={project.proBono}
        />
        <ContainerAcoes>
          <Col lg={6}>
            <ContainerProposalPrice>
              {project.status.codigo !== 'CONCLUIDO' &&
                project.status.codigo !== 'CONCLUIDO_PARCIALMENTE' &&
                project.status.codigo !== 'DESISTENCIA_INICIADA' &&
                project.status.codigo !== 'CANCELADO' &&
                project.status.codigo !== 'CONCLUSAO_SOLICITADA' && (
                  <Titulo
                    cor={handleCor(project.status.codigo)}
                    titulo={project.status.descricao}
                    tamanho={24}
                  />
                )}

              {project.status.codigo === 'DESISTENCIA_INICIADA' &&
                project?.desistencia?.idPessoa !== user.id_pessoa &&
                project?.desistencia?.acordoRecusado === false && (
                  <Titulo
                    cor={LARANJA}
                    titulo="Solicitação de desistência em andamento."
                    tamanho={24}
                  />
                )}

              {project.status.codigo === 'CANCELADO' && (
                <Titulo
                  cor={CINZA_30}
                  titulo={project.status.descricao}
                  tamanho={24}
                />
              )}

              {project.status.codigo === 'DESISTENCIA_INICIADA' &&
                project?.desistencia?.idPessoa !== user.id_pessoa &&
                project?.desistencia?.acordoRecusado === true && (
                  <Titulo
                    cor={LARANJA}
                    titulo="Solicitação de desistência em andamento."
                    tamanho={24}
                  />
                )}

              {project?.desistencia?.idPessoa === user.id_pessoa &&
                project?.desistencia?.acordoRecusado === true && (
                  <div>
                    <Titulo
                      cor={LARANJA}
                      titulo="Solicitação de desistência em andamento."
                      tamanho={24}
                    />
                    <Titulo
                      cor={LARANJA}
                      titulo="A outra parte recusou seu combinado."
                      tamanho={24}
                    />
                  </div>
                )}

              {(project.status.codigo === 'CONCLUIDO' ||
                project.status.codigo === 'CONCLUIDO_PARCIALMENTE') && (
                <Titulo
                  cor={AZUL}
                  titulo={
                    !isAvaliado
                      ? 'Projeto concluído. O que acha de avaliá-lo agora?'
                      : 'Projeto concluído e já avaliado'
                  }
                  tamanho={20}
                />
              )}

              {!project.proBono ? (
                <ValorTotal status={project.status.codigo}>
                  {project.propostaAceita?.valor ? (
                    <strong className="valor">
                      {formatToPrice(
                        jaFoiPago(project.status.codigo)
                          ? valorPagoProjeto
                          : project.propostaAceita?.valor + taxa,
                      )}
                    </strong>
                  ) : (
                    <Skeleton width="130px" height="50px" />
                  )}

                  <span>À vista</span>
                </ValorTotal>
              ) : (
                <div className="voluntariado">
                  <IconeVoluntario />
                  <span>VOLUNTÁRIO</span>
                </div>
              )}
              {project.status.codigo === 'CONCLUSAO_SOLICITADA' &&
                project.proBono && (
                  <Titulo
                    cor={AZUL}
                    titulo="Parabéns você fez uma boa ação, estamos concluído o seu projeto."
                    tamanho={18}
                  />
                )}
            </ContainerProposalPrice>
          </Col>

          <Col lg={6} className="d-flex justify-content-end">
            {project.status.codigo === 'AGUARDANDO_INICIO' && (
              <ButtonOrange
                onClick={() => {
                  setLoading(true);
                  setModalCancelar(true);
                }}
              >
                {loading ? 'CARREGANDO...' : 'CANCELAR PROJETO'}
              </ButtonOrange>
            )}

            {project.status.codigo === 'AGUARDANDO_INICIO' && (
              <Button onClick={() => handleIniciar()} label="INICIAR PROJETO" />
            )}

            {project.status.codigo === 'CONCLUSAO_SOLICITADA' && (
              <Titulo
                cor={AZUL}
                titulo={project.status.descricao}
                tamanho={18}
              />
            )}

            {project.status.codigo === 'INICIADO' && (
              <>
                {!project.proBono ? (
                  <ButtonOrange
                    onClick={() => {
                      setLoading(true);
                      setModalDesistir(true);
                    }}
                  >
                    {loading ? 'CARREGANDO...' : 'DESISTIR DO PROJETO'}
                  </ButtonOrange>
                ) : (
                  <ButtonOrange
                    onClick={() => {
                      setLoading(true);
                      setModalDesistir(true);
                    }}
                  >
                    {loading ? 'CARREGANDO...' : 'DESISTIR DO PROJETO'}
                  </ButtonOrange>
                )}
                <Button
                  onClick={() => setModalConcluir(true)}
                  label="CONCLUIR PROJETO"
                />
              </>
            )}

            {project.status.codigo === 'DESISTENCIA_INICIADA' &&
              project?.desistencia?.idPessoa !== user.id_pessoa &&
              project?.desistencia?.acordoRecusado === false && (
                <ButtonOrange
                  onClick={() => {
                    setModalDesistir(true);
                    setCombinarNovamente(true);
                  }}
                >
                  VER COMBINADO
                </ButtonOrange>
              )}

            {project?.desistencia?.idPessoa === user.id_pessoa &&
              project?.desistencia?.acordoRecusado === false &&
              project.status.codigo === 'DESISTENCIA_INICIADA' && (
                <Titulo
                  cor={LARANJA}
                  titulo="AGUARDANDO RESPOSTA"
                  tamanho={18}
                />
              )}

            {project?.desistencia?.idPessoa === user.id_pessoa &&
              project?.desistencia?.acordoRecusado === true && (
                <ButtonOrange
                  onClick={() => {
                    setModalDesistir(true);
                    setCombinarNovamente(true);
                  }}
                >
                  COMBINAR NOVAMENTE
                </ButtonOrange>
              )}

            {project.status.codigo === 'DESISTENCIA_INICIADA' &&
              project?.desistencia?.idPessoa !== user.id_pessoa &&
              project?.desistencia?.acordoRecusado === true && (
                <Titulo
                  cor={LARANJA}
                  titulo="COMBINADO RECUSADO"
                  tamanho={18}
                />
              )}

            {(project.status.codigo === 'CONCLUIDO' ||
              project.status.codigo === 'CONCLUIDO_PARCIALMENTE') && (
              <>
                {mostraAvaliacao && (
                  <>
                    {!isAvaliado && (
                      <Button
                        onClick={() =>
                          history.push('/fornecedor/avaliacao-projeto', {
                            idProjeto: project.id,
                            idConsumidor: project.idPessoaConsumidor,
                          })
                        }
                        label="FAZER AVALIAÇÃO"
                      />
                    )}
                  </>
                )}
              </>
            )}
          </Col>
        </ContainerAcoes>
        <Row className="d-flex justify-content-between">
          <Col lg={6}>
            <Row className="mt-5">
              <Col lg={10}>
                {project.status.codigo !== 'INICIADO' ? (
                  <Titulo
                    cor={PRETO_10}
                    titulo="Informações das entregas"
                    tamanho={24}
                  />
                ) : (
                  <ProgressBar
                    percentage={handlePorcentage()}
                    date={project.propostaAceita.dataHoraCriacao}
                    title={
                      project.escopo === 'FECHADO'
                        ? 'Progresso do Projeto'
                        : 'Consumo do projeto'
                    }
                  />
                )}
              </Col>
            </Row>

            <Row className="mt-4">
              <Col lg={12}>
                <TextoNegrito>Descrição A ser feito (Escopo)</TextoNegrito>
                <Descricao>{project.propostaAceita.descricao}</Descricao>
              </Col>
            </Row>

            {project.escopo === 'FECHADO' ? (
              <>
                <Row className="mt-4">
                  <Information>
                    O que você precisa do seu cliente (até 10 linhas)
                  </Information>
                  <Col lg={12}>
                    <RequisitosEntrega
                      getProjeto={getProjeto}
                      idProjeto={project.id}
                      status={project.status.codigo}
                      titulo="Pré requisitos para entrega"
                      requisitos={project.propostaAceita.requisitos}
                      visao="fornecedor"
                    />
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Information>
                    O que você vai entregar para seu cliente (até 10 linhas)
                  </Information>
                  <Col lg={12}>
                    <MetodosEntrega
                      getProjeto={getProjeto}
                      idProjeto={project.id}
                      status={project.status.codigo}
                      titulo="Métodos de Entrega ou Entregáveis"
                      metodos={project.propostaAceita.entregaveis}
                      visao="fornecedor"
                    />
                  </Col>
                </Row>
              </>
            ) : (
              <Row className="mt-4">
                <HourContainer>
                  <HourTitulo>Relatório das Atividades</HourTitulo>
                  <InputHour
                    disabled={project.status.codigo !== 'INICIADO'}
                    control={control}
                    setValue={setAtividades}
                    name="atividades"
                    label="Atividades"
                    secondaryLabel="Qnt. horas"
                    items={atividades}
                    labelIsBold
                    idProjeto={project.id}
                    visao="FORNECEDOR"
                    getProjeto={getProjeto}
                  />

                  <ContentQuantidadeHora>
                    <strong>Total</strong>
                    <strong>
                      {project.propostaAceita.atividades.reduce(
                        (total, atividade) => {
                          return total + atividade.horas;
                        },
                        0,
                      )}
                      h
                    </strong>
                  </ContentQuantidadeHora>
                </HourContainer>
              </Row>
            )}

            <Row className="mt-5">
              <Col lg={12}>
                <p>
                  Combinei de entregar esse projeto em:{' '}
                  <TextoNegrito>
                    {project.propostaAceita.prazoConclusao}
                    {project.propostaAceita.prazoConclusao === 1
                      ? ' dia'
                      : ' dias'}
                  </TextoNegrito>
                </p>
              </Col>

              {!project.proBono && (
                <p>
                  Valor total:{' '}
                  <TextoNegrito>
                    {formatToPrice(valorPagoProjeto)}
                  </TextoNegrito>
                </p>
              )}

              {project.escopo === 'ABERTO' && (
                <Col lg={12}>
                  <p>
                    Quantidade de horas: {''}
                    <TextoNegrito>{project.totalHoras}h</TextoNegrito>
                  </p>
                </Col>
              )}

              {project.escopo === 'ABERTO' && !project.proBono && (
                <p>
                  O valor da minha hora é:{' '}
                  <TextoNegrito>
                    {formatToPrice(
                      project.propostaAceita.valor /
                        project.propostaAceita.totalHoras,
                    )}
                  </TextoNegrito>
                </p>
              )}
              <Col lg={12}>
                <p>
                  Com disponibilidade:{' '}
                  <TextoNegrito>
                    {project.propostaAceita.dataInicioEstimada !== null
                      ? dataValidation(
                          project.propostaAceita.dataInicioEstimada,
                        )
                      : 'Imediata'}
                  </TextoNegrito>
                </p>
              </Col>
            </Row>

            <Row className="mt-5">
              <Col lg={12}>
                <TextoNegrito>
                  Também tem este arquivo como proposta
                </TextoNegrito>
              </Col>
              <Col lg={12}>
                <ArquivoAnexadoContainer>
                  {project.propostaAceita.arquivos.map((arquivo: IAnexo) => (
                    <Download
                      href={arquivo.url}
                      download
                      target="blank"
                      key={arquivo.id}
                    >
                      {arquivo.url.split('-')[3]}
                    </Download>
                  ))}
                </ArquivoAnexadoContainer>

                {project.propostaAceita.condicoesGerais && (
                  <CondicoesGeraisContent>
                    <strong>
                      Condições gerais ou regras para o cancelamento do serviço
                    </strong>

                    <div>
                      {project.propostaAceita.condicoesGerais?.map(
                        (item: string) => (
                          <p key={item}>{item}</p>
                        ),
                      )}
                    </div>
                  </CondicoesGeraisContent>
                )}
              </Col>
            </Row>
            <Row>
              <div className="selected-items__container-icons-export">
                <a
                  href={`/projetos/imprimir-proposta/${project.propostaAceita.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-pdf"
                >
                  <PDFIcon color={AZUL} />
                </a>
              </div>
            </Row>
          </Col>

          <Col lg={5} className="mt-4">
            <ContentChatStyled>
              <Titulo titulo="Comentários" tamanho={25} />
              <Spacer size={30} />
              {listPerguntas.length > 0 ? (
                <div className="area-msg" ref={ContainerMessagesRef}>
                  {listPerguntas.map(item => (
                    <>
                      <UserPanel
                        isAnexo={!!item.arquivo}
                        key={item.id}
                        image={item.pessoaRemetente?.id_arquivo}
                        name={item.pessoaRemetente?.nome_tratamento}
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
              {project.status.codigo !== 'CONCLUIDO' &&
                project.status.codigo !== 'CONCLUIDO_PARCIALMENTE' &&
                project.status.codigo !== 'CANCELADO' && (
                  <>
                    {listPerguntas.length > 0 && (
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
                                disabled={project.status.codigo === 'CANCELADO'}
                              />
                            </div>
                          </ContainerAnexoChat>
                          <InputStyled
                            disabled={
                              isDisabled ||
                              project.status.codigo === 'CANCELADO'
                            }
                            value={chat}
                            type="text"
                            onKeyUp={(e: any) => {
                              if (
                                e.keyCode === 13 &&
                                project.status.codigo !== 'CANCELADO'
                              ) {
                                handleChat();
                              }
                            }}
                            placeholder="Digite aqui um comentario"
                            onChange={evt => {
                              if (project.status.codigo !== 'CANCELADO')
                                setChat(evt.target.value);
                            }}
                          />
                        </ContentFileStyled>
                        <button
                          disabled={isDisabled}
                          onClick={() => {
                            if (project.status.codigo !== 'CANCELADO')
                              return handleChat();
                          }}
                        >
                          <FiArrowUpCircle
                            size={30}
                            color={
                              project.status.codigo !== 'CANCELADO'
                                ? AZUL_60
                                : CINZA_20
                            }
                          />
                        </button>
                      </ContentInputStyled>
                    )}
                  </>
                )}
            </ContentChatStyled>
            <ErrorAxexo>{errorMsg}</ErrorAxexo>
          </Col>
        </Row>
      </Card>
      <ModalInformation
        showModal={isModalInformation}
        title="Projeto iniciado 😋"
        color={AZUL}
      />
    </Content>
  );
}
