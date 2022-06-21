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

interface IProfissoesProps {
  id_pessoa: number;
  readonly?: boolean;
}

interface IProfissaoProps {
  id: number;
  descricao: string;
}

interface IFormProps {
  descricao: string;
}

const schema = Yup.object().shape({
  descricao: Yup.string()
    .required('Nome da profissão é obrigatório')
    .matches(
      /^$|^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/,
      'Somente letras são permitidas.',
    ),
});

export function Profissoes({ id_pessoa, readonly }: IProfissoesProps) {
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

  const [profissoes, setProfissoes] = useState<IProfissaoProps[]>([]);
  const [formErrorProfissoes, setFormErrorProfissoes] = useState('');

  const loadProfissoes = useCallback(async () => {
    if (!id_pessoa) return;
    const response = await pessoas_api.get(`/pessoas/${id_pessoa}/profissoes`);

    setProfissoes(response.data);
  }, [id_pessoa]);

  useEffect(() => {
    loadProfissoes();
  }, [loadProfissoes]);

  const handleAdd = useCallback(
    async (form: IFormProps) => {
      if (!id_pessoa) return;
      setFormErrorProfissoes('');
      try {
        await pessoas_api.post(`/pessoas/${id_pessoa}/profissoes`, form);

        reset({ descricao: '' });

        loadProfissoes();
      } catch (error: any) {
        const message = error?.response?.data?.message;

        if (message) {
          setFormErrorProfissoes(message);
        }
      }
    },
    [id_pessoa, reset, loadProfissoes],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (readonly || !id_pessoa) return;
      await pessoas_api.delete(`/pessoas/${id_pessoa}/profissoes/${id}`);

      loadProfissoes();
    },
    [id_pessoa, loadProfissoes, readonly],
  );
  return (
    <Content>
      <Label>
        Profissões <span className="required"> *</span>
      </Label>
      <Form>
        <InputText
          isString
          control={control}
          name="descricao"
          placeholder="Nome da profissão"
          required
          error={errors.descricao && errors.descricao.message}
          readOnly={readonly || false}
          maxLength={30}
          onKeyUp={(e: any) => {
            if (e.keyCode === 13) {
              handleAdd(control._formValues as any);
            }
          }}
        />

        <Button onClick={handleSubmit(handleAdd as any)}>
          <FaPlus />
        </Button>
      </Form>
      <Values>
        {profissoes &&
          profissoes.map(profissao => (
            <Item key={profissao.id}>
              <ItemLabel>{profissao.descricao}</ItemLabel>
              <ItemAction onClick={() => handleDelete(profissao.id)}>
                <FaTimesCircle />
              </ItemAction>
            </Item>
          ))}
      </Values>
      {formErrorProfissoes && (
        <div className="error-message">{formErrorProfissoes}</div>
      )}
    </Content>
  );
}
