import { yupResolver } from '@hookform/resolvers/yup';
import { Col, Row } from 'react-bootstrap';
import {
  Control,
  DeepMap,
  FieldError,
  FieldValues,
  useForm,
  UseFormGetValues,
  UseFormWatch,
} from 'react-hook-form';
import { Content, InfoMessgae } from './style';

import * as Yup from 'yup';
import { Select } from '../../../../components/Form/Select';
import { InputNumber } from '../../../../components/Form/InputNumber';
import { geral_api } from '../../../../services/geral_api';
import { useEffect, useState, memo, useCallback } from 'react';
import { AntonioDadosBancarios } from '../../../../components/AntonioDadosBancarios';
import { useAuth } from '../../../../contexts/auth';
import { useCadastroComplementar } from '../../../../hooks/cadastroComplementar';

interface IProps {
  control: Control<FieldValues, object>;
  errorsControl: DeepMap<FieldValues, FieldError>;
  watch: UseFormWatch<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
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

function DadosBancarios({ control, errorsControl, watch, getValues }: IProps) {
  const schema = Yup.object().shape({
    agencia: Yup.string().required('Agência é obrigatória'),
    banco: Yup.string().required('Banco é obrigatório'),
    contaCorrente: Yup.string().required('Número da conta é obrigatória'),
    tipoConta: Yup.string().required('Tipo da conta é obrigatória'),
  });
  const { setIsEqual } = useCadastroComplementar();
  const [bancoSelecionado, setBancoSelecionado] = useState<IBancoSelecionado>();
  const [banks, setBanks] = useState<Array<IBancoSelecionado>>(
    [] as Array<IBancoSelecionado>,
  );
  const [isLoading, setIsloading] = useState(false);
  const [showAntonio, setShowAntonio] = useState(false);

  useForm({
    resolver: yupResolver(schema),
  });

  const { user } = useAuth();

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
    handleGetBanks();
  }, []);

  useEffect(() => {
    watch(value => {
      getBankData(getValues('banco'));
    });
  }, [getBankData, getValues, watch]);

  useEffect(() => {
    if (
      bancoSelecionado?.digito_verificador_agencia ||
      bancoSelecionado?.digito_verificador_conta
    )
      handleShowAntonio(true);
  }, [
    bancoSelecionado?.digito_verificador_agencia,
    bancoSelecionado?.digito_verificador_conta,
    control._formValues.banco,
  ]);

  function handleShowAntonio(show: boolean) {
    setShowAntonio(show);
  }

  function handleChangeCad(event: string) {
    const cadastro = user.codigo_cadastro?.replace(/[.\\/-]/g, '');
    const value = event.replace(/[.\\/-]/g, '');

    if (value !== cadastro) {
      setIsEqual(false);
    }

    if (value === cadastro) {
      setIsEqual(true);
    }
  }

  return (
    <Content>
      <AntonioDadosBancarios dica={showAntonio} setDica={handleShowAntonio} />
      <Row>
        <Col lg={4} className="mb-4">
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
            error={errorsControl.banco && errorsControl.banco.message}
          />
        </Col>
        <Col lg={4} className="mb-4">
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
            error={errorsControl.banco && errorsControl.banco.message}
          />
        </Col>

        <Col lg={4} className="mb-4">
          <InputNumber
            control={control}
            label={
              user.tipo === 'PF'
                ? 'CPF do titular da conta'
                : 'CNPJ do titular da conta'
            }
            name="cadastro"
            placeholder="Obrigatório"
            onChange={e => handleChangeCad(e.target.value)}
            error={errorsControl.cadastro && errorsControl.cadastro.message}
          />
        </Col>

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
            error={errorsControl.agencia && errorsControl.agencia.message}
          />
          {bancoSelecionado?.nome === 'Next' && (
            <InfoMessgae>
              Atente-se, o banco Next necessita de dígito na agênicia. Se o app
              do seu banco não informar, por favor entre em contato com o banco.
            </InfoMessgae>
          )}
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
            error={
              errorsControl.contaCorrente && errorsControl.contaCorrente.message
            }
          />
          {bancoSelecionado?.nome === 'Banco do Brasil' && (
            <InfoMessgae>
              Se possuir X na conta, favor substituir por 0
            </InfoMessgae>
          )}
        </Col>
      </Row>
    </Content>
  );
}

export default memo(DadosBancarios);
