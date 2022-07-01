import { Modal } from 'react-bootstrap';
import carol from '../../assets/carol-full-fundador.svg';
import { Content, ContainerText, ContainerButton, ButtonLink } from './style';
import Image from 'next/image'
interface IModal {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalFundador({ show, setShow }: IModal): JSX.Element {
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
          <Image className="avatar-fundador" src={carol} alt="" />
          <ContainerText>
            <h3>Que bom que você está aqui!</h3>
            <p>É muito bom tê-lo conosco. </p>
            <p>
              Como forma de agradecimento, daremos a você{' '}
              <span className="text-blue">um selo de cofundador.</span>
            </p>
            <p>
              Este selo ficará visível no seu perfil e todos poderão ver que
              você está junto com a gente desde o começo.
            </p>
            <ContainerButton>
              <ButtonLink onClick={() => setShow(false)}>APROVEITAR</ButtonLink>
            </ContainerButton>
          </ContainerText>
        </Content>
      </Modal.Body>
    </Modal>
  );
}
