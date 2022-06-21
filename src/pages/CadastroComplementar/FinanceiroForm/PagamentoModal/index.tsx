import { useState } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { Titulo } from '../../../../components/Titulo';
import { AZUL } from '../../../../styles/variaveis';
import { CartaoCreditoModal } from './CartaoCreditoModal';
import { PixModal } from './PixModal';
import { CardTipoPagamento, CardTipoPagamentoDisabled, Content } from './style';
import pixIcon from '../../../../assets/pix-icon.svg';
import boletoIcon from '../../../../assets/boleto.svg';
import cartaoIcon from '../../../../assets/cartao-credito.svg';
import Image from 'next/image'
interface IModal {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function PagamentoModal({ show, setShow }: IModal) {
  const [creditoShow, setCreditoShow] = useState(false);
  const [pixShow, setPixShow] = useState(false);

  return (
    <Content>
      <CartaoCreditoModal show={creditoShow} setShow={setCreditoShow} />
      <PixModal show={pixShow} setShow={setPixShow} />

      <Modal show={show} onHide={() => setShow(false)} size="xl">
        <Modal.Body>
          <Row>
            <Col lg={12}>
              <Titulo titulo="Minha Carteira" tamanho={24} cor={AZUL} />
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <CardTipoPagamento
                onClick={() => {
                  setCreditoShow(true);
                }}
              >
                <div>
                  <Titulo titulo="Cartão de crédito" tamanho={24} cor={AZUL} />
                </div>

                <div>
                  <Image src={cartaoIcon} alt="" />
                </div>
              </CardTipoPagamento>
            </Col>
            <Col lg={4}>
              <CardTipoPagamento
                onClick={() => {
                  setPixShow(true);
                }}
              >
                <div>
                  <Titulo titulo="PIX" tamanho={24} cor={AZUL} />
                </div>

                <div>
                  <Image src={pixIcon} alt="" />
                </div>
              </CardTipoPagamento>
            </Col>
            <Col lg={4}>
              <CardTipoPagamentoDisabled onClick={() => {}}>
                <div className="content-enabled">
                  <Titulo titulo="Boleto Bancário" tamanho={24} cor={AZUL} />
                </div>
                <div className="content-disabled">
                  <Titulo titulo="Em breve" tamanho={24} cor={AZUL} />
                </div>

                <div>
                  <Image src={boletoIcon} alt="" />
                </div>
              </CardTipoPagamentoDisabled>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </Content>
  );
}
