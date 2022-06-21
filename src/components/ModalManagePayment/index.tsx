import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { CINZA_40, LARANJA_10 } from '../../styles/variaveis';
import { Titulo } from '../Titulo';
import { pagamentos_api } from '../../services/pagamentos_api';
import {
  ModalBody,
  ContainerConteudo,
  ContainerInfoProjeto,
  ContainerInfoFatura,
  CompraStatus,
  ContainerButtons,
  DownloadLink,
  ButtonCloseModal,
  Content,
} from './style';
import { formatarValor } from '../../utils/CurrencyFormat';
import ArrowReload from '../../assets/arrow_reload.svg';
import ArrowUndoUpLeft from '../../assets/arrow_undo_up_left.svg';
import Show from '../../assets/show.svg';
import { useAuth } from '../../contexts/auth';
import { ModalAcceptProposal } from '../ModalAcceptProposal';
import { ModalLoading } from '../ModalLoading';
import { ModalInformation } from '../ModalInformation';
import { ModalCancelamentoFatura } from '../ModalCancelamentoFatura';
import { ModalConfirmarAtualizacaoFatura } from '../ModalConfirmarAtualizacaoFatura';
import { FiXCircle } from 'react-icons/fi';
import { usePooling } from '../../hooks/usePooling';
import { useFaturaProjeto } from '../../hooks/faturasProjeto';
import Image from 'next/image'

interface IModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  idProjeto: number;
  nomeProjeto: string;
  valorProjeto: number;
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
}

interface IMeioPagamentoProps {
  [key: string]: string;
}

export function ModalManagePayment({
  show,
  setShow,
  idProjeto,
  nomeProjeto,
  valorProjeto,
}: IModalProps) {
  const [compras, setCompras] = useState<ICompraProps>({} as ICompraProps);
  const faturas: ICompraProps = useFaturaProjeto(idProjeto);
  const [tamanhoVetorFaturas, setTamanhoVetorFaturas] = useState<number>(0);
  const [showModalAcceptProposal, setShowModalAcceptProposal] =
    useState<boolean>(false);
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [modalInformation, setModalInformation] = useState<boolean>(false);
  const [showModalCancelInvoice, setShowModalCancelInvoice] =
    useState<boolean>(false);
  const [showModalUpdateInvoice, setShowModalUpdateInvoice] =
    useState<boolean>(false);
  const [colorInformation, setColorInformation] = useState<string>('');
  const [mensagemModalInformation, setMensagemModalInformation] =
    useState<string>();
  const helperMeioPagamento: IMeioPagamentoProps = {
    cartao_credito: 'Cartão de Crédito',
    pix: 'Pix',
    boleto: 'Boleto',
  };

  const formatDate = (data: string) => {
    const dia = data[8].concat(data[9]);
    const mes = data[5].concat(data[6]);
    const ano = `${data[0]}${data[1]}${data[2]}${data[3]}`;
    return `${dia}/${mes}/${ano}`;
  };

  useEffect(() => {
    setCompras(faturas);
  }, [faturas, idProjeto, user.id_pessoa]);

  const atualizarFatura = async () => {
    if (verificarStatusFatura()) return;
    if (suspenderCancelamento()) return;
    setLoading(true);
    setShowModalUpdateInvoice(true);
    setLoading(false);
  };

  const verificarStatusFatura = () => {
    if (compras?.nm_status === 'pending') {
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

  const suspenderCancelamento = () => {
    if (compras?.nm_status === 'cancellation_requested') {
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
      `/faturas-servico/consumidor/${user.id_pessoa}?order=dh_criacao=DESC`,
    );
    const compraCancelada = data.values.filter(
      (item: ICompraProps) => item.id_fatura === compras?.id_fatura,
    );
    if (
      data.values.length > tamanhoVetorFaturas ||
      compraCancelada[0]?.nm_status === 'canceled' ||
      compraCancelada[0]?.nm_status === 'cancellation_requested'
    ) {
      setCompras(compraCancelada[0]);
      setTamanhoVetorFaturas(data.values.length);
    }
  };
  usePooling(() => acompanharStatusFatura(), 5000);

  return (
    <Content>
      <ModalInformation
        color={colorInformation}
        title={mensagemModalInformation}
        showModal={modalInformation}
      />
      <ModalLoading showModal={loading} setShowModal={setLoading} />
      <ModalAcceptProposal
        showModal={showModalAcceptProposal}
        setShowModal={setShowModalAcceptProposal}
        valor={valorProjeto}
        parcelas={1}
        idPessoaConsumidor={user.id_pessoa}
        idPessoaFornecedor={compras?.id_pessoa_forn}
        tipo="servico"
        descricao={`${compras?.ds_descricao}`}
        idProjeto={idProjeto}
        nomeProjeto={nomeProjeto}
        mudarFormaPagamento={true}
      />
      <ModalCancelamentoFatura
        showModal={showModalCancelInvoice}
        setShowModal={setShowModalCancelInvoice}
        idFatura={compras?.id_fatura}
      />

      <ModalConfirmarAtualizacaoFatura
        showModal={showModalUpdateInvoice}
        setShowModal={setShowModalUpdateInvoice}
        id_pessoa_consum={compras?.id_pessoa_consum}
        id_pessoa_forn={compras?.id_pessoa_forn}
        descricao={compras?.ds_descricao}
        valor_serv_cent={valorProjeto}
        nm_meio_pagamento={compras?.nm_meio_pagamento}
        id_projeto={compras?.id_projeto}
      />

      {compras && (
        <Modal show={show} size="xl" centered>
          <ModalBody>
            <ContainerConteudo>
              {compras && (
                <>
                  <Titulo
                    titulo="Gerenciando Pagemento"
                    cor={CINZA_40}
                    tamanho={20}
                    negrito={true}
                  />
                  <ContainerInfoProjeto>
                    <Titulo
                      titulo={`${compras?.ds_descricao}`}
                      cor={CINZA_40}
                      tamanho={16}
                      negrito={true}
                    />

                    <ContainerInfoFatura>
                      <span>
                        {compras?.nm_meio_pagamento
                          ? `Pagamento via: ${
                              helperMeioPagamento[compras?.nm_meio_pagamento]
                            }`
                          : null}
                      </span>
                      <span>
                        Vencimento em:{' '}
                        {formatDate(compras?.dh_vencimento || '0000000000')}
                      </span>
                      <span>
                        Valor:{' '}
                        {formatarValor(compras?.vl_total_cent / 100) || 0}
                      </span>
                    </ContainerInfoFatura>

                    <CompraStatus>
                      {compras?.nm_status === 'pending' &&
                        'Aguardando Pagamento'}
                      {compras?.nm_status === 'cancellation_requested' &&
                        'Processando cancelamento'}
                      {compras?.nm_status === 'paid' && 'Pago'}

                      {compras?.nm_status === 'canceled' && 'Cancelada'}

                      {compras.nm_status === 'refunded' && 'Reembolso'}

                      {compras.nm_status === 'expired' && 'Expirada'}
                    </CompraStatus>

                    <ContainerButtons>
                      {compras?.nm_status !== 'canceled' && (
                        <button data-toggle="tooltip" title="Cancelar fatura">
                          <FiXCircle
                            onClick={() => {
                              if (suspenderCancelamento()) return;
                              setShowModalCancelInvoice(true);
                            }}
                            size={20}
                            color="#c53030"
                          />
                        </button>
                      )}
                      <DownloadLink
                        href={`${compras?.ds_url}`}
                        target="blank"
                        download
                        data-toggle="tooltip"
                        title="Vizualizar fatura"
                      >
                        <button>
                          <Image src={Show} alt="Show" />
                        </button>
                      </DownloadLink>

                      <button
                        onClick={() => atualizarFatura()}
                        data-toggle="tooltip"
                        title="Atualizar fatura"
                      >
                        <Image src={ArrowReload} alt="Arrow Reload" />
                      </button>
                      <button
                        data-toggle="tooltip"
                        title="Atualizar forma de pagamento"
                        onClick={() => {
                          if (verificarStatusFatura()) return;
                          if (suspenderCancelamento()) return;
                          setShowModalAcceptProposal(true);
                        }}
                      >
                        <Image src={ArrowUndoUpLeft} alt="Arrow Undo Up Left" />
                      </button>
                    </ContainerButtons>
                  </ContainerInfoProjeto>
                </>
              )}
              <ButtonCloseModal onClick={() => setShow(false)}>
                Fechar
              </ButtonCloseModal>
            </ContainerConteudo>
          </ModalBody>
        </Modal>
      )}
    </Content>
  );
}
