import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { pagamentos_api } from '../../../../../services/pagamentos_api';
import { GhostButton } from '../../../../GhostButton';
import { useHistory } from 'react-router-dom';

import {
  Content,
  ContainerProgressBar,
  ProgressBar,
  LoadingText,
  TextPendingInvoice,
} from './style';
interface IModal {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  valor: number;
  idPessoaConsumidor: number;
  idPessoaFornecedor: number;
  parcelas: number;
  idMeioPagamento: string;
  descricao: string;
  idProjeto: number;
}

export function ModalAprovacaoPagamento({
  show,
  setShow,
  idPessoaConsumidor,
  idPessoaFornecedor,
  valor,
  parcelas,
  idMeioPagamento,
  descricao,
  idProjeto,
}: IModal): JSX.Element {
  const [percentage, setPercentage] = useState(0);
  const [status, setStatus] = useState('REPROVADO!');
  const [jaPossuiFaturaPendente, setJaPossuiFaturaPendente] = useState(false);
  const [jaPossuiFaturaPaga, setJaPossuiFaturaPaga] = useState(false);
  const history = useHistory();

  async function handleCheckAlreadyExistsInvoice() {
    try {
      setJaPossuiFaturaPendente(false);
      const response = await pagamentos_api.get(
        `/faturas-servico/contratante/${idPessoaConsumidor}`,
      );
      const lastInvoice = response.data.values.find(
        (fatura: any) => fatura.id_projeto === idProjeto,
      );
      if (
        lastInvoice?.nm_status === 'pending' &&
        lastInvoice.nm_meio_pagamento === 'cartao_credito'
      ) {
        setJaPossuiFaturaPendente(true);
      }
      if (lastInvoice?.nm_status === 'paid') {
        setJaPossuiFaturaPaga(true);
      } else handlePayWithCreditCar();
    } catch (error: any) {
      console.error(error.response);
      if (
        error.response.data.message ===
        'Não foram encontradas faturas para esse consumidor'
      )
        handlePayWithCreditCar();
    }
  }

  async function handlePayWithCreditCar() {
    try {
      const response = await pagamentos_api.post('/faturas-servico', {
        id_pessoa_consum: Number(idPessoaConsumidor),
        id_pessoa_forn: Number(idPessoaFornecedor),
        descricao: descricao,
        valor_serv_cent: valor * 100,
        nm_meio_pagamento: 'cartao_credito',
        id_projeto: idProjeto,
        nr_parcelas: 1,
      });
      await pagamentos_api.post('faturas-servico/cobranca', {
        id_fatura_iugu: response.data.id_fatura_iugu,
        id_meio_pagamento_iugu: idMeioPagamento,
      });
      setStatus('APROVADO!');
      setTimeout(() => {
        setShow(false);
        history.push('/contratante/minhas-compras');
      }, 7000);
    } catch (error: any) {
      console.error(error.response);
      setStatus('REPROVADO!');
    }
  }

  function handleSetPercentage() {
    try {
      handleCheckAlreadyExistsInvoice();
      setPercentage(0);
      setTimeout(() => {
        setPercentage(20);
      }, 3000);

      setTimeout(() => {
        setPercentage(45);
      }, 7500);

      setTimeout(() => {
        setPercentage(75);
      }, 9500);

      setTimeout(() => {
        setPercentage(98);
      }, 11000);
      setTimeout(() => {
        setPercentage(100);
      }, 14000);
      setTimeout(() => {
        if (status === 'APROVADO!') history.push('/contratante/minhas-compras');
      }, 16000);
    } catch (error) {}
  }

  useEffect(() => {
    if (show) {
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
          {jaPossuiFaturaPendente && (
            <>
              <TextPendingInvoice>
                Você Já possui uma fatura pendente!
              </TextPendingInvoice>
              <GhostButton
                onClick={() => history.push('/contratante/minhas-compras')}
              >
                IR PARA MINHAS FATURAS
              </GhostButton>
            </>
          )}
          {jaPossuiFaturaPaga && (
            <>
              <TextPendingInvoice>
                Você Já pagou por esse projeto!
              </TextPendingInvoice>
              <GhostButton
                onClick={() => history.push('/contratante/minhas-compras')}
              >
                IR PARA MINHAS FATURAS
              </GhostButton>
            </>
          )}
          {!jaPossuiFaturaPendente && !jaPossuiFaturaPaga && (
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
