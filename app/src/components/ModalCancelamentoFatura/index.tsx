import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
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
  idFatura: number | string;
}

export function ModalCancelamentoFatura({
  showModal,
  idFatura,
  setShowModal,
}: IModalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [modalInformation, setModalInformation] = useState<boolean>(false);
  const [colorInformation, setColorInformation] = useState<string>('');
  const [mensagemModalInformation, setMensagemModalInformation] =
    useState<string>();

  const cancelarFatura = async () => {
    setLoading(true);
    try {
      await pagamentos_api.delete(`/faturas-servico/${idFatura}`);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setShowModal(false);
      setColorInformation(VERDE);
      setMensagemModalInformation(
        'Por favor, aguarde o processo para cancelamento da fatura pode demorar até 30 segundos.',
      );
      setModalInformation(true);
      setTimeout(() => {
        setModalInformation(false);
      }, 5000);
    } catch (err: any) {
      console.error(err.response);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setShowModal(false);
      setColorInformation(LARANJA_10);
      setMensagemModalInformation('Erro ao cancelar fatura.');
      setModalInformation(true);
      setTimeout(() => {
        setModalInformation(false);
      }, 3000);
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
            <Titulo>Cancelar Fatura</Titulo>
            <MensagemAviso>
              Não efetue esse processo caso já tenha pago a fatura anterior.
            </MensagemAviso>
            <MensagemAviso>
              O processo de cancelamento pode levar até 30 segundos.
            </MensagemAviso>
            <Mensagem>Tem certeza que deseja cancelar a fatura?</Mensagem>

            <ContainerButtons>
              <ButtonConfirm onClick={() => cancelarFatura()}>
                {loading ? 'Carregando...' : 'Sim'}
              </ButtonConfirm>
              <ButtonCloseModal onClick={() => setShowModal(false)}>
                Não
              </ButtonCloseModal>
            </ContainerButtons>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}
