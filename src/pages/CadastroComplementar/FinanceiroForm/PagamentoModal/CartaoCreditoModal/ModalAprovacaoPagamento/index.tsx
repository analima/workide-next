import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useInformacoesFinanceiras } from '../../../../../../hooks/informacoesFinanceiras';
import { pagamentos_api } from '../../../../../../services/pagamentos_api';
import iconCheck from '../../../../../../assets/check-azul.svg';
import { useLimitacoesPlanos } from '../../../../../../contexts/planLimitations';
import { useAuth } from '../../../../../../contexts/auth';
import {
  Content,
  ContainerProgressBar,
  ProgressBar,
  LoadingText,
  ContainerPaymentFree,
} from './style';
import { handleFormatDocument } from '../../../../../../helpers/formatsHelper';
interface IModal {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  id_meio_pagamento_iugu: string;
}

export function ModalAprovacaoPagamento({
  show,
  setShow,
  id_meio_pagamento_iugu,
}: IModal): JSX.Element {
  const [percentage, setPercentage] = useState(0);
  const [status, setStatus] = useState('APROVADO!');
  const { user } = useAuth();
  const {
    dadosClienteIugu,
    assinaturaEscolhida,
    setAssinaturaCriada,
    setMeioPagamentoEscolhido,
    buscarAssinatura,
  } = useInformacoesFinanceiras();
  const { buscarLimitacoes } = useLimitacoesPlanos();

  async function createSubscription() {
    try {
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
    } catch (error: any) {
      console.log(error.response);
      setStatus('REPROVADO!');
    } finally {
      buscarAssinatura(handleFormatDocument(user.codigo_cadastro || ''));
    }
  }

  function handleSetPercentage() {
    setPercentage(0);
    try {
      createSubscription();
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
          {assinaturaEscolhida.gratuita ||
          dadosClienteIugu.fundador ||
          assinaturaEscolhida.ativa ? (
            <ContainerPaymentFree>
              <img src={iconCheck} alt="" />
              <div className="text">
                {assinaturaEscolhida.ativa ? (
                  <span>Você já possui uma assinatura ativa.</span>
                ) : (
                  <>
                    <span>Não haverá cobrança.</span>
                    <span>Não se preocupe, por aqui está tudo ok!</span>
                  </>
                )}
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
