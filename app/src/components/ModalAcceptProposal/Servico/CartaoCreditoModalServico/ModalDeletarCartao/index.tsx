import { useState } from 'react';
import { Alert, Modal } from 'react-bootstrap';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { handleFormatDocument } from '../../../../../helpers/formatsHelper';
import { pagamentos_api } from '../../../../../services/pagamentos_api';
import { Content, ContainerButtons, ButtonCancel, ButtonAccept } from './style';
import { useAuth } from '../../../../../contexts/auth';
interface IModal {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  id_meio_pagamento_iugu: string;
  atualizarListaCartoes: () => Promise<void>;
}

export function ModalDeletarCartao({
  show,
  setShow,
  id_meio_pagamento_iugu,
  atualizarListaCartoes,
}: IModal): JSX.Element {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  async function deletePaymentMethod() {
    try {
      setLoading(true);
      await pagamentos_api.delete(
        `/meios-pagamento/${handleFormatDocument(
          user.codigo_cadastro || '',
        )}/${id_meio_pagamento_iugu}`,
      );
      atualizarListaCartoes();
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShow(false);
        setShowSuccessMessage(false);
      }, 2000);
    } catch (error: any) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      style={{ backgroundColor: 'rgba(128, 128, 128, 0.4)' }}
      show={show}
      onHide={() => setShow(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Content>
          <div>
            {showSuccessMessage ? (
              <Alert
                variant="success"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                Cartão excluído com sucesso.
                <AiOutlineCheckCircle size={25} color="#3fbb3b" />
              </Alert>
            ) : (
              <></>
            )}

            <h1>Deseja realmente deletar o cartão?</h1>
          </div>
          <ContainerButtons>
            <ButtonCancel onClick={() => setShow(false)}>VOLTAR</ButtonCancel>
            <ButtonAccept onClick={() => deletePaymentMethod()}>
              {loading ? 'CARREGANDO...' : 'DELETAR'}
            </ButtonAccept>
          </ContainerButtons>
        </Content>
      </Modal.Body>
    </Modal>
  );
}
