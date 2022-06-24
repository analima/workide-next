import { useCallback, useEffect, useState } from 'react';
import { Alert, Col, Modal, Row } from 'react-bootstrap';
import { InputNumber } from '../../../../../components/Form/InputNumber';
import { Select } from '../../../../../components/Form/Select';
import { geral_api } from '../../../../../services/geral_api';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiXCircle } from 'react-icons/fi';

import { ContainerButton } from './style';
import Content from './style';
import { Button } from '../../../../../components/Form/Button';
import { Spacer } from '../../../../../components/Spacer';
import { pessoas_api } from '../../../../../services/pessoas_api';
import { pagamentos_api } from '../../../../../services/pagamentos_api';
import { useAuth } from '../../../../../contexts/auth';
interface IModal {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IBancoSelecionado {
  id_banco: number;
  digito_verificador_agencia: number;
  digito_verificador_conta: number;
  digitos_agencia: number;
  digitos_conta: number;
  nome: string;
  ds_exibicao: string;
}

interface IFormProps {
  agencia: string;
  banco: string;
  contaCorrente: string;
  tipoConta: string;
}

export default function ModalCreateSubaccount ({ show, setShow }: IModal): JSX.Element {
  const [bancoSelecionado, setBancoSelecionado] = useState<IBancoSelecionado>();
  const [isLoading, setIsloading] = useState(false);
  const [erroDadosBancarios, setErroDadosBancarios] = useState(false);
  const [sucessoSubconta, setSucessoSubconta] = useState(false);
  const [jaPossuiDados, setJaPossuiDados] = useState(false);
  const [banks, setBanks] = useState<Array<IBancoSelecionado>>(
    [] as Array<IBancoSelecionado>,
  );
  const { user, refreshUserData } = useAuth();

  const schema = Yup.object().shape({
    agencia: Yup.string().required('Agência é obrigatória'),
    banco: Yup.string().required('Banco é obrigatório'),
    contaCorrente: Yup.string().required('Número da conta é obrigatória'),
    tipoConta: Yup.string().required('Tipo da conta é obrigatória'),
  });

  const {
    control,
    getValues,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  const handleGetFinancesInformation = useCallback(async () => {
    try {
      const response = await pessoas_api.get('/pessoas/dados-recebimento');
      setJaPossuiDados(true);
      reset({
        agencia: response.data.agencia,
        banco: response.data.banco,
        contaCorrente: response.data.contaCorrente,
        tipoConta: response.data.tipoConta,
      });
    } catch (error: any) {
      setJaPossuiDados(false);
      console.error(error);
    }
  }, [reset]);

  async function handleGetBanks() {
    try {
      setIsloading(true);
      const response = await geral_api.get('/bancos');
      setBanks(response.data);
    } catch (error: any) {
      console.log(error.response);
    } finally {
      setIsloading(false);
    }
  }

  const getBankData = useCallback(
    (id_banco: string) => {
      const bank = banks.find(
        bankData => bankData.id_banco === Number(id_banco),
      );
      if (bank) {
        setBancoSelecionado({
          id_banco: bank.id_banco,
          digito_verificador_agencia: bank.digito_verificador_agencia,
          digito_verificador_conta: bank.digito_verificador_conta,
          digitos_agencia: bank.digitos_agencia,
          digitos_conta: bank.digitos_conta,
          nome: bank.nome,
          ds_exibicao: bank.ds_exibicao,
        });
      }
    },
    [banks],
  );

  useEffect(() => {
    watch(() => getBankData(getValues('banco')));
  }, [getBankData, getValues, watch]);

  const createSubaccount = useCallback(async () => {
    try {
      await pagamentos_api.post(`/subcontas/${user.id_pessoa}`);
    } catch (error: any) {
      console.error(error.response.data);
    }
  }, [user.id_pessoa]);

  const checkExistSubaccount = useCallback(async () => {
    try {
      await pagamentos_api.get(`/subcontas/${user.id}`);
    } catch (error: any) {
      console.error(error.response.data);
      if (error.response.data.message === 'Subconta não encontrada')
        createSubaccount();
    }
  }, [createSubaccount, user.id]);

  useEffect(() => {
    checkExistSubaccount();
    if (!jaPossuiDados) {
      handleGetBanks();
      handleGetFinancesInformation();
    }
  }, [checkExistSubaccount, handleGetFinancesInformation, jaPossuiDados]);

  const handleSaveInformations = useCallback(
    async (form: IFormProps) => {
      setErroDadosBancarios(false);
      setIsloading(true);
      try {
        const bodySubcontaPf = {
          agencia: form.agencia,
          conta: form.contaCorrente,
          id_banco: Number(form.banco),
          tipo_conta:
            form.tipoConta === 'conta_corrente' ? 'Corrente' : 'Poupança',
          descricao: `subconta do usuário ${user.nome}`,
        };

        const bodySubcontaPj = {
          agencia: form.agencia,
          conta: form.contaCorrente,
          id_banco: Number(form.banco),
          tipo_conta:
            form.tipoConta === 'conta_corrente' ? 'Corrente' : 'Poupança',
          descricao: `subconta do usuário ${user.nome}`,
          nome_empresa: user.nome,
        };

        await pagamentos_api.post(
          `/subcontas/${user.id_pessoa}/solicitar-verificacao`,
          user.tipo === 'PJ' ? bodySubcontaPj : bodySubcontaPf,
        );

        await pessoas_api.post('/pessoas/dados-recebimento', form);
        setSucessoSubconta(true);
        setTimeout(() => {
          setSucessoSubconta(false);
          setErroDadosBancarios(false);
          setShow(false);
        }, 3000);
      } catch (error: any) {
        console.error(error.response.data);
        if (error.messa) setErroDadosBancarios(true);
      } finally {
        refreshUserData();
        setIsloading(false);
        refreshUserData();
      }
    },
    [user.nome, user.id_pessoa, user.tipo, setShow, refreshUserData],
  );

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
          {erroDadosBancarios && (
            <Row>
              <Col lg={12}>
                <Alert
                  variant="danger"
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  Os dados informados são inválidos
                  <FiXCircle
                    className="fechar"
                    onClick={() => setErroDadosBancarios(false)}
                    size={20}
                    color="#c53030"
                  />
                </Alert>
              </Col>
            </Row>
          )}
          {sucessoSubconta && (
            <Row>
              <Col lg={12}>
                <Alert
                  variant="success"
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  Os dados foram salvos com sucesso
                  <FiXCircle
                    className="fechar"
                    onClick={() => setErroDadosBancarios(false)}
                    size={20}
                    color="#53c530"
                  />
                </Alert>
              </Col>
            </Row>
          )}
          <Row>
            <Col lg={12} className="mb-4">
              <h1>Informe seus dados bancários</h1>
            </Col>
          </Row>
          <Row>
            <Col lg={6} className="mb-4">
              <Select
                control={control}
                label="Banco"
                name="banco"
                placeholder="Obrigatório"
                options={
                  isLoading
                    ? [
                        {
                          value: 'Carregando...',
                          label: 'Carregando...',
                        },
                      ]
                    : banks.map(bank => {
                        return {
                          value: bank.id_banco.toString(),
                          label: bank.ds_exibicao,
                        };
                      })
                }
                error={errors.banco && errors.banco.message}
              />
            </Col>
            <Col lg={6} className="mb-4">
              <Select
                control={control}
                label="Tipo de conta"
                name="tipoConta"
                placeholder="Obrigatório"
                options={
                  isLoading
                    ? [
                        {
                          value: 'Carregando...',
                          label: 'Carregando...',
                        },
                      ]
                    : [
                        {
                          value: 'conta_corrente',
                          label: 'Conta corrente',
                        },
                        {
                          value: 'conta_poupanca',
                          label: 'Conta poupança',
                        },
                      ]
                }
                error={errors.banco && errors.banco.message}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={6} className="mb-4">
              <InputNumber
                control={control}
                label={
                  bancoSelecionado?.digito_verificador_agencia === 0
                    ? 'Agência (sem dígito)'
                    : 'Agência (com dígito)'
                }
                name="agencia"
                placeholder="Obrigatório"
                maxLength={
                  (bancoSelecionado?.digitos_agencia || 0) +
                    (bancoSelecionado?.digito_verificador_agencia || 0) || 6
                }
                error={errors.agencia && errors.agencia.message}
              />
            </Col>
            <Col lg={6} className="mb-4">
              <InputNumber
                control={control}
                label={
                  bancoSelecionado?.digito_verificador_conta === 0
                    ? 'Conta (sem dígito)'
                    : 'Conta (com dígito)'
                }
                name="contaCorrente"
                placeholder="Obrigatório"
                maxLength={
                  (bancoSelecionado?.digitos_conta || 0) +
                    (bancoSelecionado?.digito_verificador_conta || 0) || 14
                }
                error={errors.contaCorrente && errors.contaCorrente.message}
              />
            </Col>
          </Row>
          <Spacer size={30} />
          <Row>
            <Col lg={12}>
              <ContainerButton>
                <Button
                  label={isLoading ? 'CARREGANDO...' : 'SALVAR'}
                  color="primary"
                  //onClick={() => handleSubmit(handleSaveInformations)()}
                  onClick={() => {console.log('SALVAR')}}
                />
              </ContainerButton>
            </Col>
          </Row>
        </Content>
      </Modal.Body>
    </Modal>
  );
}
