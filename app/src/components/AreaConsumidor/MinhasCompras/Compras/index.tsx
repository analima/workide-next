import { Col, Row } from 'react-bootstrap';
import {
  AiFillFilePdf,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from 'react-icons/ai';
import ArrowReload from '../../../../assets/arrow_reload.svg';
import ArrowUndoUpLeft from '../../../../assets/arrow_undo_up_left.svg';
import Show from '../../../../assets/show.svg';
import { Card } from '../../../Card';
import Image from 'next/image';
import {
  AcoesContainer,
  ComprasContainer,
  CompraStatus,
  CompraDescricao,
  CompraVencimento,
  GhostButton,
  CompraFormaPagamento,
  ContainerLoading,
  EmptyList,
  DownloadLink,
  ContainerButtons,
} from './style';
import Content from './style';
import { BarraCarregamentoCircular } from '../../../BarraCarregamentoCircular';
import { useMinhasComprasConsumidor } from '../../../../hooks/minhasComprasConsumidor';
import { formatarValor } from '../../../../utils/CurrencyFormat';
import { ModalAcceptProposal } from '../../../ModalAcceptProposal';
import { useCallback, useEffect, useState } from 'react';
import { LARANJA_10 } from '../../../../styles/variaveis';
import { ModalInformation } from '../../../ModalInformation';
import { ModalLoading } from '../../../ModalLoading';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import { ModalConfirmarAtualizacaoFatura } from '../../../ModalConfirmarAtualizacaoFatura';
import { FiXCircle } from 'react-icons/fi';
import { ModalCancelamentoFatura } from '../../../ModalCancelamentoFatura';
import { usePooling } from '../../../../hooks/usePooling';
import { useAuth } from '../../../../contexts/auth';
import { pagamentos_api } from '../../../../services/pagamentos_api';

interface IMeioPagamentoProps {
  [key: string]: string;
}

interface ICompraProps {
  id_fatura: string;
  ds_descricao: string;
  vl_total_cent: number;
  nm_meio_pagamento: any;
  nm_status:
    | 'paid'
    | 'pending'
    | 'expired'
    | 'canceled'
    | 'refunded'
    | 'cancellation_requested';
  ds_url: string;
  dh_vencimento: string;
  nr_parcel: number;
  id_projeto: number;
  id_pessoa_consum: number;
  id_pessoa_forn: number;
  vl_gyan_perc: number;
}

export default function Compras() {
  const { compras, setCompras, loading } = useMinhasComprasConsumidor();
  const [compraSelecionada, setCompraSelecionada] = useState<ICompraProps>();
  const [showModalAcceptProposal, setShowModalAcceptProposal] =
    useState<boolean>(false);
  const [showModalCancelInvoice, setShowModalCancelInvoice] =
    useState<boolean>(false);
  const [loadingAtualizarFatura, setLoadingAtualizarFatura] =
    useState<boolean>(false);
  const [modalInformation, setModalInformation] = useState<boolean>(false);
  const [colorInformation, setColorInformation] = useState<string>('');
  const [mensagemModalInformation, setMensagemModalInformation] =
    useState<string>();
  const [showModalUpdateInvoice, setShowModalUpdateInvoice] =
    useState<boolean>(false);
  const helperMeioPagamento: IMeioPagamentoProps = {
    cartao_credito: 'Cartão de Crédito',
    pix: 'Pix',
    boleto: 'Boleto',
  };
  const [valorProjeto, setValorProjeto] = useState<number>(0);
  const { user } = useAuth();

  const formatDate = (data: string) => {
    const dia = data[8].concat(data[9]);
    const mes = data[5].concat(data[6]);
    const ano = `${data[0]}${data[1]}${data[2]}${data[3]}`;
    return `${dia}/${mes}/${ano}`;
  };

  const obterIProjeto = useCallback(() => {
    return compraSelecionada?.id_projeto;
  }, [compraSelecionada?.id_projeto]);

  useEffect(() => {
    const idProjeto = obterIProjeto();
    if (idProjeto) {
      oportunidades_api.get(`/projetos/${idProjeto}`).then(({ data }) => {
        setValorProjeto(data?.propostaAceita?.valor);
      });
    }
  }, [obterIProjeto]);

  const atualizarFatura = async (compraAtualizar: ICompraProps) => {
    setLoadingAtualizarFatura(true);
    setShowModalUpdateInvoice(true);
    setLoadingAtualizarFatura(false);
  };

  const verificarStatusFatura = (status: string) => {
    if (status === 'pending') {
      setColorInformation(LARANJA_10);
      setMensagemModalInformation(
        'É necessario que cancele a fatura pendente primeiro!',
      );
      setModalInformation(true);
      setTimeout(() => {
        setModalInformation(false);
      }, 3000);
      return true;
    }
    return false;
  };

  const obterIdFatura = () => {
    return compraSelecionada?.id_fatura;
  };

  const suspenderCancelamento = (status: string) => {
    if (status === 'cancellation_requested') {
      setColorInformation(LARANJA_10);
      setMensagemModalInformation(
        'Por favor, aguarde seu cancelamento esta sendo processado!',
      );
      setModalInformation(true);
      setTimeout(() => {
        setModalInformation(false);
      }, 3000);
      return true;
    }
    return false;
  };

  const acompanharStatusFatura = async () => {
    const { data } = await pagamentos_api.get(
      `/faturas-servico/contratante/${user.id_pessoa}?order=dh_criacao=DESC`,
    );
    const compraCancelada = data.values.filter(
      (item: ICompraProps) => item.id_fatura === compraSelecionada?.id_fatura,
    );
    if (
      data.values.length > compras.length ||
      compraCancelada[0]?.nm_status === 'canceled'
    )
      setCompras(data?.values);
  };
  usePooling(() => acompanharStatusFatura(), 5000);

  return (
    <Content>
      <ModalInformation
        color={colorInformation}
        title={mensagemModalInformation}
        showModal={modalInformation}
      />
      <ModalConfirmarAtualizacaoFatura
        showModal={showModalUpdateInvoice}
        setShowModal={setShowModalUpdateInvoice}
        id_pessoa_consum={compraSelecionada?.id_pessoa_consum || 0}
        id_pessoa_forn={compraSelecionada?.id_pessoa_forn || 0}
        descricao={compraSelecionada?.ds_descricao || ''}
        valor_serv_cent={valorProjeto}
        nm_meio_pagamento={compraSelecionada?.nm_meio_pagamento}
        id_projeto={compraSelecionada?.id_projeto || 0}
      />
      <ModalLoading
        showModal={loadingAtualizarFatura}
        setShowModal={setLoadingAtualizarFatura}
      />
      <ModalCancelamentoFatura
        showModal={showModalCancelInvoice}
        setShowModal={setShowModalCancelInvoice}
        idFatura={obterIdFatura() || 0}
      />
      <ModalAcceptProposal
        showModal={showModalAcceptProposal}
        setShowModal={setShowModalAcceptProposal}
        valor={valorProjeto}
        parcelas={1}
        idPessoaConsumidor={compraSelecionada?.id_pessoa_consum}
        idPessoaFornecedor={compraSelecionada?.id_pessoa_forn}
        tipo="servico"
        descricao={`${compraSelecionada?.ds_descricao}`}
        idProjeto={compraSelecionada?.id_projeto}
        nomeProjeto={''}
        mudarFormaPagamento={true}
      />
      {loading ? (
        <ContainerLoading>
          <BarraCarregamentoCircular />
        </ContainerLoading>
      ) : (
        <Card>
          {!compras?.length ? (
            <EmptyList>Não há faturas cadastradas.</EmptyList>
          ) : (
            compras?.map((compra, index) => (
              <Row key={index}>
                <Col lg={12}>
                  <ComprasContainer>
                    <Row>
                      <Col lg={4}>
                        <CompraDescricao>{compra.ds_descricao}</CompraDescricao>
                      </Col>
                      <Col lg={3}>
                        <CompraFormaPagamento>
                          Forma de pagamento:{' '}
                          {helperMeioPagamento[compra.nm_meio_pagamento]}
                        </CompraFormaPagamento>
                        <CompraVencimento>
                          Vencimento em: {formatDate(compra.dh_vencimento)}
                        </CompraVencimento>
                        <CompraFormaPagamento>
                          Valor: {formatarValor(compra.vl_total_cent / 100)}
                        </CompraFormaPagamento>
                      </Col>
                      <Col lg={2}>
                        {compra.nm_status === 'paid' && (
                          <CompraStatus className="aprovado">
                            Pago <AiOutlineCheckCircle size={24} />
                          </CompraStatus>
                        )}

                        {compra.nm_status === 'canceled' && (
                          <CompraStatus className="reprovado">
                            Cancelada <AiOutlineCloseCircle size={24} />
                          </CompraStatus>
                        )}

                        {compra.nm_status === 'pending' && (
                          <CompraStatus>Aguardando pagamento</CompraStatus>
                        )}
                        {compra.nm_status === 'refunded' && (
                          <CompraStatus>Reembolso</CompraStatus>
                        )}

                        {compra.nm_status === 'expired' && (
                          <CompraStatus className="expirado">
                            Expirada
                          </CompraStatus>
                        )}
                      </Col>
                      <Col lg={3}>
                        <AcoesContainer>
                          {compra.nm_status === 'paid' ||
                          compra.nm_status === 'refunded' ? (
                            <DownloadLink
                              href={`${compra.ds_url}`}
                              target="blank"
                              download
                            >
                              <GhostButton>
                                {/* Adicionar .pdf no final da 'ds_url_fatura' para visualizar a fatura em pdf */}
                                <AiFillFilePdf /> BAIXAR RECIBO
                              </GhostButton>
                            </DownloadLink>
                          ) : (
                            (compra.nm_status === 'expired' ||
                              compra.nm_status === 'pending' ||
                              compra.nm_status === 'canceled') && (
                              <ContainerButtons>
                                {compra.nm_status !== 'canceled' && (
                                  <button
                                    data-toggle="tooltip"
                                    title="Cancelar fatura"
                                  >
                                    <FiXCircle
                                      onClick={() => {
                                        if (
                                          suspenderCancelamento(
                                            compra?.nm_status,
                                          )
                                        )
                                          return;
                                        setCompraSelecionada(compra);
                                        setShowModalCancelInvoice(true);
                                      }}
                                      size={20}
                                      color="#c53030"
                                    />
                                  </button>
                                )}
                                {compra.nm_status !== 'expired' && (
                                  <DownloadLink
                                    href={`${compra.ds_url}`}
                                    target="blank"
                                    download
                                    data-toggle="tooltip"
                                    title="Vizualizar fatura"
                                  >
                                    <button>
                                      <Image src={Show} alt="Show" />
                                    </button>
                                  </DownloadLink>
                                )}
                                <button
                                  data-toggle="tooltip"
                                  title="Atualizar fatura"
                                  onClick={() => {
                                    if (
                                      verificarStatusFatura(compra?.nm_status)
                                    )
                                      return;
                                    if (
                                      suspenderCancelamento(compra?.nm_status)
                                    )
                                      return;
                                    setCompraSelecionada(compra);
                                    atualizarFatura(compra);
                                  }}
                                >
                                  <Image src={ArrowReload} alt="Arrow Reload" />
                                </button>
                                <button
                                  data-toggle="tooltip"
                                  title="Atualizar forma de pagamento"
                                  onClick={() => {
                                    if (
                                      verificarStatusFatura(compra?.nm_status)
                                    )
                                      return;
                                    if (
                                      suspenderCancelamento(compra?.nm_status)
                                    )
                                      return;
                                    setCompraSelecionada(compra);
                                    setShowModalAcceptProposal(true);
                                  }}
                                >
                                  <Image
                                    src={ArrowUndoUpLeft}
                                    alt="Arrow Undo Up Left"
                                  />
                                </button>
                              </ContainerButtons>
                            )
                          )}
                        </AcoesContainer>
                      </Col>
                    </Row>
                  </ComprasContainer>
                </Col>
              </Row>
            ))
          )}
        </Card>
      )}
    </Content>
  );
}
