import { Modal } from 'react-bootstrap';
import {
  Content,
  ContainerFinishPix,
  ContentLoad,
  ContentPixOpened,
  ContainerButton,
  Button,
  ContainerNewCharge,
  TextPendingInvoice,
  ContainerPendingInvoice,
} from './style';
import { useCallback, useEffect, useState } from 'react';
import { pagamentos_api } from '../../../../services/pagamentos_api';
import { BarraCarregamentoCircular } from '../../../BarraCarregamentoCircular';
import { GhostButton } from '../../../GhostButton';
import { useHistory } from 'react-router-dom';
import { usePagamentoPorPix } from '../../../../contexts/pagamentoPorPix';
import QRCode from 'qrcode.react';
interface IModal {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  valor: number;
  idPessoaConsumidor: number;
  idPessoaFornecedor: number;
  descricao: string;
  idProjeto: number;
}

interface IFatura {
  id_fatura_iugu: string;
  id_consum_iugu: string;
  id_subconta_forn_iugu: string;
  nm_status: string;
  dh_vencimento: string;
  nm_meio_pagamento: string;
  nr_parcel: number;
  vl_total_cent: number;
  vl_gyan_cent: number;
  vl_taxas_iugu_cent: number;
  in_email_consum: string;
  ds_url: string;
  id_pessoa_consum: number;
  id_pessoa_forn: number;
  id_fatura: number;
  dh_ultima_atualizacao: string;
}

export function PixModalServico({
  show,
  setShow,
  idPessoaConsumidor,
  idPessoaFornecedor,
  valor,
  descricao,
  idProjeto,
}: IModal): JSX.Element {
  const [fatura, setFatura] = useState<IFatura>({} as IFatura);
  const [loading, setLoading] = useState(true);
  const [jaPossuiFaturaPendente, setJaPossuiFaturaPendente] = useState(false);
  const [jaPossuiFaturaPaga, setJaPossuiFaturaPaga] = useState(false);
  const history = useHistory();
  const { initPooling } = usePagamentoPorPix();
  const handleCreateInvoice = useCallback(async () => {
    try {
      const response = await pagamentos_api.post('/faturas-servico', {
        id_pessoa_consum: idPessoaConsumidor,
        id_pessoa_forn: idPessoaFornecedor,
        descricao: descricao,
        valor_serv_cent: valor * 100,
        nm_meio_pagamento: 'pix',
        id_projeto: idProjeto,
      });
      initPooling(idProjeto, idPessoaConsumidor);
      window.open(response.data.ds_url);
      setFatura(response.data);
    } catch (error: any) {
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  }, [
    descricao,
    idPessoaConsumidor,
    idPessoaFornecedor,
    idProjeto,
    initPooling,
    valor,
  ]);

  const handleCheckAlreadyExistsInvoice = useCallback(async () => {
    try {
      setLoading(true);
      setJaPossuiFaturaPendente(false);
      const response = await pagamentos_api.get(
        `/faturas-servico/consumidor/${idPessoaConsumidor}`,
      );
      const lastInvoice = response.data.values.find(
        (fatura: any) => fatura.id_projeto === idProjeto,
      );
      if (
        lastInvoice?.nm_status === 'pending' &&
        lastInvoice.nm_meio_pagamento === 'pix'
      )
        setJaPossuiFaturaPendente(true);
      if (lastInvoice?.nm_status === 'paid') setJaPossuiFaturaPaga(true);
      else handleCreateInvoice();
    } catch (error: any) {
      if (
        error.response?.data?.message ===
        'Não foram encontradas faturas para esse consumidor'
      )
        handleCreateInvoice();
      else setLoading(false);
      console.error(error.response);
    }
  }, [handleCreateInvoice, idPessoaConsumidor, idProjeto]);

  useEffect(() => {
    if (show) handleCheckAlreadyExistsInvoice();
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
          {jaPossuiFaturaPendente && (
            <ContainerPendingInvoice>
              <TextPendingInvoice>
                Você Já possui uma fatura pendente!
              </TextPendingInvoice>
              <GhostButton
                onClick={() => history.push('/consumidor/minhas-compras')}
              >
                IR PARA MINHAS FATURAS
              </GhostButton>
            </ContainerPendingInvoice>
          )}
          {jaPossuiFaturaPaga && (
            <ContainerPendingInvoice>
              <TextPendingInvoice>
                Você Já pagou por esse projeto!
              </TextPendingInvoice>
              <GhostButton
                onClick={() => history.push('/consumidor/minhas-compras')}
              >
                IR PARA MINHAS FATURAS
              </GhostButton>
            </ContainerPendingInvoice>
          )}
          {!jaPossuiFaturaPendente && !jaPossuiFaturaPaga && (
            <ContentLoad>
              {loading ? (
                <ContainerNewCharge>
                  <BarraCarregamentoCircular />
                  <span>Gerando nova cobrança</span>
                </ContainerNewCharge>
              ) : fatura.ds_url ? (
                <div className="container-qrcode">
                  <QRCode value={fatura.ds_url || ''} />
                </div>
              ) : (
                <h1>Erro ao criar fatura</h1>
              )}
            </ContentLoad>
          )}

          <ContainerFinishPix>
            <ContentPixOpened>
              <h1>PIX em aberto</h1>
            </ContentPixOpened>
            <ContainerButton>
              <Button
                onClick={() => {
                  setShow(false);
                }}
              >
                FEITO
              </Button>
            </ContainerButton>
          </ContainerFinishPix>
        </Content>
      </Modal.Body>
    </Modal>
  );
}
