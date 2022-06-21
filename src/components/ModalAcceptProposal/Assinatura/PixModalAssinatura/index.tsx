import { useState, useEffect, useCallback } from 'react';
import { Modal } from 'react-bootstrap';
import { BarraCarregamentoCircular } from '../../../BarraCarregamentoCircular';
import { useInformacoesFinanceiras } from '../../../../hooks/informacoesFinanceiras';
import { pagamentos_api } from '../../../../services/pagamentos_api';
import iconCheck from '../../../../assets/check-azul.svg';
import QRCode from 'qrcode.react';
import { GhostButton } from '../../../GhostButton';
import { useHistory } from 'react-router-dom';
import {
  Content,
  ContainerFinishPix,
  ContentLoad,
  ContentPixOpened,
  ContainerButton,
  Button,
  ContainerNewCharge,
  ContainerPaymentFree,
  ActiveSignature,
  ContainerPendingInvoice,
  TextPendingInvoice,
} from './style';
import Image from 'next/image'
import { handleFormatDocument } from '../../../../helpers/formatsHelper';
import { useAuth } from '../../../../contexts/auth';
interface IModal {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  descricao: string;
}

export function PixModalAssinatura({
  show,
  setShow,
  descricao,
}: IModal): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [errorSubscription, setErrorSubscription] = useState(false);
  const [jaPossuiFaturaPendente, setJaPossuiFaturaPendente] = useState(false);
  const [jaPossuiAssinaturaAtiva, setJaPossuiAssinaturaAtiva] = useState(false);
  const history = useHistory();
  const { user } = useAuth();
  const {
    dadosClienteIugu,
    setAssinaturaCriada,
    assinaturaEscolhida,
    assinaturaCriada,
    setMeioPagamentoEscolhido,
    buscarAssinatura,
  } = useInformacoesFinanceiras();

  useEffect(() => {
    if (show === true) handleCheckAlreadyExistsInvoice();
    else buscarAssinatura(handleFormatDocument(user.codigo_cadastro || ''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const createSubscription = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorSubscription(false);

      setJaPossuiAssinaturaAtiva(false);

      const body = {
        cpf_cnpj: handleFormatDocument(user.codigo_cadastro || ''),
        identificador_plano: assinaturaEscolhida.identificador_plano,
        forma_pagamento: 'pix',
        cobranca_recorrente: true,
      };
      const response = await pagamentos_api.post('/assinaturas', body);
      setAssinaturaCriada(response.data);
      setMeioPagamentoEscolhido('pix');
    } catch (error: any) {
      setIsLoading(false);
      if (
        error.response.data.message ===
        'O cliente informado já possui uma assinatura ativa'
      )
        setJaPossuiAssinaturaAtiva(true);
      setErrorSubscription(true);
      console.error(error.response);
    } finally {
      setIsLoading(false);
    }
  }, [
    assinaturaEscolhida.identificador_plano,
    setAssinaturaCriada,
    setMeioPagamentoEscolhido,
    user.codigo_cadastro,
  ]);

  const handleCheckAlreadyExistsInvoice = useCallback(async () => {
    try {
      setIsLoading(true);
      setJaPossuiFaturaPendente(false);
      const response = await pagamentos_api.get(
        `/faturas-assinatura/${handleFormatDocument(
          user.codigo_cadastro || '',
        )}/atual`,
      );
      if (response.data.ds_status === 'pending')
        setJaPossuiFaturaPendente(true);
      else {
        createSubscription();
      }
    } catch (error: any) {
      if (
        error.response?.data?.message ===
          'Não foi encontrado faturas para esse cliente' ||
        error.response?.data?.message === 'Cliente não encontrado' ||
        error.response?.data?.message ===
          'Não existe faturas de assinatura para esse usuário'
      )
        createSubscription();
      console.error(error.response);
      setIsLoading(false);
    }
  }, [createSubscription, user.codigo_cadastro]);

  function handleCheckActiveSubscription() {
    if (assinaturaEscolhida.gratuita || dadosClienteIugu.fundador) {
      return (
        <ContainerPaymentFree>
          <Image src={iconCheck} alt="" />
          <div className="text">
            <span>
              Não haverá cobrança no período de 6 meses em que você está
              consumindo o desconto de co-fundador.
            </span>
          </div>
          <span></span>
        </ContainerPaymentFree>
      );
    }

    if (jaPossuiAssinaturaAtiva) {
      return (
        <ActiveSignature>Você já possui uma assinatura ativa!</ActiveSignature>
      );
    }
    if (!errorSubscription) {
      return (
        <ContainerNewCharge>
          <BarraCarregamentoCircular />
          <span>Gerando nova cobrança</span>
        </ContainerNewCharge>
      );
    }
    return (
      <ContainerNewCharge>
        <TextPendingInvoice>Erro ao gerar fatura.</TextPendingInvoice>
      </ContainerNewCharge>
    );
  }

  return (
    <Modal
      style={{ backgroundColor: 'rgba(128, 128, 128, 0.4)' }}
      show={show}
      onHide={() => setShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Content>
          <ContentLoad>
            {jaPossuiFaturaPendente ? (
              <ContainerPendingInvoice>
                <TextPendingInvoice>
                  Você Já possui uma fatura pendente!
                </TextPendingInvoice>
                <GhostButton
                  onClick={() => history.push('/fornecedor/minhas-compras')}
                >
                  IR PARA MINHAS FATURAS
                </GhostButton>
              </ContainerPendingInvoice>
            ) : isLoading ? (
              <ContainerNewCharge>
                <BarraCarregamentoCircular />
                <span>Gerando nova cobrança</span>
              </ContainerNewCharge>
            ) : assinaturaCriada?.url ? (
              <QRCode value={assinaturaCriada.url || ''} />
            ) : (
              handleCheckActiveSubscription()
            )}
          </ContentLoad>
          <ContainerFinishPix>
            <ContentPixOpened>
              <h1>PIX em aberto</h1>
            </ContentPixOpened>
            <ContainerButton>
              <Button onClick={() => setShow(false)}>FEITO</Button>
            </ContainerButton>
          </ContainerFinishPix>
        </Content>
      </Modal.Body>
    </Modal>
  );
}
