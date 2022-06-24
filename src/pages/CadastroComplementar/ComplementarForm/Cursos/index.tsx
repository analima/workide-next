import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaTimesCircle } from 'react-icons/fa';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { pessoas_api } from '../../../../services/pessoas_api';
import { InputText } from '../../../../components/Form/InputText';

import {
  Form,
  Label,
  Button,
  Values,
  Item,
  ItemLabel,
  ItemAction,
} from './style';
import Content from './style';

interface ICursosProps {
  id_pessoa: number;
  readonly?: boolean;
}

interface ICursoProps {
  id: number;
  descricao: string;
  local: string;
  carga_horaria: string;
}

interface IFormProps {
  descricao: string;
  local: string;
  carga_horaria: string;
}

const schema = Yup.object().shape({
  descricao: Yup.string()
    .required('Descrição é obrigatória')
    .matches(
      /^$|^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/,
      'Somente letras são permitidas.',
    ),
});

export default function Cursos({ id_pessoa, readonly }: ICursosProps) {
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

  const [cursos, setCursos] = useState<ICursoProps[]>([]);
  const [formErrorCursos, setFormErrorCursos] = useState('');

  const loadCursos = useCallback(async () => {
    if (!id_pessoa) return;
    const response = await pessoas_api.get(`/pessoas/${id_pessoa}/cursos`);

    setCursos(response.data);
  }, [id_pessoa]);

  useEffect(() => {
    loadCursos();
  }, [loadCursos]);

  const handleAdd = useCallback(
    async (form: IFormProps) => {
      if (!id_pessoa) return;
      setFormErrorCursos('');
      try {
        await pessoas_api.post(`/pessoas/${id_pessoa}/cursos`, form);

        reset({ descricao: '' });

        loadCursos();
      } catch (error: any) {
        const message = error?.response?.data?.message;

        if (message) {
          setFormErrorCursos(message);
        }
      }
    },
    [id_pessoa, reset, loadCursos],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (readonly || !id_pessoa) return;
      await pessoas_api.delete(`/pessoas/${id_pessoa}/cursos/${id}`);

      loadCursos();
    },
    [id_pessoa, loadCursos, readonly],
  );

  return (
    <Content>
      <Label>Cursos</Label>
      <Form>
        <InputText
          isString
          control={control}
          name="descricao"
          placeholder="Descrição"
          required
          error={errors.descricao && errors.descricao.message}
          readOnly={readonly || false}
          maxLength={80}
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
        {cursos &&
          cursos.map(curso => (
            <Item key={curso.id}>
              <ItemLabel>
                {curso.descricao}.{curso.local ? ` Local: ${curso.local}.` : ''}
                {curso.carga_horaria
                  ? ` Carga Horária: ${curso.carga_horaria} horas.`
                  : ''}{' '}
              </ItemLabel>
              <ItemAction onClick={() => handleDelete(curso.id)}>
                <FaTimesCircle />
              </ItemAction>
            </Item>
          ))}
      </Values>
      {formErrorCursos && (
        <div className="error-message">{formErrorCursos}</div>
      )}
    </Content>
  );
}
