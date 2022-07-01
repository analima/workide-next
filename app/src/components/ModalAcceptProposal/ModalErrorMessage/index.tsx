import { Modal } from 'react-bootstrap';
import { Content } from './style';
interface IModal {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalErrorMessage({ show, setShow }: IModal): JSX.Element {
  return (
    <Modal
      style={{ backgroundColor: 'rgba(128, 128, 128, 0.4)' }}
      show={show}
      onHide={() => setShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Content>
          <h1>
            O seu pagamanto com o cartão está em processamento, por favor
            aguarde.
          </h1>
        </Content>
      </Modal.Body>
    </Modal>
  );
}
