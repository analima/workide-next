import { useCallback } from 'react';
import { Col, Container, Modal, ModalBody, Row } from 'react-bootstrap';

import { ofertas_api } from '../../../../services/ofertas_api';
import { Titulo } from '../../../../components/Titulo';

import { Button, Center, GhostButton } from './style';
import Content from './style';

interface IModalExcluir {
  showModal: boolean;
  idServico: number;
  loadData: () => Promise<void>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalExcluir({
  showModal,
  idServico,
  loadData,
  setShowModal,
}: IModalExcluir) {
  const handleExcluirServico = useCallback(async () => {
    await ofertas_api.delete(`/servicos/${idServico}`);
    loadData();
    setShowModal(false);
  }, [idServico, loadData, setShowModal]);

  return (
    <Content>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalBody>
          <Container className="p-3">
            <Row className="mb-3">
              <Col lg={12} className="mb-3">
                <Center>
                  <Titulo titulo="Confirma exclusão" tamanho={24} />
                </Center>
              </Col>
              <Col lg={12}>
                <Center>
                  <p>Tem certeza que deseja exculir?</p>
                </Center>
              </Col>
            </Row>
            <Row>
              <Col lg={12} className="mt-3">
                <Center onClick={handleExcluirServico}>
                  <Button>SIM, QUERO EXCLUIR</Button>
                </Center>
              </Col>
              <Col lg={12} className="mt-3">
                <Center>
                  <GhostButton onClick={() => setShowModal(false)}>
                    CANCELAR
                  </GhostButton>
                </Center>
              </Col>
            </Row>
          </Container>
        </ModalBody>
      </Modal>
    </Content>
  );
}
