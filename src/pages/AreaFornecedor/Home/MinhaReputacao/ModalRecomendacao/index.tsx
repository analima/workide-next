import { useState, useCallback } from 'react';
import { Col, Container, Modal, ModalBody, Row } from 'react-bootstrap';
import { Input } from '../../../../../components/Input';
import { Content, Button, ModalTitle, ModalLogo, CloseModal } from './style';

import { ReactComponent as Logo } from '../../../../../assets/gyan-logo-nome.svg';
import { TextArea } from '../../../../../components/TextArea';

import { FiArrowRightCircle } from 'react-icons/fi';
import { GrFormClose } from 'react-icons/gr';
import * as Yup from 'yup';
import {
  ErrorMessages,
  getValidationErrors,
} from '../../../../../utils/ValidationError';
import { useAuth } from '../../../../../contexts/auth';
import { FormError } from '../../../../../utils/FormError';
import { pessoas_api } from '../../../../../services/pessoas_api';
interface IModalRecomendacao {
  showModal: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalRecomendacao({
  showModal,
  setModalShow,
}: IModalRecomendacao) {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [errors, setErrors] = useState<ErrorMessages>({} as ErrorMessages);
  const { user } = useAuth();

  const post = useCallback(
    async event => {
      event.preventDefault();
      setErrors({});
      try {
        if (!email) {
          throw new FormError('email', 'O Email é obrigatório');
        }
        if (!nome) {
          throw new FormError('nome', 'O nome é obrigatório');
        }
        if (!mensagem) {
          throw new FormError('mensagem', 'A mensagem é obrigatória');
        }
        //--> Gravar Recomendacao
        var recomendacaoTemp = {
          id_pessoa: user.id_pessoa,
          ds_email_recomendador: email,
          nm_recomendador: nome,
        };
        var url = '';
        await pessoas_api
          .post('/pessoas/recomendacoes', recomendacaoTemp)
          .then(response => {
            const { id } = response.data;
            //--> Gerar Link
            var emBase64 = btoa(
              `idPessoa=${user.id_pessoa}#idRecomendacao=${id}#idUsuario=${user.id_usuario}`,
            );
            url = process.env.REACT_APP_URL + '/recomendacao?q=' + emBase64;

            var recomendacao = {
              id: id,
              id_pessoa: user.id_pessoa,
              ds_email_recomendador: email,
              nm_recomendador: nome,
              ds_link_recomendacao: url,
            };
            pessoas_api.post('/pessoas/recomendacoes', recomendacao);
          });
        setModalShow(false);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const validationErrors = getValidationErrors(error);
          setErrors(validationErrors);
        }

        if (error instanceof FormError) {
          setErrors({ ...errors, [error.field]: error.message });
        }
        console.error(error);
      }
    },
    [
      errors,
      email,
      mensagem,
      nome,
      setModalShow,
      user.id_pessoa,
      user.id_usuario,
    ],
  );

  return (
    <Content>
      <Modal
        show={showModal}
        onHide={() => setModalShow(false)}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalBody>
          <CloseModal onClick={() => setModalShow(false)}>
            <GrFormClose />
          </CloseModal>

          <Container className="p-5">
            <Row className="mb-3">
              <Col lg={8}>
                <ModalTitle>
                  Enviar solicitação de recomendação para:
                </ModalTitle>

                <Input
                  label="E-mail"
                  name="email"
                  value={email}
                  setter={setEmail}
                  placeholder="Obrigatório"
                  error={errors.email}
                />
              </Col>
              <Col lg={4}>
                <ModalLogo>
                  <Logo className="logo" />
                </ModalLogo>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col lg={8}>
                <Input
                  label="Nome"
                  name="nome"
                  value={nome}
                  setter={setNome}
                  placeholder="Nome"
                  error={errors.nome}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col lg={12}>
                <TextArea
                  label="Mensagem"
                  name="mensagem"
                  value={mensagem}
                  setter={setMensagem}
                  placeholder="Obrigatório"
                  error={errors.mensagem}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={12} className="pt-3">
                <Button className="pr-2" onClick={post}>
                  ENVIAR <FiArrowRightCircle size={24} />
                </Button>
              </Col>
            </Row>
          </Container>
        </ModalBody>
      </Modal>
    </Content>
  );
}
