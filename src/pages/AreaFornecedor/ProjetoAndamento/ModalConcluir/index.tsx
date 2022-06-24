import { Col, Container, Modal, ModalBody, Row } from 'react-bootstrap';
import { Titulo } from '../../../../components/Titulo';

import {
  Button,
  GhostButton,
  ContainerAcoes,
  BarraProgresso,
  Progresso,
  Porcentagem,
} from './style';
import Content from './style';
import { AZUL, CINZA_40, LARANJA } from '../../../../styles/variaveis';
import { useCallback, useState } from 'react';
import { oportunidades_api } from '../../../../services/oportunidades_api';

interface IModalConcluir {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  idProjeto: number;
  progresso: number | string | undefined;
  getProjeto: () => void;
  isProBono: boolean;
}

export default function ModalConcluir({
  showModal,
  setShowModal,
  idProjeto,
  progresso,
  getProjeto,
  isProBono,
}: IModalConcluir) {
  const [loading, setLoading] = useState(false);

  const concluirProjeto = useCallback(
    async (idProjeto: number) => {
      setLoading(true);
      const response = await oportunidades_api.patch(
        `/projetos/${idProjeto}/solicitar-conclusao`,
      );
      getProjeto();
      if (response.status === 204) {
        setLoading(false);
        setShowModal(false);
      }
    },
    [getProjeto, setShowModal],
  );

  return (
    <Content>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <ModalBody>
          <Container className="p-3">
            <Row className="mb-3">
              <Col lg={12} className="mb-3">
                <Titulo titulo="Concluir Projeto" cor={AZUL} tamanho={24} />
              </Col>
              <Col lg={12}>
                <p>Antes de concluir, confira o andamento do projeto.</p>
              </Col>
              <Col lg={12}>
                <BarraProgresso>
                  <Progresso porcentagem={progresso} cor={LARANJA}>
                    <Porcentagem>{progresso}%</Porcentagem>
                  </Progresso>
                </BarraProgresso>
              </Col>

              <Col lg={12} className="mb-3">
                {isProBono ? (
                  <Titulo
                    titulo="ATENÇÃO: Ao concluir este projeto o
                      status passa para concluído e habilitaremos a avaliação."
                    cor={CINZA_40}
                    tamanho={24}
                  />
                ) : (
                  <Titulo
                    titulo="ATENÇÃO: Que bom que o projeto foi concluído.
                    Agora o consumidor irá realizar o aceite do projeto."
                    cor={CINZA_40}
                    tamanho={24}
                  />
                )}
              </Col>

              <Col lg={12}>
                <p>Deseja realmente concluir esse projeto?</p>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <ContainerAcoes>
                  <GhostButton onClick={() => setShowModal(false)}>
                    CANCELAR
                  </GhostButton>

                  <Button onClick={() => concluirProjeto(idProjeto)}>
                    {loading ? (
                      <>
                        <i className="fa fa-spinner fa-spin" />
                        <span>Concluindo...</span>
                      </>
                    ) : (
                      'SIM, QUERO CONCLUIR'
                    )}
                  </Button>
                </ContainerAcoes>
              </Col>
            </Row>
          </Container>
        </ModalBody>
      </Modal>
    </Content>
  );
}
