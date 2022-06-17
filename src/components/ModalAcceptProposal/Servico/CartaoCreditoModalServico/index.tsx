import { useCallback, useEffect, useState } from 'react';
import { Col, Modal, Row, Alert } from 'react-bootstrap';

import {
  BtnAdicionarCartao,
  Cartao,
  Content,
  LabelAdicionarCartao,
  BoxRegistrosCartao,
  RegistrosCartao,
  CardText,
  LoadingText,
  ContainerButton,
} from './style';
import { FiXCircle } from 'react-icons/fi';
import { NovoCartaoModal } from './NovoCartaoModal';
import { ModalAprovacaoPagamento } from './ModalAprovacaoPagamento';
import { Titulo } from '../../../Titulo';
import { AZUL } from '../../../../styles/variaveis';
import { Button } from '../../../Form/Button';
import { useAuth } from '../../../../contexts/auth';
import { Spacer } from '../../../Spacer';
import { InputCheck } from '../../../Form/InputCheck';
import { FiTrash2 } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Option, Select } from '../../../Form/Select';
import { pagamentos_api } from '../../../../services/pagamentos_api';
import {
  formatToPrice,
  handleFormatDocument,
} from '../../../../helpers/formatsHelper';
import { ModalDeletarCartao } from './ModalDeletarCartao';

interface IModal {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  valor: number;
  idPessoaConsumidor: number;
  idPessoaFornecedor: number;
  parcelas: number;
  descricao: string;
  idProjeto: number;
  valorComTaxa: number;
}

interface IPaymentMethod {
  id: string;
  nome: string;
  numeroCartao: string;
  mesVencimento: string;
  anoVencimento: string;
}

const schema = Yup.object().shape({});

export function CartaoCreditoModalServico({
  show,
  setShow,
  idPessoaConsumidor,
  idPessoaFornecedor,
  valor,
  parcelas,
  descricao,
  idProjeto,
  valorComTaxa,
}: IModal) {
  const [showNovoCartao, setShowNovoCartao] = useState(false);
  const [showModalAprovacao, setShowModalAprovacao] = useState(false);
  const [showModalDeletarCartao, setShowModalDeletarCartao] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethodSelected, setPaymentMethodSelected] = useState('');
  const [error, setError] = useState('');
  const [idCartao, setIdCartao] = useState('');
  const [parcelasSelecionadas, setParcelasSelecionadas] =
    useState('Selecione...');
  const [paymentMethods, setPaymentMethods] = useState<Array<IPaymentMethod>>(
    [] as Array<IPaymentMethod>,
  );
  const { user } = useAuth();

  const {
    control,
    formState: { errors },
  } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  function handlePaySubscription() {
    if (!paymentMethodSelected.length) {
      setError('Você deve selecionar um cartão.');
      return;
    }
    if (parcelasSelecionadas === 'Selecione...') {
      setError('Você deve selecionar as parcelas.');
      return;
    }
    setError('');
    setShowModalAprovacao(true);
  }

  function handleCreateParcels(): Option[] {
    const parcels = [] as Option[];
    for (let i = 1; i <= 1; i += 1) {
      parcels.push({
        label: `${i} X de ${formatToPrice(valorComTaxa / i)}`,
        value: i.toString(),
      });
    }
    return parcels;
  }

  const findPaymentMethods = useCallback(async () => {
    try {
      setError('');
      setLoading(true);
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
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  }, [user.codigo_cadastro]);

  useEffect(() => {
    if (show) {
      findPaymentMethods();
    }
  }, [findPaymentMethods, show, showNovoCartao]);

  return (
    <Content>
      <NovoCartaoModal show={showNovoCartao} setShow={setShowNovoCartao} />
      <ModalAprovacaoPagamento
        show={showModalAprovacao}
        setShow={setShowModalAprovacao}
        valor={valor}
        idPessoaConsumidor={idPessoaConsumidor}
        idPessoaFornecedor={idPessoaFornecedor}
        parcelas={
          parcelasSelecionadas === 'Selecione...'
            ? 1
            : Number(parcelasSelecionadas)
        }
        idMeioPagamento={paymentMethodSelected}
        descricao={descricao}
        idProjeto={idProjeto}
      />
      <ModalDeletarCartao
        show={showModalDeletarCartao}
        setShow={setShowModalDeletarCartao}
        id_meio_pagamento_iugu={idCartao}
        atualizarListaCartoes={findPaymentMethods}
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
                  {loading ? <LoadingText>Carregando...</LoadingText> : <></>}
                  {paymentMethods.map(paymentMethod => {
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
                            {paymentMethod.nome} - {paymentMethod.numeroCartao}{' '}
                            - {paymentMethod.mesVencimento}/
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
                  })}
                </RegistrosCartao>
              </BoxRegistrosCartao>
            </Col>
          </Row>
          <Spacer size={30} />
          <Row className="align-items-center">
            <Col lg={12}>
              <Select
                label="Parcelas"
                name="parcelas"
                value={'teste'}
                options={handleCreateParcels()}
                event={e => setParcelasSelecionadas(e.target.value)}
                control={control}
              />
              <Spacer size={20} />
              <ContainerButton>
                <Button
                  label={`PAGAR ${formatToPrice(valorComTaxa)}`}
                  onClick={() => handlePaySubscription()}
                />
              </ContainerButton>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </Content>
  );
}
