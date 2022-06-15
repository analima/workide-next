import { useCallback } from 'react';
import { useState } from 'react';
import { ModalBody } from 'react-bootstrap';
import { FaSpinner } from 'react-icons/fa';
import { oportunidades_api } from '../../services/oportunidades_api';
import { TextArea } from '../TextArea';
import { Titulo } from '../Titulo';

import {
  Content,
  ModalConfirmation,
  Container,
  MensagemErro,
  ContentFooter,
  ButtonCancel,
  BidsButton,
} from './style';

interface IModalRecomendacao {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  color: string;
  idProjeto: number;
  getProjeto: () => void;
  buscaMensagem: () => void;
}

export function ModalReviewConclusao({
  showModal,
  title,
  color,
  setShowModal,
  idProjeto,
  getProjeto,
  buscaMensagem,
}: IModalRecomendacao) {
  const [mensagem, setMensagem] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReview = useCallback(async () => {
    if (mensagem.length === 0) {
      setError(true);
      setErrorMessage('Preencha o campo acima por favor!');
      return;
    }
    setError(false);
    setLoading(true);

    const body = {
      mensagem,
    };
    await oportunidades_api.patch(
      `/projetos/${idProjeto}/solicitar-revisao`,
      body,
    );
    setShowModal(false);
    setMensagem('');
    getProjeto();
    buscaMensagem();
    setLoading(false);
  }, [buscaMensagem, getProjeto, idProjeto, mensagem, setShowModal]);

  return (
    <Content>
      <ModalConfirmation
        onHide={() => {
          setShowModal(false);
          setMensagem('');
          setLoading(false);
        }}
        show={showModal}
        centered
      >
        <ModalBody>
          <Container>
            <Titulo titulo={title} cor={color} tamanho={24} />
            <span>
              Envie uma mensagem a(o) forncedor(a) explicando melhor o que ficou
              faltando:
            </span>
            <TextArea
              placeholder="Mensagem"
              name="denuncia"
              setter={setMensagem}
              value={mensagem}
            />

            {error && <MensagemErro>{errorMessage}</MensagemErro>}
            <ContentFooter>
              <BidsButton
                onClick={() => {
                  setShowModal(false);
                  setMensagem('');
                  setLoading(false);
                }}
              >
                Cancelar
              </BidsButton>
              <ButtonCancel onClick={handleReview}>
                {loading ? (
                  <FaSpinner color="#fff" size={18} />
                ) : (
                  'SOLICITAR REVISÃO'
                )}
              </ButtonCancel>
            </ContentFooter>
          </Container>
        </ModalBody>
      </ModalConfirmation>
    </Content>
  );
}
