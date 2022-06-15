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

interface IRedesSociaisProps {
  id_pessoa: number;
  readonly?: boolean;
}

interface IRedeSocialProps {
  id: number;
  tipo: string;
  url: string;
}

interface IFormProps {
  tipo: string;
  url: string;
}

const schema = Yup.object().shape({
  url: Yup.string()
    .url('Deve ser uma URL válida')
    .required('URL é obrigatória'),
});

export function RedesSociais({ id_pessoa, readonly }: IRedesSociaisProps) {
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

  const [redesSociais, setRedesSociais] = useState<IRedeSocialProps[]>([]);
  const [error, setError] = useState<string>('');

  const loadRedesSociais = useCallback(async () => {
    if (!id_pessoa) return;
    const response = await pessoas_api.get(
      `/pessoas/${id_pessoa}/redes-sociais`,
    );

    setRedesSociais(response.data);
  }, [id_pessoa]);

  useEffect(() => {
    loadRedesSociais();
  }, [loadRedesSociais]);

  const handleAdd = useCallback(
    async (form: IFormProps) => {
      if (!id_pessoa) return;
      if (redesSociais.find(i => i.url === form.url) !== undefined) {
        setError('Url já adicionada.');
        return;
      }
      setError('');
      try {
        await pessoas_api.post(`/pessoas/${id_pessoa}/redes-sociais`, form);
      } catch (error: any) {
        console.log(error.response);
      }

      reset({ tipo: '', url: '' });

      loadRedesSociais();
    },
    [id_pessoa, redesSociais, reset, loadRedesSociais],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (readonly || !id_pessoa) return;
      try {
        await pessoas_api.delete(`/pessoas/${id_pessoa}/redes-sociais/${id}`);
      } catch (error: any) {
        console.log(error.response);
      }

      loadRedesSociais();
    },
    [id_pessoa, loadRedesSociais, readonly],
  );

  return (
    <Content>
      <Label>Redes sociais</Label>
      <Form>
        <InputText
          control={control}
          name="url"
          placeholder="URL"
          required
          error={errors.url && errors.url.message}
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
        {redesSociais &&
          redesSociais.map(redeSocial => (
            <Item key={redeSocial.id}>
              <ItemLabel>
                <a href={redeSocial.url}>{redeSocial.url}</a>
              </ItemLabel>
              <ItemAction onClick={() => handleDelete(redeSocial.id)}>
                <FaTimesCircle />
              </ItemAction>
            </Item>
          ))}
      </Values>
    </Content>
  );
}
