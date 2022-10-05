import { Col, Container, Modal, ModalBody, Row, Form } from 'react-bootstrap';
import { useState, useCallback } from 'react';
import { Titulo } from '../Titulo';
import { TextArea } from '../TextArea';
import { Content, Button, Center, Middle } from './style';
import logo from '../../assets/logo-pequena-azul.png';
import { ModalInformation } from '../ModalInformation';
import { AZUL, BRANCO } from '../../styles/variaveis';
import { FiLink } from 'react-icons/fi';
import { ofertas_api } from '../../services/ofertas_api';
import { useAuth } from '../../contexts/auth';
import { IPessoa } from '../../interfaces/IPessoa';
import Image from 'next/image';

interface IModalRecomendacao {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  link: string;
  serviceId?: number;
  loadServico?: () => void;
}

export function ModalRecomendacao({
  showModal,
  setShowModal,
  link,
  serviceId,
  loadServico,
}: IModalRecomendacao) {
  const [mensagem, setMensagem] = useState(
    'Olá amigo(a), como vai? Gostaria de compartilhar com você esse ideia. Estou usando uma plataforma muito legal chamada freelas town. Lá você encontrará muita coisa legal que vai te ajudar. Se cuida, abraço!',
  );
  let { user } = useAuth();
  if (!user) {
    user = {} as IPessoa;
  }

  const [showSuccess, setShowSuccess] = useState(false);

  const postar = useCallback(
    async (event: any) => {
      navigator.clipboard.writeText(link + '\n\n' + mensagem);
      //--> Fechar Modal
      setShowModal(false);
      setTimeout(() => {
        setShowSuccess(true);
        if (serviceId && user.id_pessoa) {
          ofertas_api.patch(
            `/servicos/${serviceId}/incrementar-compartilhamento`,
          );
        }
        setTimeout(() => {
          loadServico && loadServico();
          setShowSuccess(false);
        }, 1000);
      }, 300);
    },
    [link, loadServico, mensagem, serviceId, setShowModal, user.id_pessoa],
  );

  return (
    <Content>
      <ModalInformation
        title="Copiado com sucesso"
        color={AZUL}
        showModal={showSuccess}
      ></ModalInformation>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="modal-dialog modal-lg"
      >
        <ModalBody>
          <Container className="p-12">
            <Row>
              <Col lg={12}>
                <Middle>
                  <Titulo
                    titulo="Compartilhe essa ideia!"
                    tamanho={25}
                    cor="rgba(0, 143, 229, 1)"
                  />
                </Middle>
              </Col>

              <Row className="mb-4 d-flex align-items-end justify-content-between">
                <Col lg={8}>
                  <Form.Label>Link</Form.Label>
                  <Form.Control name="link" value={link} readOnly />
                </Col>
                <Col
                  lg={4}
                  className="d-flex align-items-end justify-content-end"
                >
                  <Image
                    src={logo}
                    alt="freelas town Logo"
                    className="logo"
                    width={'100px'}
                    height={'100px'}
                  />
                </Col>
              </Row>
            </Row>
            <Row className="mt-4">
              <Col lg={12}>
                <TextArea
                  name="denuncia"
                  setter={setMensagem}
                  value={mensagem}
                  disabled={true}
                />
              </Col>
            </Row>
            <Row className="d-flex justify-content-end">
              <Col lg={4} className="mt-3">
                <Center>
                  <Button onClick={postar}>
                    COPIAR LINK
                    <FiLink color={BRANCO} size={20} />
                  </Button>
                </Center>
              </Col>
            </Row>
          </Container>
        </ModalBody>
      </Modal>
    </Content>
  );
}
