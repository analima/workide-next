import { ReactElement } from 'react';
import { ModalBody } from 'react-bootstrap';
import { Titulo } from '../Titulo';

import { Content, ModalConfirmation, Container } from './style';

interface IModalRecomendacao {
  showModal: boolean;
  title?: string;
  text?: string | ReactElement<any>;
  color: string;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalInformation({
  showModal,
  title,
  text,
  color,
  setShowModal,
}: IModalRecomendacao) {
  return (
    <Content>
      <ModalConfirmation
        show={showModal}
        centered
        onHide={() => {
          if (setShowModal) {
            setShowModal(false);
          }
        }}
      >
        <ModalBody>
          <Container>
            <div>
              {title && <Titulo titulo={title} cor={color} tamanho={24} />}
              <p>{text}</p>
            </div>
          </Container>
        </ModalBody>
      </ModalConfirmation>
    </Content>
  );
}
