import { useCallback, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useInformacoesFinanceiras } from '../../../../../hooks/informacoesFinanceiras';
import { pagamentos_api } from '../../../../../services/pagamentos_api';
import iconCheck from '../../../../../assets/check-azul.svg';
import { useLimitacoesPlanos } from '../../../../../contexts/planLimitations';
import { GhostButton } from '../../../../../components/GhostButton';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../../../contexts/auth';
import {
  Content,
  ContainerProgressBar,
  ProgressBar,
  LoadingText,
  ContainerPaymentFree,
  TextPendingInvoice,
} from './style';
import { handleFormatDocument } from '../../../../../helpers/formatsHelper';
interface IModal {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  id_meio_pagamento_iugu: string;
  descricao: string;
}

export function ModalAprovacaoPagamento({
  show,
  setShow,
  id_meio_pagamento_iugu,
  descricao,
}: IModal): JSX.Element {
  const [percentage, setPercentage] = useState(0);
  const [status, setStatus] = useState('REPROVADO!');
  const [jaPossuiFaturaPendente, setJaPossuiFaturaPendente] = useState(false);
  const [jaPossuiAssinaturaAtiva, setJaPossuiAssinaturaAtiva] = useState(false);
  const history = useHistory();
  const { user } = useAuth();
  const {
    dadosClienteIugu,
    assinaturaEscolhida,
    setAssinaturaCriada,
    setMeioPagamentoEscolhido,
    buscarAssinatura,
  } = useInformacoesFinanceiras();
  const { buscarLimitacoes } = useLimitacoesPlanos();

  async function handleCheckAlreadyExistsInvoice() {
    try {
      setJaPossuiFaturaPendente(false);
      const response = await pagamentos_api.get(
        `/faturas-assinatura/${handleFormatDocument(
          user.codigo_cadastro || '',
        )}/atual`,
      );
      if (response.data.ds_status === 'pending')
        setJaPossuiFaturaPendente(true);
      else {
        await buscarAssinatura(
          handleFormatDocument(user.codigo_cadastro || ''),
        );
        createSubscription();
      }
    } catch (error: any) {
      console.error(error);
      if (
        error.response?.data?.message ===
        'Não existe faturas de assinatura para esse usuário'
      )
        createSubscription();
    }
  }

  const createSubscription = useCallback(async () => {
    try {
      if (!assinaturaEscolhida.identificador_plano)
        await buscarAssinatura(
          handleFormatDocument(user.codigo_cadastro || ''),
        );
      setJaPossuiAssinaturaAtiva(false);
      const body = {
        cpf_cnpj: handleFormatDocument(user.codigo_cadastro || ''),
        identificador_plano: assinaturaEscolhida.identificador_plano,
        forma_pagamento: 'cartao_credito',
        id_meio_pagamento_iugu,
        cobranca_recorrente: true,
      };
      const response = await pagamentos_api.post('/assinaturas', body);
      setAssinaturaCriada(response.data);
      setMeioPagamentoEscolhido('cartao');
      setStatus('APROVADO!');
      buscarLimitacoes();
      setTimeout(() => {
        setShow(false);
      }, 3000);
    } catch (error: any) {
      console.log(error.response);
      if (
        error.response.data.message ===
        'O cliente informado já possui uma assinatura ativa'
      )
        setJaPossuiAssinaturaAtiva(true);
      else setStatus('REPROVADO!');
    } finally {
      buscarAssinatura(handleFormatDocument(user.codigo_cadastro || ''));
    }
  }, [
    assinaturaEscolhida.identificador_plano,
    buscarAssinatura,
    buscarLimitacoes,
    id_meio_pagamento_iugu,
    setAssinaturaCriada,
    setMeioPagamentoEscolhido,
    setShow,
    user.codigo_cadastro,
  ]);

  function handleSetPercentage() {
    setPercentage(0);
    try {
      handleCheckAlreadyExistsInvoice();
      setTimeout(() => {
        setPercentage(20);
      }, 3000);

      setTimeout(() => {
        setPercentage(45);
      }, 3500);

      setTimeout(() => {
        setPercentage(75);
      }, 4500);

      setTimeout(() => {
        setPercentage(98);
      }, 6000);
      setTimeout(() => {
        setPercentage(100);
      }, 6500);
    } catch (error) {}
  }

  useEffect(() => {
    if (show === true) {
      handleSetPercentage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

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
          {jaPossuiFaturaPendente ? (
            <>
              <TextPendingInvoice>
                Você Já possui uma fatura pendente!
              </TextPendingInvoice>
              <GhostButton
                onClick={() => history.push('/fornecedor/minhas-compras')}
              >
                IR PARA MINHAS FATURAS
              </GhostButton>
            </>
          ) : assinaturaEscolhida.gratuita || dadosClienteIugu.fundador ? (
            <ContainerPaymentFree>
              <img src={iconCheck} alt="" />
              <div className="text">
                <span>
                  Não haverá cobrança no período de 6 meses em que você está
                  consumindo o desconto de co-fundador.
                </span>
              </div>
              <span></span>
            </ContainerPaymentFree>
          ) : jaPossuiAssinaturaAtiva ? (
            <ContainerPaymentFree>
              <div className="text">
                <span className="assinatura-ativa">
                  Você já possui uma assinatura ativa.
                </span>
              </div>
              <span></span>
            </ContainerPaymentFree>
          ) : (
            <ContainerProgressBar>
              <LoadingText>
                {percentage < 100 ? 'Já é quase seu' : status}
              </LoadingText>
              <ProgressBar percentage={percentage} status={status} />
            </ContainerProgressBar>
          )}
        </Content>
      </Modal.Body>
    </Modal>
  );
}
