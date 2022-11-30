import { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import CartaoSvg  from '../../../assets/cartao-icon.svg';
import BoletoSvg  from '../../../assets/pagamento-icon.svg';
import PixSvg  from '../../../assets/pix-icon.svg';
import { AZUL, PRETO_10 } from '../../../styles/variaveis';
import { Titulo } from '../../Titulo';
import { CartaoCreditoModalServico } from '../Servico/CartaoCreditoModalServico';
import { PixModalServico } from '../Servico/PixModalServico';
import { usePagamentoServico } from '../../../hooks/pagamentoServico';
import { useAuth } from '../../../contexts/auth';
import {
  Content,
  ContentFooter,
  ModalConfirmation,
  ModalBody,
  ButtonCancel,
  CardTipoPagamento,
  ContainerPurchaseResume,
  ContainerHeader,
} from './style';
import { ModalErrorMessage } from '../ModalErrorMessage';
import { pagamentos_api } from '../../../services/pagamentos_api';
import { formatToPrice } from '../../../helpers/formatsHelper';
import { Spacer } from '../../Spacer';
import { ModalLoading } from '../../ModalLoading';
import { CartaoCreditoModalAssinatura } from '../Assinatura/CartaoCreditoModalAssinatura';
import { PixModalAssinatura } from '../Assinatura/PixModalAssinatura';
import { BoletoModalServico } from '../Servico/BoletoModalServico';
import { pessoas_api } from '../../../services/pessoas_api';
import { FiXCircle } from 'react-icons/fi';
import { IS_EMPTY } from 'src/const';

interface IModal {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  valor?: number;
  parcelas?: number;
  tipo: 'servico' | 'assinatura';
  idPessoaConsumidor: number;
  idPessoaFornecedor: number;
  descricao: string;
  idProjeto?: number | null;
  nomeProjeto?: string;
  mudarFormaPagamento?: boolean;
}

export function ModalAcceptProposalContent({
  showModal,
  setShowModal,
  valor = 0,
  parcelas = 1,
  tipo,
  idPessoaConsumidor,
  idPessoaFornecedor,
  descricao,
  idProjeto,
  nomeProjeto,
  mudarFormaPagamento = false,
}: IModal) {
  const [creditoShow, setCreditoShow] = useState(false);
  const [pixShow, setPixShow] = useState(false);
  const [showModalBoleto, setShowModalBoleto] = useState(false);
  const handleClose = () => setShowModal(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [valorCartao, setValorCartao] = useState(0);
  const { user } = useAuth();
  const { setValorTotalCartao } = usePagamentoServico();
  const [loading, setLoading] = useState(false);
  const [nomeFornecedor, setNomeFornecedor] = useState('Nome do fornecedor');

  const getProviderName = useCallback(async () => {
    try {
      const response = await pessoas_api.get(`/pessoas/${idPessoaFornecedor}`);
      setNomeFornecedor(response.data.nome_tratamento);
    } catch (error: any) {
      console.error(error.response);
    }
  }, [idPessoaFornecedor]);

  useEffect(() => {
    async function handleGetPaymethMethodsFees() {
      try {
        setLoading(true);
        const responsePessoa = await pessoas_api.get(
          `/pessoas/${idPessoaFornecedor}`,
        );
        const { data } = await pagamentos_api.post('/faturas-servico/previa', {
          valor_serv_cent: (valor || IS_EMPTY) * 100,
          nm_plano_assin_fornec: responsePessoa.data.plano.toLowerCase(),
          nr_parcelas_cartao: 1,
        });
        if (mudarFormaPagamento) setValorCartao(valor);
        else
          setValorCartao(
            (data.cartao.vl_gyan_cent + data.cartao.vl_serv_cent) / 100,
          );
        if (mudarFormaPagamento) setValorTotalCartao(valor);
        else setValorTotalCartao(data.cartao.vl_total_cent / 100 + valor);
      } catch (error: any) {
        console.error(error.response);
      } finally {
        setLoading(false);
      }
    }
    if (nomeFornecedor === 'Nome do fornecedor') {
      getProviderName();
    }
    if (showModal) {
      handleGetPaymethMethodsFees();
    }
  }, [
    getProviderName,
    idPessoaFornecedor,
    mudarFormaPagamento,
    nomeFornecedor,
    setValorTotalCartao,
    showModal,
    user.codigo_cadastro,
    valor,
  ]);

  return (
    <Content>
      <ModalLoading showModal={loading} setShowModal={setLoading} />
      <ModalErrorMessage
        show={showErrorMessage}
        setShow={setShowErrorMessage}
      />
      {tipo === 'servico' ? (
        <>
          <CartaoCreditoModalServico
            show={creditoShow}
            setShow={setCreditoShow}
            valor={valor}
            valorComTaxa={valorCartao}
            idPessoaConsumidor={idPessoaConsumidor}
            idPessoaFornecedor={idPessoaFornecedor}
            parcelas={1}
            descricao={descricao}
            idProjeto={idProjeto || IS_EMPTY}
          />
          <PixModalServico
            show={pixShow}
            setShow={setPixShow}
            idPessoaConsumidor={idPessoaConsumidor || IS_EMPTY}
            idPessoaFornecedor={idPessoaFornecedor || IS_EMPTY}
            valor={valor}
            descricao={descricao}
            idProjeto={idProjeto || IS_EMPTY}
          />
          <BoletoModalServico
            show={showModalBoleto}
            setShow={setShowModalBoleto}
            idPessoaConsumidor={idPessoaConsumidor || IS_EMPTY}
            idPessoaFornecedor={idPessoaFornecedor || IS_EMPTY}
            valor={valor}
            descricao={descricao}
            idProjeto={idProjeto || IS_EMPTY}
          />
        </>
      ) : (
        <>
          <CartaoCreditoModalAssinatura
            show={creditoShow}
            setShow={setCreditoShow}
            descricao={descricao}
          />
          <PixModalAssinatura
            show={pixShow}
            setShow={setPixShow}
            descricao={descricao}
          />
        </>
      )}

      <ModalConfirmation
        show={showModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="modal-dialog modal-lg"
        onHide={handleClose}
      >
        <ModalBody>
          <Spacer size={20} />
          <ContainerHeader>
            <Titulo
              titulo={
                mudarFormaPagamento
                  ? 'Mudar forma de pagamento'
                  : 'Resumo da compra'
              }
              cor={AZUL}
              negrito
              tamanho={28}
            />
            <FiXCircle
              className="fechar"
              onClick={() => setShowModal(false)}
              size={20}
              color="#c53030"
            />
          </ContainerHeader>
          <Row>
            <Col lg={12}>
              {!mudarFormaPagamento && (
                <>
                  <Spacer size={20} />
                  <ContainerPurchaseResume>
                    <div className="price">
                      <Titulo
                        titulo={`Total ${formatToPrice(valorCartao)}`}
                        cor={PRETO_10}
                        negrito
                        tamanho={28}
                      />
                    </div>
                    <span className="provider-name">
                      Fornecedor: {nomeFornecedor}
                    </span>
                  </ContainerPurchaseResume>
                </>
              )}
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Spacer size={20} />
              {mudarFormaPagamento ? (
                <Titulo
                  titulo="Selecione a nova forma de pagamento"
                  cor={AZUL}
                  negrito
                  tamanho={16}
                />
              ) : (
                <Titulo
                  titulo="Escolha a forma de pagamento"
                  cor={AZUL}
                  negrito
                  tamanho={28}
                />
              )}
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <CardTipoPagamento
                onClick={() => {
                  setCreditoShow(true);
                }}
              >
                <div className="container-taxa">
                  <Titulo titulo="Cartão de crédito" tamanho={24} cor={AZUL} />
                </div>

                <div>
                  <CartaoSvg />
                </div>
              </CardTipoPagamento>
            </Col>
            <Col lg={4}>
              <CardTipoPagamento
                onClick={() => {
                  setPixShow(true);
                }}
              >
                <div className="container-taxa">
                  <Titulo titulo="PIX" tamanho={24} cor={AZUL} />
                </div>

                <div>
                  <PixSvg />
                </div>
              </CardTipoPagamento>
            </Col>

            <Col lg={4}>
              <CardTipoPagamento
                onClick={() => {
                  setShowModalBoleto(true);
                }}
              >
                <div className="container-taxa">
                  {tipo === 'assinatura' && (
                    <span className="em-breve">Em breve</span>
                  )}
                  <Titulo titulo="Boleto Bancário" tamanho={24} cor={AZUL} />
                </div>

                <div>
                  <BoletoSvg />
                </div>
              </CardTipoPagamento>
            </Col>
          </Row>

          <Row>
            <Col lg={6}></Col>
            <Col lg={6} className="d-flex justify-content-end">
              <ContentFooter>
                <ButtonCancel onClick={handleClose}>Cancelar</ButtonCancel>
              </ContentFooter>
            </Col>
          </Row>
        </ModalBody>
      </ModalConfirmation>
    </Content>
  );
}
