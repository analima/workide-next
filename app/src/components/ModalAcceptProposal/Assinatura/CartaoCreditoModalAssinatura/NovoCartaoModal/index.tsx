import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
import { Col, Modal, Row, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FiXCircle } from 'react-icons/fi';

import * as Yup from 'yup';
import { CartaoFlip } from '../../../../CartaoFlip';
import { Button } from '../../../../Form/Button';
import { InputMask } from '../../../../Form/InputMask';
import { InputNumber } from '../../../../Form/InputNumber';
import { InputText } from '../../../../Form/InputText';
import { Titulo } from '../../../../Titulo';
import { AZUL } from '../../../../../styles/variaveis';
import { ContainerAcoes, Content } from './style';
import { pagamentos_api } from '../../../../../services/pagamentos_api';
import { handleFormatDocument } from '../../../../../helpers/formatsHelper';
import { useAuth } from '../../../../../contexts/auth';
interface IModal {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IDadosCartao {
  numero: string;
  nome: string;
  vencimento: string;
  cvv: string;
}

declare global {
  interface Window {
    Iugu: {
      setAccountID: (arg: string) => void;
      setTestMode: (arg: boolean) => void;
      createPaymentToken: (arg1: any, arg2: (response: any) => void) => void;
      CreditCard: (
        arg1: string,
        arg2: string,
        arg3: string,
        arg4: string,
        arg5: string,
        arg6: string,
      ) => any;
    };
  }
}

export function NovoCartaoModal({ show, setShow }: IModal) {
  const schema = Yup.object().shape({
    nome_cartao: Yup.string().required('Nome é obrigatório'),
    numero_cartao: Yup.string().required('Número do cartão é obrigatório'),
    cvv: Yup.string().required('Código de segurança é obrigatório'),
    vencimento: Yup.string().required('Vencimento é obrigatório'),
  });
  const [formError, setFormError] = useState('');
  const [rotacionarCartao, setRotacionarCartao] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const {
    control,
    getValues,
    setValue,
    // reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  useForm({
    resolver: yupResolver(schema),
  });

  const [dadosCartao, setDadosCartao] = useState<IDadosCartao>(
    {} as IDadosCartao,
  );

  useEffect(() => {
    watch((value, { name, type }) =>
      setDadosCartao({
        nome: value.nome_cartao,
        numero: value.numero_cartao,
        cvv: value.cvv,
        vencimento: value.vencimento?.replace('/', '').replaceAll('_', ''),
      } as IDadosCartao),
    );
  }, [watch]);

  useEffect(() => {
    setValue('numero_cartao', '');
    setValue('vencimento', '');
    setValue('vencimento', '');
    setValue('nome_cartao', '');
    setValue('nome_cartao', '');
    setValue('cvv', '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFormError('');
    setSuccess(false);
  }, [show]);

  const handleCreatPaymentMethod = useCallback(
    async (token: string) => {
      try {
        await pagamentos_api.post('/meios-pagamento', {
          cpf_cnpj: handleFormatDocument(user.codigo_cadastro || ''),
          descricao: 'Pagamento com cartão',
          token: token,
          finalidade: 'assinatura',
        });
        setSuccess(true);
        setValue('numero_cartao', '');
        setValue('vencimento', '');
        setValue('vencimento', '');
        setValue('nome_cartao', '');
        setValue('nome_cartao', '');
        setValue('cvv', '');
        setTimeout(() => {
          setSuccess(false);
          setShow(false);
        }, 2000);
      } catch (error: any) {
        console.log(error.response);
        setFormError('Erro ao cadastrar o cartão');
      } finally {
        setLoading(false);
      }
    },
    [setShow, setValue, user.codigo_cadastro],
  );

  const handleSaveCard = useCallback(async () => {
    setLoading(true);
    setFormError('');
    setSuccess(false);
    const { Iugu } = window;
    const card = Iugu.CreditCard(
      getValues('numero_cartao'),
      getValues('vencimento').slice(0, 2),
      getValues('vencimento').slice(3),
      getValues('nome_cartao').split(' ')[0],
      getValues('nome_cartao').split(' ')[1],
      getValues('cvv'),
    );

    Iugu.setAccountID(process.env.REACT_APP_ID_IUGU || '');
    Iugu.setTestMode(true);
    Iugu.createPaymentToken(card, function (response) {
      if (response.errors) {
        if (
          response.errors.record_invalid ===
            'Validation failed: Number is invalid' ||
          response.errors?.number
        )
          setFormError('O número do cartão é inválido.');
        else if (response.errors?.verification_value) {
          setFormError('O código de segurança é inválido.');
        } else if (response.errors?.expiration) {
          setFormError('A data de vencimento é inválida.');
        } else if (response.errors?.last_name) {
          setFormError('Você deve preencher o nome e sobrenome.');
        }
      } else {
        handleCreatPaymentMethod(response.id);
      }
      setLoading(false);
    });
  }, [getValues, handleCreatPaymentMethod]);

  return (
    <Content>
      <Modal
        style={{ backgroundColor: 'rgba(128, 128, 128, 0.4)' }}
        show={show}
        onHide={() => setShow(false)}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // dialogClassName={'cartao-modal'}
      >
        <Modal.Body>
          <Row className="mb-4">
            <Col lg={12}>
              <Titulo
                titulo="Pagamento com cartão de crédito"
                tamanho={24}
                cor={AZUL}
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col lg={6} className="mb-4">
              {formError && (
                <Row>
                  <Col lg={12}>
                    <Alert
                      variant="danger"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      {formError}
                      <FiXCircle
                        className="fechar"
                        onClick={() => setFormError('')}
                        size={20}
                        color="#c53030"
                      />
                    </Alert>
                  </Col>
                </Row>
              )}
              {success && (
                <Row>
                  <Col lg={12}>
                    <Alert
                      variant="success"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      Cartão cadastrado com sucesso.
                      <FiXCircle
                        className="fechar"
                        onClick={() => setShow(false)}
                        size={20}
                        color="#3fbb3b"
                      />
                    </Alert>
                  </Col>
                </Row>
              )}
              <Row>
                <Col
                  lg={12}
                  className="mb-4"
                  onFocus={() => setRotacionarCartao(false)}
                >
                  <InputNumber
                    control={control}
                    label="Número"
                    name="numero_cartao"
                    placeholder="Obrigatório"
                    error={errors.numero_cartao && errors.numero_cartao.message}
                    maxLength={16}
                  />
                </Col>
              </Row>
              <Row>
                <Col
                  lg={12}
                  className="mb-4"
                  onFocus={() => setRotacionarCartao(false)}
                >
                  <InputText
                    control={control}
                    label="Nome e sobrenome"
                    name="nome_cartao"
                    isString={true}
                    placeholder="Obrigatório"
                    maxLength={35}
                    error={errors.nome_cartao && errors.nome_cartao.message}
                  />
                </Col>
              </Row>
              <Row>
                <Col
                  lg={6}
                  className="mb-4"
                  onFocus={() => setRotacionarCartao(false)}
                >
                  <InputMask
                    control={control}
                    label="Vencimento"
                    name="vencimento"
                    mask="99/99"
                    placeholder="Obrigatório"
                    error={errors.vencimento && errors.vencimento.message}
                  />
                </Col>
                <Col
                  lg={6}
                  className="mb-4"
                  onFocus={() => setRotacionarCartao(true)}
                >
                  <InputNumber
                    control={control}
                    label="Código de segurança"
                    name="cvv"
                    placeholder="Obrigatório"
                    maxLength={4}
                    error={errors.cvv && errors.cvv.message}
                  />
                </Col>
              </Row>
            </Col>

            <Col lg={6} className="mb-4 d-flex align-items-center">
              <CartaoFlip rotacionar={rotacionarCartao} dados={dadosCartao} />
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <ContainerAcoes>
                <Button
                  label="CANCELAR"
                  onClick={() => {
                    setShow(false);
                  }}
                  color="ghost"
                />
                <Button
                  label={loading ? 'CARREGANDO...' : 'SALVAR'}
                  onClick={() => handleSaveCard()}
                />
              </ContainerAcoes>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </Content>
  );
}
