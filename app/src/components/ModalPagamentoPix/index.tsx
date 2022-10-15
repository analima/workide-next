import { Modal } from 'react-bootstrap';
import carol from '../../assets/carol-full-fundador.svg';
import { formatToPrice } from '../../helpers/formatsHelper';
import { Content, ContainerText, ContainerButton, ButtonLink } from './style';
import { ButtonLinkLaranja } from './style';
import Image from 'next/image';
interface IModal {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  descricaoFatura: string;
  valor: number;
}

export function ModalPagamentoPix({
  show,
  setShow,
  descricaoFatura,
  valor,
}: IModal): JSX.Element {
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
            <h3>Oba, sua fatura por pix foi paga!</h3>
            <p>
              Acabamos de receber seu pagamento por pix para {descricaoFatura}{' '}
              no valor de {formatToPrice(valor / 100)}.{' '}
            </p>

            <ContainerButton>
              <ButtonLinkLaranja
                onClick={() =>
                  (window.location.href = '/contratante/minhas-compras')
                }
              >
                MINHAS COMPRAS
              </ButtonLinkLaranja>
              <ButtonLink onClick={() => setShow(false)}>OK</ButtonLink>
            </ContainerButton>
          </ContainerText>
        </Content>
      </Modal.Body>
    </Modal>
  );
}
