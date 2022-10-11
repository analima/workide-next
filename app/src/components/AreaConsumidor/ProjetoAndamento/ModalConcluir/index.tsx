import { useCallback, useState } from 'react';
import { Col, Container, Modal, ModalBody, Row } from 'react-bootstrap';
import { Titulo } from '../../../Titulo';

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
import { oportunidades_api } from '../../../../services/oportunidades_api';
import { useHistory } from 'react-router-dom';
import { ModalInformation } from '../../../ModalInformation';

interface IModalConcluir {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  idProjeto: number;
  progresso: number | string | undefined;
  isProBono: boolean;
}

export default function ModalConcluir({
  showModal,
  setShowModal,
  idProjeto,
  progresso,
  isProBono,
}: IModalConcluir) {
  const history = useHistory();
  const [mensagem, setMensagem] = useState('');
  const [showModalInformation, setShowModalInformation] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const concluirProjeto = useCallback(
    async (idProjeto: number) => {
      try {
        setIsLoading(true);
        const response = await oportunidades_api.patch(
          `/projetos/${idProjeto}/concluir`,
        );
        if (response.status === 200) {
          setShowModal(false);
          setIsLoading(false);
          history.push(`/contratante/avaliacao-projeto`, {
            idProjeto: idProjeto,
            idFornecedor: response.data.idPessoaFornecedor,
          });
        }
      } catch (error: any) {
        setShowModalInformation(true);
        setIsLoading(false);
        setMensagem(
          'Não foi possível concluir o projeto, contate o suporte da freelas town.',
        );

        setTimeout(() => {
          setShowModalInformation(false);
          setShowModal(false);
        }, 3000);
      }
    },
    [history, setShowModal],
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
                    titulo="ATENÇÃO: Ao concluir esse projeto,
                  você autoriza a liberação do pagamento integral
                  pelos serviços realizados a(o) contratado(a)."
                    cor={CINZA_40}
                    tamanho={24}
                  />
                )}
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <ContainerAcoes>
                  <GhostButton onClick={() => setShowModal(false)}>
                    VOLTAR
                  </GhostButton>

                  <Button
                    disabled={isLoading}
                    onClick={() => concluirProjeto(idProjeto)}
                  >
                    {isLoading ? 'Carregando...' : 'SIM, CONCLUIR PROJETO'}
                  </Button>
                </ContainerAcoes>
              </Col>
            </Row>
          </Container>
        </ModalBody>
      </Modal>
      <ModalInformation
        showModal={showModalInformation}
        title={mensagem}
        color={LARANJA}
      />
    </Content>
  );
}
