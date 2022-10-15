import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { pagamentos_api } from '../../services/pagamentos_api';
import { LARANJA_10, VERDE } from '../../styles/variaveis';
import { ModalInformation } from '../ModalInformation';
import {
  Titulo,
  Container,
  MensagemAviso,
  Mensagem,
  ContainerButtons,
  ButtonConfirm,
  ButtonCloseModal,
} from './styles';

interface IModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  id_pessoa_consum: number;
  id_pessoa_forn: number;
  descricao: string;
  valor_serv_cent: number;
  nm_meio_pagamento: string;
  id_projeto: number;
}

export function ModalConfirmarAtualizacaoFatura({
  showModal,
  setShowModal,
  id_pessoa_consum,
  id_pessoa_forn,
  descricao,
  valor_serv_cent,
  nm_meio_pagamento,
  id_projeto,
}: IModalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [modalInformation, setModalInformation] = useState<boolean>(false);
  const [colorInformation, setColorInformation] = useState<string>('');
  const [mensagemModalInformation, setMensagemModalInformation] =
    useState<string>();
  const history = useHistory();

  const atualizarFatura = async () => {
    setLoading(true);
    try {
      await pagamentos_api.post('/faturas-servico', {
        id_pessoa_consum: id_pessoa_consum,
        id_pessoa_forn: id_pessoa_forn,
        descricao: descricao,
        valor_serv_cent: valor_serv_cent * 100,
        nm_meio_pagamento: nm_meio_pagamento,
        id_projeto: id_projeto,
      });
      setColorInformation(VERDE);
      setMensagemModalInformation('Fatura atualizada com sucesso!');
      setLoading(false);
      setModalInformation(true);
      setTimeout(() => {
        setModalInformation(false);
        setMensagemModalInformation('');
        history.push('/contratante/minhas-compras');
      }, 3000);
      setLoading(false);
      setShowModal(false);
    } catch (error: any) {
      console.error(error.response);
      setColorInformation(LARANJA_10);
      setMensagemModalInformation('Erro ao atualizar fatura!');
      setLoading(false);
      setModalInformation(true);
      setTimeout(() => {
        setModalInformation(false);
      }, 3000);
      setShowModal(false);
    }
  };

  return (
    <>
      <ModalInformation
        color={colorInformation}
        title={mensagemModalInformation}
        showModal={modalInformation}
      />
      <Modal show={showModal} size="lg" centered>
        <Modal.Body>
          <Container>
            <Titulo>Atualizar Fatura</Titulo>
            <MensagemAviso>
              Não efetue esse processo caso já tenha pago a fatura anterior.
            </MensagemAviso>
            <Mensagem>Tem certeza que deseja atualizar a fatura?</Mensagem>

            <ContainerButtons>
              <ButtonConfirm onClick={() => atualizarFatura()}>
                {loading ? 'Carregando...' : 'Confirmar'}
              </ButtonConfirm>
              <ButtonCloseModal onClick={() => setShowModal(false)}>
                Cancelar
              </ButtonCloseModal>
            </ContainerButtons>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}
