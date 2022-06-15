import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { BarraCarregamentoCircular } from '../../../../../components/BarraCarregamentoCircular';
import { useInformacoesFinanceiras } from '../../../../../hooks/informacoesFinanceiras';
import { pagamentos_api } from '../../../../../services/pagamentos_api';
import iconCheck from '../../../../../assets/check-azul.svg';
import QRCode from 'qrcode.react';
import { useAuth } from '../../../../../contexts/auth';
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
} from './style';
import { handleFormatDocument } from '../../../../../helpers/formatsHelper';
interface IModal {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function PixModal({ show, setShow }: IModal): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [errorSubscription, setErrorSubscription] = useState(false);
  const { user } = useAuth();
  const {
    setAssinaturaCriada,
    assinaturaEscolhida,
    assinaturaCriada,
    setMeioPagamentoEscolhido,
    buscarAssinatura,
  } = useInformacoesFinanceiras();

  async function createSubscription() {
    try {
      setIsLoading(true);
      setErrorSubscription(false);
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
      console.log(error.response);
      setErrorSubscription(true);
    } finally {
      buscarAssinatura(handleFormatDocument(user.codigo_cadastro || ''));
      setIsLoading(false);
    }
  }

  function handleCheckActiveSubscription() {
    if (assinaturaEscolhida.gratuita) {
      return (
        <ContainerPaymentFree>
          <img src={iconCheck} alt="" />
          <div className="text">
            <span>Não haverá cobrança.</span>
            <span>Não se preocupe, por aqui está tudo ok!</span>
          </div>
          <span></span>
        </ContainerPaymentFree>
      );
    }
    if (assinaturaEscolhida.ativa) {
      return (
        <ActiveSignature>Você já possui uma assinatura ativa!</ActiveSignature>
      );
    }
    if (errorSubscription) {
      return (
        <ContainerNewCharge>
          <BarraCarregamentoCircular />
          <span>Gerando nova cobrança</span>
        </ContainerNewCharge>
      );
    } else {
      return (
        <ContainerNewCharge>
          <h1>Erro ao gerar fatura</h1>
        </ContainerNewCharge>
      );
    }
  }

  useEffect(() => {
    if (show === true) createSubscription();
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
          <ContentLoad>
            {isLoading ? (
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
