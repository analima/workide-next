import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaTimesCircle } from 'react-icons/fa';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { geral_api } from '../../../../services/geral_api';
import { pessoas_api } from '../../../../services/pessoas_api';
import { Select, Option } from '../../../../components/Form/Select';

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

interface IGraduacoesProps {
  id_pessoa: number;
  readonly?: boolean;
}

interface IGraduacaoProps {
  id: number;
  descricao: string;
}

interface IGraduacaoPessoaProps {
  id: number;
  situacao: string;
  graduacao: IGraduacaoProps;
}

interface IFormProps {
  id_graduacao: string;
  situacao: string;
}

const schema = Yup.object().shape({
  id_graduacao: Yup.string().required('Graduação é obrigatória'),
});

export function Graduacoes({ id_pessoa, readonly }: IGraduacoesProps) {
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

  const [graduacoesPessoa, setGraduacoesPessoa] = useState<
    IGraduacaoPessoaProps[]
  >([]);
  const [opcoesGraduacoes, setOpcoesGraduacoes] = useState<Option[]>([]);
  const [formErrorGraduacoes, setFormErrorGraduacoes] = useState('');

  const loadGraduacoes = useCallback(async () => {
    const response = await geral_api.get('/graduacoes');

    if (response.data) {
      const options: Option[] = [];

      response.data.forEach((graduacao: IGraduacaoProps) => {
        options.push({
          value: `${graduacao.id}`,
          label: graduacao.descricao,
        });
      });

      setOpcoesGraduacoes(options);
    }
  }, []);

  const loadGraduacoesPessoa = useCallback(async () => {
    if (!id_pessoa) return;
    const response = await pessoas_api.get(`/pessoas/${id_pessoa}/graduacoes`);

    setGraduacoesPessoa(response.data);
  }, [id_pessoa]);

  useEffect(() => {
    loadGraduacoes();
    loadGraduacoesPessoa();
  }, [loadGraduacoes, loadGraduacoesPessoa]);

  const handleAdd = useCallback(
    async (form: IFormProps) => {
      if (!id_pessoa) return;
      setFormErrorGraduacoes('');
      try {
        await pessoas_api.post(`/pessoas/${id_pessoa}/graduacoes`, form);
      } catch (error: any) {
        const message = error?.response?.data?.message;

        if (message) {
          setFormErrorGraduacoes(message);
        }
      }

      reset({ id_graduacao: '' });

      loadGraduacoesPessoa();
    },
    [id_pessoa, reset, loadGraduacoesPessoa],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (readonly || !id_pessoa) return;
      try {
        await pessoas_api.delete(`/pessoas/${id_pessoa}/graduacoes/${id}`);
      } catch (error: any) {
        console.log(error.response);
      }

      loadGraduacoesPessoa();
    },
    [id_pessoa, loadGraduacoesPessoa, readonly],
  );

  return (
    <Content>
      <Label>Graduações</Label>
      <Form>
        <Select
          control={control}
          name="id_graduacao"
          noValueOption="Graduação"
          options={opcoesGraduacoes}
          error={errors.id_graduacao && errors.id_graduacao.message}
          disabled={readonly || false}
        />
        <Button onClick={handleSubmit(handleAdd as any)}>
          <FaPlus />
        </Button>
      </Form>
      <Values>
        {graduacoesPessoa &&
          graduacoesPessoa.map(graduacaoPessoa => (
            <Item key={graduacaoPessoa.id}>
              <ItemLabel>{graduacaoPessoa.graduacao.descricao}</ItemLabel>
              <ItemAction onClick={() => handleDelete(graduacaoPessoa.id)}>
                <FaTimesCircle />
              </ItemAction>
            </Item>
          ))}
      </Values>
      {formErrorGraduacoes && (
        <div className="error-message">{formErrorGraduacoes}</div>
      )}
    </Content>
  );
}
