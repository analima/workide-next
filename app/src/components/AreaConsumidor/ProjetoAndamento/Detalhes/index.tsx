import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FiArrowUpCircle } from 'react-icons/fi';
import { Card } from '../../../Card';
import { Button } from '../../../Form/Button';
import { MetodosEntrega } from '../../../MetodosEntrega';
import { ModalAcceptProposal } from '../../../ModalAcceptProposal';
import { ProgressBar } from '../../../ProgessBar';
import { RequisitosEntrega } from '../../../RequisitosEntrega';
import { Spacer } from '../../../Spacer';
import { Titulo } from '../../../Titulo';
import { UserPanel } from '../../../UserPanel';

import {
  AtividadesProps,
  IAnexos,
  usePropostaConsumidor,
} from '../../../../hooks/propostaConsumidor';
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
import { ModalDesistir } from '../../../ModalDesistir';

import {
  Download,
  ArquivoAnexadoContainer,
  ButtonDesistir,
  ContainerAcoes,
  TextoNegrito,
  TextoDescricao,
  ContentChatStyled,
  ContentInputStyled,
  ContentFileStyled,
  InputStyled,
  Information,
  ContainerAnexoChat,
  Label,
  ContainerIcone,
  ContainerProposalPrice,
  ErrorAxexo,
  ValorTotal,
  HourContainer,
  HourTitulo,
  ContentQuantidadeHora,
  CondicoesGeraisContent,
} from './style';
import Content from './style';
import { pessoas_api } from '../../../../services/pessoas_api';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import { useHistory } from 'react-router';
import { BsPaperclip } from 'react-icons/bs';
import { arquivos_api } from '../../../../services/arquivos_api';
import {
  formatToPrice,
  handleSplitAt,
} from '../../../../helpers/formatsHelper';
import { ModalReviewConclusao } from '../../../ModalReviewConclusao';
import { typeFile } from '../../../../utils/typeFile';
import { ModalManagePayment } from '../../../ModalManagePayment';
import { useAuth } from '../../../../contexts/auth';
import ModalCreateSubaccount from './ModalCreateSubaccount';
import IconeVoluntario from '../../../../assets/icon-voluntare.svg';
import { Skeleton } from '../../../Skeleton';
import ModalCancelProject from '../../../ModalCancelProject';
import { InputHour } from '../../../Form/InputHour';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { pagamentos_api } from '../../../../services/pagamentos_api';
import PDFIcon from '../../../../assets/print-icon.svg';
import { useFaturaProjeto } from '../../../../hooks/faturasProjeto';

import BuscarFaturaProjeto from '../../../../utils/buscarFaturaProjeto';
import { useValorProjetoPago } from '../../../../contexts/valorProjetoPago';
const schema = Yup.object().shape({});

interface ListPerguntasProps {
  arquivo: {
    id: number;
    nome: string;
    url: string;
  };
  dataHoraCriacao: string;
  lida: boolean;
  id: number;
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

type Props = {
  getProjeto: () => void;
};

export default function Detalhes({ getProjeto }: Props) {
  const history = useHistory();
  const [modalDesistir, setModalDesistir] = useState(false);
  const [modalConcluir, setModalConcluir] = useState(false);
  const [modalCancelar, setModalCancelar] = useState(false);
  const [isAvaliado, setIsAvaliado] = useState<boolean>(false);
  const [loadingAnexo, setLoadingAnexo] = useState<boolean>(false);
  const [valorTotalProposta, setValorTotalProposta] = useState(0);
  const [showModalManagePayment, setShowModalManagePayment] = useState(false);
  const [modalReviewConclusion, setModalReviewConclusion] = useState(false);
  const [modalAceitarProposta, setModalAceitarProposta] = useState(false);
  const [listPerguntas, setListPerguntas] = useState<ListPerguntasProps[]>(
    [] as ListPerguntasProps[],
  );
  const { dadosProjetos } = usePropostaConsumidor();
  const [chat, setChat] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [showModalSubconta, setShowModalSubconta] = useState(false);

  const [anexo, setAnexo] = useState<any[]>([]);
  const [idAnexo, setIdAnexo] = useState<string>('');
  const { user } = useAuth();
  const [errorMsg, setErrorMsg] = useState('');
  const [combinarNovamente, setCombinarNovamente] = useState(false);
  const [loading, setLoading] = useState(false);
  const ContainerMessagesRef = useRef<any>(null);
  const [atividades, setAtividades] = useState<AtividadesProps[]>([]);
  const faturasProjeto = useFaturaProjeto(dadosProjetos.id);
  const { adicinarProjeto, buscarProjeto, jaFoiPago } = useValorProjetoPago();
  const [valorProjetoPago, setValorProjetoPago] = useState(0);

  async function handleGetProjectInvoiceValue() {
    try {
      if (buscarProjeto(dadosProjetos.id)) {
        setValorProjetoPago(buscarProjeto(dadosProjetos.id)?.valorComTaxa || 0);
        return;
      }
      const projetoPago = await BuscarFaturaProjeto.buscarFatura(
        user.id || 0,
        dadosProjetos.id,
      );
      if (projetoPago) {
        adicinarProjeto(projetoPago);
        setValorProjetoPago(projetoPago?.valorComTaxa || 0);
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (dadosProjetos) {
      setAtividades(dadosProjetos.propostaAceita.atividades);
    }
    handleGetProjectInvoiceValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dadosProjetos]);

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

  useEffect(() => {
    oportunidades_api
      .get(
        `/projetos/avaliacoes-fornecedor/${dadosProjetos?.idPessoaFornecedor}`,
      )
      .then(({ data }) => {
        const arrayAux = data.values.filter((item: any) => {
          return item.idProjeto === dadosProjetos.id;
        });
        if (arrayAux.length > 0) setIsAvaliado(true);
        else setIsAvaliado(false);
      });
    const taxaProvisoria =
      dadosProjetos.propostaAceita.valor / (1 - 0.12) -
      dadosProjetos.propostaAceita.valor;

    if (taxaProvisoria < 14)
      setValorTotalProposta(dadosProjetos.propostaAceita.valor + 14);
    else
      setValorTotalProposta(
        dadosProjetos.propostaAceita.valor + taxaProvisoria,
      );
  }, [
    dadosProjetos.id,
    dadosProjetos?.idPessoaFornecedor,
    dadosProjetos.propostaAceita.valor,
  ]);

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

  useEffect(() => {
    const markMessagesLikeRead = async () => {
      for (let pergunta of listPerguntas) {
        try {
          if (
            !pergunta.lida &&
            pergunta.pessoaDestinatario &&
            (pergunta.pessoaDestinatario.id || 0) === (user.id || 0)
          ) {
            pessoas_api.patch(`/pessoas/mensagens/${pergunta.id}/lida`, {
              lida: true,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    if (user && user.id) {
      markMessagesLikeRead();
    }
  }, [listPerguntas, user]);

  async function handleChat() {
    if (chat === '' && !anexo) {
      return;
    }
    setIsDisabled(true);

    try {
      const { data: listPergunta } = await pessoas_api.post<ListPerguntasProps>(
        `/pessoas/${dadosProjetos.idPessoaFornecedor}/mensagens`,
        {
          texto: chat,
          id_arquivo: idAnexo ? idAnexo : undefined,
          id_proposta: dadosProjetos.propostaAceita.id,
        },
      );
      setListPerguntas(oldState => [...oldState, listPergunta]);

      setChat('');
      setAnexo([]);
      setIdAnexo('');
      const timer = setInterval(() => {
        setIsDisabled(false);
      }, 2000);
      clearInterval(timer);
      setTimeout(() => {
        if (ContainerMessagesRef.current) {
          ContainerMessagesRef.current.scrollTop =
            ContainerMessagesRef.current.scrollHeight;
        }
      }, 700);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (dadosProjetos.idPessoaFornecedor) {
        BuscaMensagem();
      }
      if (ContainerMessagesRef.current) {
        ContainerMessagesRef.current.scrollTop =
          ContainerMessagesRef.current.scrollHeight;
      }
    }, 10000);
    return () => clearTimeout(timer);
  });

  const BuscaMensagem = useCallback(async () => {
    try {
      const { data } = await pessoas_api.get<{ values: ListPerguntasProps[] }>(
        `/pessoas/${dadosProjetos.idPessoaFornecedor}/mensagens?filter=idProposta=${dadosProjetos.propostaAceita.id}&order=dataHoraCriacao=ASC`,
      );
      setListPerguntas(data.values);
    } catch (error) {
      console.error(error);
    }
  }, [dadosProjetos.idPessoaFornecedor, dadosProjetos.propostaAceita.id]);

  useEffect(() => {
    BuscaMensagem();
  }, [BuscaMensagem]);

  function handlePorcentage() {
    if (dadosProjetos.escopo === 'FECHADO') {
      const totalMetodos = dadosProjetos.propostaAceita.entregaveis.length;
      const totalRequisitos = dadosProjetos.propostaAceita.requisitos.length;
      const total = totalMetodos + totalRequisitos;

      const aceitoMetodos = dadosProjetos.propostaAceita.entregaveis.filter(
        (i: any) => i.status === 'ACEITO',
      ).length;
      const aceitoRequisitos = dadosProjetos.propostaAceita.requisitos.filter(
        (i: any) => i.status === 'ACEITO',
      ).length;
      const aceito = aceitoMetodos + aceitoRequisitos;

      const progresso = ((aceito / total) * 100).toFixed(0);
      return progresso;
    }

    if (dadosProjetos.escopo === 'ABERTO') {
      const total = dadosProjetos.totalHoras;
      const totalTrabalhadas = dadosProjetos.propostaAceita.atividades.reduce(
        (total, atividade) => total + atividade.horas,
        0,
      );
      const progresso = ((totalTrabalhadas / total) * 100).toFixed(0);

      return progresso;
    }
  }

  useEffect(() => {
    BuscaMensagem().then(() => {
      const timer = setTimeout(() => {
        if (ContainerMessagesRef.current) {
          ContainerMessagesRef.current.scrollTop =
            ContainerMessagesRef.current.scrollHeight;
        }
      }, 10000);
      return () => clearTimeout(timer);
    });
  }, [BuscaMensagem]);

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
        console.error(err.response?.data?.error);
      }
    },
    [],
  );

  async function handleCheckSubaccount(type: 'desistir' | 'cancelar') {
    try {
      const { data: subconta } = await pagamentos_api.get(
        `/subcontas/${user.id}`,
      );
      if (!subconta.verificada) handleShowModalSubconta();
      else {
        if (type === 'desistir') {
          setModalDesistir(true);
        } else if ('cancelar') {
          setModalCancelar(true);
        }
      }
    } catch (error: any) {
      console.error(error.response.data);
      handleShowModalSubconta();
    }
  }

  function handleShowModalSubconta() {
    setShowModalSubconta(!showModalSubconta);
  }

  return (
    <Content>
      <Card>
        <ModalCreateSubaccount
          show={showModalSubconta}
          setShow={setShowModalSubconta}
        />
        <ModalDesistir
          idProjeto={dadosProjetos.id}
          showModal={modalDesistir}
          setShowModal={setModalDesistir}
          progresso={handlePorcentage()}
          isProBono={dadosProjetos.proBono}
          combinarNovamente={combinarNovamente}
          combinado={dadosProjetos.desistencia}
          idPessoa={dadosProjetos.idPessoaFornecedor}
          getProjeto={getProjeto}
          setLoading={setLoading}
          userType="consumidor"
        />

        <ModalCancelProject
          showModal={modalCancelar}
          setShowModal={setModalCancelar}
          idProject={dadosProjetos.id}
          visao="consumidor"
          getProjeto={getProjeto}
          proBono={dadosProjetos.proBono}
          setLoading={setLoading}
        />

        <ModalConcluir
          idProjeto={dadosProjetos.id}
          showModal={modalConcluir}
          setShowModal={setModalConcluir}
          progresso={handlePorcentage()}
          isProBono={dadosProjetos.proBono}
        />

        <ModalAcceptProposal
          showModal={modalAceitarProposta}
          setShowModal={setModalAceitarProposta}
          valor={dadosProjetos.propostaAceita.valor}
          parcelas={1}
          idPessoaConsumidor={user.id_pessoa}
          idPessoaFornecedor={dadosProjetos.idPessoaFornecedor}
          tipo="servico"
          descricao={`Pagamento do projeto - ${dadosProjetos.nome}`}
          idProjeto={dadosProjetos.id}
          nomeProjeto={dadosProjetos.nome}
        />

        <ModalReviewConclusao
          getProjeto={getProjeto}
          buscaMensagem={BuscaMensagem}
          idProjeto={dadosProjetos.id}
          setShowModal={setModalReviewConclusion}
          showModal={modalReviewConclusion}
          color={VERDE}
          title="Solicitar revisão"
        />

        <ModalManagePayment
          show={showModalManagePayment}
          setShow={setShowModalManagePayment}
          idProjeto={dadosProjetos.id}
          nomeProjeto={dadosProjetos.nome}
          valorProjeto={dadosProjetos.propostaAceita.valor}
        />

        <ContainerAcoes>
          <Col lg={6}>
            <ContainerProposalPrice>
              {dadosProjetos.status.codigo !== 'CONCLUIDO' &&
                dadosProjetos.status.codigo !== 'CONCLUIDO_PARCIALMENTE' &&
                dadosProjetos.status.codigo !== 'DESISTENCIA_INICIADA' &&
                dadosProjetos.status.codigo !== 'CANCELADO' &&
                dadosProjetos.status.codigo !== 'CONCLUSAO_SOLICITADA' && (
                  <Titulo
                    cor={handleCor(dadosProjetos.status.codigo)}
                    titulo={dadosProjetos.status.descricao}
                    tamanho={18}
                  />
                )}

              {dadosProjetos?.desistencia?.idPessoa === user.id_pessoa &&
                dadosProjetos?.desistencia?.acordoRecusado === true && (
                  <div>
                    <Titulo
                      cor={LARANJA}
                      titulo="Solicitação de desistência em andamento."
                      tamanho={18}
                    />
                    <Titulo
                      cor={LARANJA}
                      titulo="A outra parte recusou seu combinado."
                      tamanho={18}
                    />
                  </div>
                )}

              {dadosProjetos.status.codigo === 'DESISTENCIA_INICIADA' &&
                dadosProjetos?.desistencia?.idPessoa !== user.id_pessoa &&
                dadosProjetos?.desistencia?.acordoRecusado === false && (
                  <Titulo
                    cor={LARANJA}
                    titulo="Solicitação de desistência em andamento."
                    tamanho={18}
                  />
                )}

              {dadosProjetos.status.codigo === 'DESISTENCIA_INICIADA' &&
                dadosProjetos?.desistencia?.idPessoa !== user.id_pessoa &&
                dadosProjetos?.desistencia?.acordoRecusado === true && (
                  <Titulo
                    cor={LARANJA}
                    titulo="Solicitação de desistência em andamento."
                    tamanho={18}
                  />
                )}

              {(dadosProjetos.status.codigo === 'CONCLUIDO' ||
                dadosProjetos.status.codigo === 'CONCLUIDO_PARCIALMENTE') && (
                <Titulo
                  cor={AZUL}
                  titulo={
                    !isAvaliado
                      ? 'Projeto concluído. O que acha de avaliá-lo agora?'
                      : 'Projeto concluído e já avaliado'
                  }
                  tamanho={16}
                />
              )}

              {dadosProjetos.status.codigo === 'CANCELADO' && (
                <Titulo
                  cor={CINZA_30}
                  titulo={dadosProjetos.status.descricao}
                  tamanho={18}
                />
              )}

              {dadosProjetos.status.codigo === 'CONCLUSAO_SOLICITADA' && (
                <div>
                  <Titulo
                    cor={AZUL}
                    titulo="Fornecedor(a) marcou o projeto como concluído. Você confirma?"
                    tamanho={14}
                  />
                  {dadosProjetos.proBono ? (
                    <Titulo
                      cor={AZUL}
                      titulo="Você tem 7 dias para solicitar revisão. Após esse período o projeto será atualizado para concluído e seguirá para demais fases."
                      tamanho={14}
                    />
                  ) : (
                    <Titulo
                      cor={AZUL}
                      titulo="Você tem até 7 dias para solicitar revisão. Após esse período liberaremos o pagamento pelo serviço a(o) fornecedor(a)."
                      tamanho={14}
                    />
                  )}
                </div>
              )}

              {dadosProjetos.status.codigo === 'DESISTENCIA_INICIADA' &&
                dadosProjetos?.desistencia?.idPessoa === user.id_pessoa &&
                dadosProjetos?.desistencia?.acordoRecusado === false && (
                  <div>
                    <Titulo
                      cor={LARANJA}
                      titulo="Solicitação de desistência em andamento."
                      tamanho={18}
                    />
                    {dadosProjetos.desistencia.acordoRecusado && (
                      <Titulo
                        cor={LARANJA}
                        titulo="A outra parte recusou seu combinado"
                        tamanho={18}
                      />
                    )}
                  </div>
                )}

              {!dadosProjetos.proBono ? (
                <ValorTotal status={dadosProjetos.status.codigo}>
                  {valorTotalProposta ? (
                    <>
                      <span className="valor">
                        {formatToPrice(
                          jaFoiPago(dadosProjetos.status.codigo)
                            ? valorProjetoPago
                            : valorTotalProposta,
                        )}
                      </span>

                      <span>À vista</span>
                    </>
                  ) : (
                    <>
                      <Skeleton width="120px" height="20px" />
                      <Skeleton width="80px" height="12px" />
                    </>
                  )}
                </ValorTotal>
              ) : (
                <div className="voluntariado">
                  <IconeVoluntario />
                  <span>VOLUNTÁRIO</span>
                </div>
              )}
            </ContainerProposalPrice>
          </Col>

          <Col lg={6} className="d-flex justify-content-end">
            {dadosProjetos.status.codigo === 'INICIADO' && (
              <>
                {!dadosProjetos.proBono ? (
                  <ButtonDesistir
                    onClick={() => handleCheckSubaccount('desistir')}
                  >
                    {loading ? 'CARREGANDO...' : 'DESISTIR DO PROJETO'}
                  </ButtonDesistir>
                ) : (
                  <ButtonDesistir
                    onClick={() => {
                      handleCheckSubaccount('desistir');
                    }}
                  >
                    {loading ? 'CARREGANDO...' : 'CANCELAR PROJETO'}
                  </ButtonDesistir>
                )}
              </>
            )}

            {dadosProjetos.status.codigo === 'AGUARDANDO_INICIO' && (
              <>
                {!dadosProjetos.proBono ? (
                  <ButtonDesistir
                    onClick={() => {
                      handleCheckSubaccount('cancelar');
                    }}
                  >
                    {loading ? 'CARREGANDO...' : 'CANCELAR PROJETO'}
                  </ButtonDesistir>
                ) : (
                  <ButtonDesistir
                    onClick={() => {
                      handleCheckSubaccount('cancelar');
                    }}
                  >
                    {loading ? 'CARREGANDO...' : 'CANCELAR PROJETO'}
                  </ButtonDesistir>
                )}
              </>
            )}

            {dadosProjetos.status.codigo === 'AGUARDANDO_PAGAMENTO' && (
              <Button
                onClick={() => {
                  faturasProjeto === undefined
                    ? setModalAceitarProposta(true)
                    : setShowModalManagePayment(true);
                }}
                label="GERENCIAR PAGAMENTO"
              />
            )}

            {dadosProjetos.status.codigo === 'INICIADO' && (
              <Button
                onClick={() => setModalConcluir(true)}
                label="CONCLUIR PROJETO"
              />
            )}

            {dadosProjetos.status.codigo === 'DESISTENCIA_INICIADA' &&
              dadosProjetos?.desistencia?.idPessoa !== user.id_pessoa &&
              dadosProjetos?.desistencia?.acordoRecusado === true && (
                <Titulo
                  cor={LARANJA}
                  titulo="COMBINADO RECUSADO"
                  tamanho={18}
                />
              )}

            {(dadosProjetos.status.codigo === 'CONCLUIDO' ||
              dadosProjetos.status.codigo === 'CONCLUIDO_PARCIALMENTE') && (
              <>
                {!isAvaliado && (
                  <Button
                    onClick={() => {
                      !isAvaliado &&
                        history.push('/contratante/avaliacao-projeto', {
                          idProjeto: dadosProjetos.id,
                          idFornecedor: dadosProjetos.idPessoaFornecedor,
                        });
                    }}
                    label="FAZER AVALIAÇÃO"
                  />
                )}
              </>
            )}

            {dadosProjetos.status.codigo === 'CONCLUSAO_SOLICITADA' && (
              <>
                <ButtonDesistir onClick={() => setModalReviewConclusion(true)}>
                  SOLICITAR REVISÃO
                </ButtonDesistir>
                <Button
                  onClick={() => {
                    setModalConcluir(true);
                  }}
                  label="SIM CONCLUIR"
                />
              </>
            )}

            {dadosProjetos.status.codigo === 'DESISTENCIA_INICIADA' &&
              dadosProjetos?.desistencia?.idPessoa !== user.id_pessoa &&
              dadosProjetos?.desistencia?.acordoRecusado === false && (
                <ButtonDesistir
                  onClick={() => {
                    setModalDesistir(true);
                    setCombinarNovamente(true);
                  }}
                >
                  VER COMBINADO
                </ButtonDesistir>
              )}

            {dadosProjetos.status.codigo === 'DESISTENCIA_INICIADA' &&
              dadosProjetos?.desistencia?.idPessoa === user.id_pessoa &&
              dadosProjetos?.desistencia?.acordoRecusado === false && (
                <Titulo
                  cor={LARANJA}
                  titulo="AGUARDANDO RESPOSTA"
                  tamanho={18}
                />
              )}

            {dadosProjetos?.desistencia?.idPessoa === user.id_pessoa &&
              dadosProjetos?.desistencia?.acordoRecusado && (
                <ButtonDesistir
                  onClick={() => {
                    setModalDesistir(true);
                    setCombinarNovamente(true);
                  }}
                >
                  COMBINAR NOVAMENTE
                </ButtonDesistir>
              )}
          </Col>
        </ContainerAcoes>
        <Row className="d-flex justify-content-between">
          <Col lg={6}>
            <Row className="mt-5">
              <Col lg={10}>
                {dadosProjetos.status.codigo !== 'INICIADO' ? (
                  <Titulo
                    cor={PRETO_10}
                    titulo="Informações das entregas"
                    tamanho={24}
                  />
                ) : (
                  <ProgressBar
                    percentage={handlePorcentage()}
                    date={dadosProjetos.propostaAceita.dataHoraCriacao}
                    title={
                      dadosProjetos.escopo === 'FECHADO'
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
                <TextoDescricao>
                  {dadosProjetos.propostaAceita.descricao}
                </TextoDescricao>
              </Col>
            </Row>

            {dadosProjetos.escopo === 'FECHADO' ? (
              <>
                <Row className="mt-4">
                  <Information>
                    Depois de enviar os requisitos, você verificará que o
                    fornecedor validou-os aqui:
                  </Information>
                  <Col lg={12}>
                    <RequisitosEntrega
                      getProjeto={getProjeto}
                      idProjeto={dadosProjetos.id}
                      status={dadosProjetos.status.codigo}
                      titulo="Pré requisitos para entrega"
                      requisitos={dadosProjetos.propostaAceita.requisitos}
                      visao="consumidor"
                    />
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Information>
                    Você deve validar as entregas enviados pelo seu fornecedor
                    aqui:
                  </Information>
                  <Col lg={12}>
                    <MetodosEntrega
                      getProjeto={getProjeto}
                      idProjeto={dadosProjetos.id}
                      status={dadosProjetos?.status.codigo}
                      titulo="Métodos de Entrega ou Entregáveis"
                      metodos={dadosProjetos.propostaAceita.entregaveis}
                      visao="consumidor"
                    />
                  </Col>
                </Row>
              </>
            ) : (
              <Row className="mt-4">
                {dadosProjetos?.propostaAceita?.atividades && (
                  <HourContainer>
                    <HourTitulo>Relatório das Atividades</HourTitulo>

                    <InputHour
                      disabled={dadosProjetos.status.codigo !== 'INICIADO'}
                      control={control}
                      setValue={setAtividades}
                      name="metodo_entrega"
                      label="Atividades"
                      secondaryLabel="Qnt. horas"
                      items={atividades}
                      idProjeto={dadosProjetos.id}
                      labelIsBold
                      visao="CONSUMIDOR"
                      getProjeto={getProjeto}
                    />
                    <ContentQuantidadeHora>
                      <strong>Total</strong>
                      <strong>
                        {dadosProjetos?.propostaAceita?.atividades?.reduce(
                          (total, atividade) => {
                            return total + atividade.horas;
                          },
                          0,
                        )}
                        h
                      </strong>
                    </ContentQuantidadeHora>
                  </HourContainer>
                )}
              </Row>
            )}

            <Row className="mt-5">
              <Col lg={12}>
                <p>
                  Combinei de entregar esse projeto em:{' '}
                  <TextoNegrito>
                    {dadosProjetos.propostaAceita.prazoConclusao}
                    {dadosProjetos.propostaAceita.prazoConclusao === 1
                      ? ' dia'
                      : ' dias'}
                  </TextoNegrito>
                </p>
              </Col>
              {!dadosProjetos.proBono && (
                <p>
                  Valor total:{' '}
                  <TextoNegrito>{formatToPrice(valorProjetoPago)}</TextoNegrito>
                </p>
              )}

              {dadosProjetos.escopo === 'ABERTO' && (
                <Col lg={12}>
                  <p>
                    Quantidade de horas: {''}
                    <TextoNegrito>{dadosProjetos.totalHoras}h</TextoNegrito>
                  </p>
                </Col>
              )}

              {dadosProjetos.escopo === 'ABERTO' && !dadosProjetos.proBono && (
                <p>
                  O valor da hora é:{' '}
                  <TextoNegrito>
                    {formatToPrice(
                      valorTotalProposta /
                        dadosProjetos.propostaAceita.totalHoras,
                    )}
                  </TextoNegrito>
                </p>
              )}
              <Col lg={12}>
                <p>
                  Com disponibilidade:{' '}
                  <TextoNegrito>
                    {dadosProjetos.propostaAceita.dataInicioEstimada !== null
                      ? dataValidation(
                          dadosProjetos.propostaAceita.dataInicioEstimada,
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
                  {dadosProjetos.propostaAceita.arquivos.map(
                    (arquivo: IAnexos) => (
                      <Download
                        href={arquivo.url}
                        key={arquivo.id}
                        download
                        target="blank"
                      >
                        {arquivo.url.split('-')[3]}
                      </Download>
                    ),
                  )}
                </ArquivoAnexadoContainer>

                {dadosProjetos.propostaAceita.condicoesGerais && (
                  <CondicoesGeraisContent>
                    <strong>
                      Condições gerais ou regras para o cancelamento do serviço
                    </strong>

                    <div>
                      {dadosProjetos.propostaAceita.condicoesGerais?.map(
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
                  href={`/projetos/imprimir-proposta/${dadosProjetos.propostaAceita.id}`}
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
              {dadosProjetos.status.codigo !== 'CONCLUIDO' &&
                dadosProjetos.status.codigo !== 'CONCLUIDO_PARCIALMENTE' &&
                dadosProjetos.status.codigo !== 'CANCELADO' && (
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
                              dadosProjetos.status.codigo === 'CANCELADO' ||
                              dadosProjetos.status.codigo === 'CONCLUIDO' ||
                              dadosProjetos.status.codigo ===
                                'CONCLUIDO_PARCIALMENTE'
                            }
                          />
                        </div>
                      </ContainerAnexoChat>
                      <InputStyled
                        disabled={
                          isDisabled ||
                          dadosProjetos.status.codigo === 'CANCELADO' ||
                          dadosProjetos.status.codigo === 'CONCLUIDO' ||
                          dadosProjetos.status.codigo ===
                            'CONCLUIDO_PARCIALMENTE'
                        }
                        value={chat}
                        type="text"
                        onKeyUp={(e: any) => {
                          if (e.keyCode === 13) {
                            handleChat();
                          }
                        }}
                        placeholder="Digite aqui um comentario"
                        onChange={evt => {
                          setChat(evt.target.value);
                        }}
                      />
                    </ContentFileStyled>
                    <button
                      disabled={isDisabled}
                      onClick={() => {
                        if (dadosProjetos.status.codigo !== 'CANCELADO')
                          handleChat();
                      }}
                    >
                      <FiArrowUpCircle
                        size={30}
                        color={
                          dadosProjetos.status.codigo === 'CANCELADO'
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
        </Row>
      </Card>
    </Content>
  );
}
