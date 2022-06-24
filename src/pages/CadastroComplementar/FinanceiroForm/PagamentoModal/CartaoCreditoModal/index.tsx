import { useEffect, useState } from 'react';
import { Alert, Col, Modal, Row } from 'react-bootstrap';
import { Titulo } from '../../../../../components/Titulo';
import { AZUL } from '../../../../../styles/variaveis';
import { FiXCircle } from 'react-icons/fi';

import {
  BoxRegistrosCartao,
  BtnAdicionarCartao,
  Cartao,
  LabelAdicionarCartao,
  LoadingText,
  RegistrosCartao,
  CardText,
} from './style';
import Content from './style';
import { Button } from '../../../../../components/Form/Button';
import NovoCartaoModal from './NovoCartaoModal';
import { useInformacoesFinanceiras } from '../../../../../hooks/informacoesFinanceiras';
import { Spacer } from '../../../../../components/Spacer';
import ModalAprovacaoPagamento from './ModalAprovacaoPagamento';
import { FiTrash2 } from 'react-icons/fi';
import { pagamentos_api } from '../../../../../services/pagamentos_api';
import ModalDeletarCartao from './ModalDeletarCartao';
import { handleFormatDocument } from '../../../../../helpers/formatsHelper';
import { useAuth } from '../../../../../contexts/auth';
interface IModal {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IPaymentMethod {
  id: string;
  nome: string;
  numeroCartao: string;
  mesVencimento: string;
  anoVencimento: string;
}

export default function CartaoCreditoModal({ show, setShow }: IModal) {
  const { assinaturaEscolhida } = useInformacoesFinanceiras();
  const [showNovoCartao, setShowNovoCartao] = useState(false);
  const [showModalAprovacao, setShowModalAprovacao] = useState(false);
  const [showModalDeletarCartao, setShowModalDeletarCartao] = useState(false);
  const [paymentMethodSelected, setPaymentMethodSelected] = useState('');
  const [error, setError] = useState('');
  const [idCartao, setIdCartao] = useState('');
  const { user } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState<Array<IPaymentMethod>>(
    [] as Array<IPaymentMethod>,
  );
  const [isLoading, setIsLoading] = useState(false);

  function handleFormatPlanPrice(price: number) {
    if (price === 0 || assinaturaEscolhida.gratuita) return 'R$ 0';
    const formatedPrice = price?.toString();
    return `R$ ${formatedPrice[0]}${formatedPrice[1]},${formatedPrice[2]}${formatedPrice[3]}`;
  }

  async function findPaymentMethods() {
    try {
      setIsLoading(true);
      const response = await pagamentos_api.get(
        `/meios-pagamento/${handleFormatDocument(user.codigo_cadastro || '')}`,
      );
      const arrayPaymentMethodsAux: Array<IPaymentMethod> = [];
      response.data.forEach((item: any) => {
        arrayPaymentMethodsAux.push({
          id: item.id,
          nome: item.data.holder_name,
          numeroCartao: item.data.display_number,
          anoVencimento: item.data.year.toString(),
          mesVencimento:
            item.data.month < 10
              ? `0${item.data.month}`
              : item.data.month.toString(),
        });
      });
      setPaymentMethods(arrayPaymentMethodsAux);
    } catch (error: any) {
      console.log(error.response);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setError('');
    findPaymentMethods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, showNovoCartao]);

  function handlePaySubscription() {
    if (!paymentMethodSelected.length) {
      setError('Você deve selecionar um cartão.');
      return;
    }
    setShowModalAprovacao(true);
  }

  return (
    <Content>
      <ModalDeletarCartao
        show={showModalDeletarCartao}
        setShow={setShowModalDeletarCartao}
        id_meio_pagamento_iugu={idCartao}
        atualizarListaCartoes={findPaymentMethods}
      />
      <NovoCartaoModal show={showNovoCartao} setShow={setShowNovoCartao} />
      <ModalAprovacaoPagamento
        show={showModalAprovacao}
        setShow={setShowModalAprovacao}
        id_meio_pagamento_iugu={paymentMethodSelected}
      />

      <Modal
        style={{ backgroundColor: 'rgba(128, 128, 128, 0.4)' }}
        show={show}
        onHide={() => setShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // dialogClassName={'cartao-modal'}
      >
        <Modal.Body>
          {error && (
            <Row>
              <Col lg={12}>
                <Alert
                  variant="danger"
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  {error}
                  <FiXCircle
                    className="fechar"
                    onClick={() => setError('')}
                    size={20}
                    color="#c53030"
                  />
                </Alert>
              </Col>
            </Row>
          )}
          <Row className="mb-4">
            <Col lg={12}>
              <Titulo
                titulo="Pagamento com cartão de crédito"
                tamanho={24}
                cor={AZUL}
              />
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <BtnAdicionarCartao onClick={() => setShowNovoCartao(true)}>
                +
              </BtnAdicionarCartao>
              <LabelAdicionarCartao>Adicionar Cartão</LabelAdicionarCartao>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <BoxRegistrosCartao>
                <RegistrosCartao>
                  {isLoading ? (
                    <LoadingText>Carregando...</LoadingText>
                  ) : (
                    paymentMethods.map(paymentMethod => {
                      return (
                        <Cartao key={paymentMethod.id}>
                          <div>
                            <input
                              type="radio"
                              name="cartao"
                              id={paymentMethod.id}
                              onChange={() =>
                                setPaymentMethodSelected(paymentMethod.id)
                              }
                            />
                            <CardText>
                              {paymentMethod.nome} -{' '}
                              {paymentMethod.numeroCartao} -{' '}
                              {paymentMethod.mesVencimento}/
                              {paymentMethod.anoVencimento}
                            </CardText>
                          </div>
                          <FiTrash2
                            onClick={() => {
                              setIdCartao(paymentMethod.id);
                              setShowModalDeletarCartao(true);
                            }}
                          />
                        </Cartao>
                      );
                    })
                  )}
                </RegistrosCartao>
              </BoxRegistrosCartao>
            </Col>
          </Row>
          <Spacer size={30} />
          <Row className="align-items-end">
            <Col lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                label={`PAGAR ${handleFormatPlanPrice(
                  assinaturaEscolhida.preco || 0,
                )}`}
                onClick={() => handlePaySubscription()}
              />
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </Content>
  );
}
