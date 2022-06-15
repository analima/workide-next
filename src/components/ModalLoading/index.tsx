import { Container, Modal, ModalBody } from 'react-bootstrap';
import { BarraCarregamentoCircular } from '../BarraCarregamentoCircular';
import { ContainerAvatar, Content } from './style';
import andre from '../../assets/andre-full-regras-plano-png.png';

interface IModalRecomendacao {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalLoading({ showModal, setShowModal }: IModalRecomendacao) {
  return (
    <Content>
      <Modal
        show={showModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="modal-dialog modal-lg"
      >
        <ModalBody>
          <Container className="p-10">
            <Content showModal={showModal}>
              <ContainerAvatar>
                <span>
                  Aguarde um instante, estamos carregando as informações.
                </span>
                <div className="container-loading">
                  <BarraCarregamentoCircular />
                </div>
              </ContainerAvatar>
              <img src={andre} alt="andre" />
            </Content>
          </Container>
        </ModalBody>
      </Modal>
    </Content>
  );
}
