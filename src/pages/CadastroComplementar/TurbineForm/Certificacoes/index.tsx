import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaTimesCircle } from 'react-icons/fa';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { pessoas_api } from '../../../../services/pessoas_api';
import { InputText } from '../../../../components/Form/InputText';

import {
  Content,
  Form,
  Label,
  Button,
  Values,
  Item,
  ItemLabel,
  ItemAction,
} from './style';

interface ICertificacoesProps {
  id_pessoa: number;
  readonly?: boolean;
}

interface ICertificacaoProps {
  id: number;
  orgao_certificador: string;
  descricao: string;
}

interface IFormProps {
  orgao_certificador: string;
  descricao: string;
}

const schema = Yup.object().shape({
  orgao_certificador: Yup.string().required('Órgão certificador é obrigatório'),
  descricao: Yup.string().required('Descrição da certificação é obrigatória'),
});

export function Certificacoes({ id_pessoa, readonly }: ICertificacoesProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  const [certificacoes, setCertificacoes] = useState<ICertificacaoProps[]>([]);
  const [error, setError] = useState<string>('');

  const loadCertificacoes = useCallback(async () => {
    if (!id_pessoa) return;
    const response = await pessoas_api.get(
      `/pessoas/${id_pessoa}/certificacoes`,
    );

    setCertificacoes(response.data);
  }, [id_pessoa]);

  useEffect(() => {
    loadCertificacoes();
  }, [loadCertificacoes]);

  const handleAdd = useCallback(
    async (form: IFormProps) => {
      if (!id_pessoa) return;
      if (
        certificacoes.find(
          i =>
            i.orgao_certificador === form.orgao_certificador &&
            i.descricao === form.descricao,
        ) !== undefined
      ) {
        setError('Certificação já adicionada.');
        return;
      }
      setError('');
      await pessoas_api.post(`/pessoas/${id_pessoa}/certificacoes`, form);

      reset({ orgao_certificador: '', descricao: '' });

      loadCertificacoes();
    },
    [id_pessoa, certificacoes, reset, loadCertificacoes],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (readonly || !id_pessoa) return;
      await pessoas_api.delete(`/pessoas/${id_pessoa}/certificacoes/${id}`);

      loadCertificacoes();
    },
    [id_pessoa, loadCertificacoes, readonly],
  );

  return (
    <Content>
      <Label>Certificações</Label>
      <Form>
        <InputText
          control={control}
          name="orgao_certificador"
          placeholder="Órgão certificador"
          required
          error={errors.orgao_certificador && errors.orgao_certificador.message}
          readOnly={readonly || false}
          onKeyUp={e => {
            if (e.keyCode === 13) {
              handleAdd(control._formValues as any);
            }
          }}
        />
        <InputText
          control={control}
          name="descricao"
          placeholder="Descrição"
          required
          error={errors.descricao && errors.descricao.message}
          readOnly={readonly || false}
          onKeyUp={e => {
            if (e.keyCode === 13) {
              handleAdd(control._formValues as any);
            }
          }}
        />

        <Button onClick={handleSubmit(handleAdd)}>
          <FaPlus />
        </Button>
      </Form>
      {error !== '' && <span className="block-error">{error}</span>}
      <Values>
        {certificacoes &&
          certificacoes.map(certificacao => (
            <Item key={certificacao.id}>
              <ItemLabel>
                {certificacao.descricao} ({certificacao.orgao_certificador})
              </ItemLabel>
              <ItemAction onClick={() => handleDelete(certificacao.id)}>
                <FaTimesCircle />
              </ItemAction>
            </Item>
          ))}
      </Values>
    </Content>
  );
}
