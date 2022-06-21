import { useState } from 'react';
import {ButtonSave, ButtonToogle, Container, Modal, ToogleCircle} from './style';

interface OverlayProps {
  handleClose: () => void;
}


export function OverlayChatSettings({handleClose}: OverlayProps): JSX.Element {
  const [isActive, setIsActive] = useState(false);
  return(
    <Container>
      <Modal>
        <h1>Configurações do chat</h1>
        <div className="container-toggle">
          <ButtonToogle active={isActive} onClick={() => setIsActive(!isActive)}>
            <ToogleCircle active={isActive} />
          </ButtonToogle>
          <span>Permitir visibilidade do status</span>
        </div>
        <div className="container-button">
          <ButtonSave onClick={() => handleClose()}>Salvar</ButtonSave>
        </div>
      </Modal>
    </Container>
  )
}