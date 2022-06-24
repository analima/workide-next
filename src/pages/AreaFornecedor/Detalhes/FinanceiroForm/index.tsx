import { Col, Container, Form, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image'
import { useAuth } from '../../../../contexts/auth';
import { useForm } from 'react-hook-form';
import { useCadastroComplementar } from '../../../../hooks/detalheFornecedor';
import { Spacer } from '../../../../components/Spacer';
import { TituloForm } from '../../../../components/TituloForm';
import Content from './style';
import CheckBranco from '../../../../assets/check-branco.svg';
import CirculoCinza from '../../../../assets/circulo-cinza.svg';
import { useCallback } from 'react';
import {
  ErrorMessages,
  getValidationErrors,
} from '../../../../utils/ValidationError';
import { Option, Select } from '../../../../components/Select';
import { pessoas_api } from '../../../../services/pessoas_api';
import { geral_api } from '../../../../services/geral_api';
import { FormError } from '../../../../utils/FormError';
import { PlanoPro } from '../../../../components/PlanoPro';
import { PlanoPremium } from '../../../../components/PlanoPremium';
import { InputMask } from '../../../../components/Form/InputMask';
import { InputNumber } from '../../../../components/Form/InputNumber';
import { InputText } from '../../../../components/Form/InputText';
import { PlanoBasico } from '../../../../components/PlanoBasico';

interface IBanco {
  codigo: string;
  nome: string;
}

export default function FinanceiroForm() {
  const { user } = useAuth();
  const { pessoa, setPessoa, updatePessoa, setAbaSelecionada } =
    useCadastroComplementar();

  const [errors, setErrors] = useState<ErrorMessages>({} as ErrorMessages);
  const [banco, setBanco] = useState('');
  const [agencia, setAgencia] = useState('');
  const [contaCorrente, setContaCorrente] = useState('');
  const [tipoChave, setTipoChave] = useState('');
  const [pix, setPix] = useState('');
  const [bancos, setBancos] = useState<Option[]>([]);
  const [pixCpf, setPixCpf] = useState(false);
  const schema = Yup.object().shape({});
  const { control } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    pessoas_api.get(`/pessoas?id_usuario=${user.id_usuario}`).then(response => {
      const data = response.data.dados_recebimento;

      if (data) {
        setBanco(data.banco);
        setAgencia(data.agencia);
        setContaCorrente(data.conta_corrente);
        setTipoChave(data.tipo_chave);
        setPix(data.pix);
      }
    });
  }, [user, pessoa, setPessoa]);

  useEffect(() => {
    geral_api.get(`/bancos`).then(response => {
      const options = response.data.map((p: IBanco) => {
        return {
          value: p.codigo,
          label: p.codigo + ' - ' + p.nome,
        };
      });

      setBancos(options);
    });
  }, []);

  const handleSubmit = useCallback(
    async (event: any) => {
      event.preventDefault();
      setErrors({});

      try {
        const schema = Yup.object().shape({
          banco: Yup.string().required('Banco é obrigatório'),
          agencia: Yup.string().required('Agência é obrigatória'),
          conta_corrente: Yup.string().required('Conta Corrente é obrigatória'),
          tipo_chave: Yup.string().required('Tipo de chave é obrigatória'),
          pix: Yup.string().required('PIX é obrigatório'),
        });

        const dadosRecebimentoState = Object.assign(
          {},
          {
            ...pessoa,
            banco,
            agencia,
            conta_corrente: contaCorrente,
            tipo_chave: tipoChave,
            pix,
          },
        );

        await schema.validate(dadosRecebimentoState, { abortEarly: false });
        const pessoaState = {
          ...pessoa,
          dados_recebimento: dadosRecebimentoState,
        };

        setPessoa(pessoaState);
        await updatePessoa(pessoaState);

        setAbaSelecionada({ indice: 4, porcentagem: 40 });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const validationErrors = getValidationErrors(error);
          setErrors(validationErrors);
        }

        if (error instanceof FormError) {
          setErrors({ ...errors, [error.field]: error.message });
          window.scrollTo(0, 0);
        }

        console.error(error);
      } finally {
        window.scrollTo(0, 0);
      }
    },
    [
      errors,
      pessoa,
      agencia,
      banco,
      contaCorrente,
      tipoChave,
      pix,
      setPessoa,
      updatePessoa,
      setAbaSelecionada,
    ],
  );

  return (
    <Content>
      <Container>
        <Spacer size={80} />
        <TituloForm titulo="Dados bancários para repasse" />
        <Form onSubmit={handleSubmit}>
          <Row className="mt-4">
            <Col lg={3}>
              <Select
                label="Banco"
                name="banco"
                value={banco}
                options={bancos}
                setter={event => setBanco(event.target.value)}
                error={errors.banco}
              />
            </Col>

            <Col lg={3}>
              <InputNumber
                label="Agência"
                name="conta"
                control={control}
                value={agencia}
                error={errors.agencia}
                onChange={e => {
                  let value = e.target.value;
                  value = value.replace(/[^0-9]/g, '');
                  setAgencia(value);
                }}
              />
            </Col>

            <Col lg={3}>
              <InputNumber
                label="Conta"
                name="conta"
                control={control}
                value={contaCorrente}
                onChange={e => {
                  let value = e.target.value;
                  value = value.replace(/[^0-9]/g, '');
                  setContaCorrente(value);
                }}
                error={errors.conta_corrente}
              />
            </Col>
          </Row>

          <Row className="mt-4">
            <Col lg={4}>
              <Select
                label="Tipo de chave"
                name="tipo_chave"
                value={tipoChave}
                options={[
                  {
                    value: 'CPF',
                    label: 'CPF',
                  },
                  {
                    value: 'EMAIL',
                    label: 'E-mail',
                  },
                  {
                    value: 'TELEFONE',
                    label: 'Telefone',
                  },
                  {
                    value: 'CHAVE ALEATÓRIA',
                    label: 'Chave Aleatoria',
                  },
                ]}
                setter={event => {
                  setTipoChave(event.target.value);
                  if (event.target.value === 'CPF') setPixCpf(true);
                  else setPixCpf(false);
                }}
                error={errors.tipo_chave}
              />
            </Col>
            <Col lg={5}>
              {pixCpf && (
                <InputMask
                  mask="999.999.999-99"
                  label="Pix"
                  name="pix"
                  value={pix}
                  error={errors.pix}
                  control={control}
                  onChange={e => {
                    let value = e.target.value;
                    value = value.replace(/[^0-9]/g, '');
                    setPix(value);
                  }}
                />
              )}

              {tipoChave === 'TELEFONE' && (
                <InputNumber
                  label="Pix"
                  name="pix"
                  value={pix}
                  error={errors.pix}
                  control={control}
                  onChange={e => {
                    let value = e.target.value;
                    value = value.replace(/[^0-9]/g, '');
                    setPix(value);
                  }}
                />
              )}
              {tipoChave !== 'CPF' && tipoChave !== 'TELEFONE' && (
                <InputText
                  label="Pix"
                  name="pix"
                  value={pix}
                  error={errors.pix}
                  control={control}
                  onChange={e => {
                    setPix(e.target.value);
                  }}
                />
              )}
            </Col>
          </Row>

          <Spacer size={85} />
          <TituloForm titulo="Pacote de assinatura" />

          <Row className="mt-4">
            <Col lg={4}>
              <div className="box-plano">
                <div className="descricao selected">
                  VOCÊ ESTÁ AQUI
                  <Image src={CheckBranco} alt="check" />
                </div>
                <PlanoBasico />
              </div>
            </Col>
            <Col lg={4}>
              <div className="box-plano">
                <div className="descricao">
                  MIGRE PARA O PRO <Image src={CirculoCinza} alt="Circulo" />
                </div>
                <PlanoPro />
              </div>
            </Col>
            <Col lg={4}>
              <div className="box-plano">
                <div className="descricao">
                  MIGRE PARA O PREMIUM <Image src={CirculoCinza} alt="Circulo" />
                </div>
                <PlanoPremium />
              </div>
            </Col>
          </Row>

          <Spacer size={80} />
          <TituloForm titulo="Adicionar cartão de crédito" />
          <Row>
            <Col lg={5}>
              <Row>
                <Col lg={12}>
                  <Form.Group>
                    <InputMask
                      mask="9999 9999 9999 9999"
                      label="Número"
                      placeholder=""
                      name="nuemroDoCartao"
                      required
                      control={control}
                    />
                  </Form.Group>
                </Col>
                <Col lg={12}>
                  <Form.Group>
                    <InputText
                      label="Nome e sobrenome"
                      name="nomeCartao"
                      required
                      control={control}
                    />
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group>
                    <InputMask
                      mask="99/99"
                      label="Vencimento"
                      placeholder="MM/AA"
                      name="vencimento"
                      required
                      control={control}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <InputNumber
                      label="Código de segurança"
                      name="codigoSeguranca"
                      required
                      control={control}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Col lg={4}>
              <div className="cartao">
                <div className="dados">
                  <p>**** **** **** ****</p>
                  <p>MM AA</p>
                  <p>Nome Sobrenome</p>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col lg={9} className="acoes">
              <a href="#voltar">VOLTAR</a>
              <button type="submit" className="btn btn-primary">
                SALVAR
              </button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Content>
  );
}
