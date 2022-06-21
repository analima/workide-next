import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaTimesCircle } from 'react-icons/fa';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { pessoas_api } from '../../../../services/pessoas_api';
import { Select, Option } from '../../../../components/Form/Select';
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

interface IGraduacoesProps {
  id_pessoa: number;
  readonly?: boolean;
}

interface IPosGraduacaoProps {
  id: number;
  sentido: string;
  tipo: string;
  curso: string;
  descricao: string;
}

interface IFormProps {
  sentido: string;
  tipo: string;
  descricao: string;
  curso: string;
}

const schema = Yup.object().shape({
  sentido: Yup.string().required('Sentido é obrigatório'),
  tipo: Yup.string().required('Tipo é obrigatório'),
  descricao: Yup.string()
    .required('Nome é obrigatório')
    .matches(
      /^$|^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/,
      'Somente letras são permitidas.',
    ),
});

export function PosGraduacoes({ id_pessoa, readonly }: IGraduacoesProps) {
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

  const [posGraduacoes, setPosGraduacoes] = useState<IPosGraduacaoProps[]>([]);
  const [opcoesTipo, setOpcoesTipo] = useState<Option[]>([]);

  const opcoesSentido = [
    {
      value: 'STRICTO_SENSU',
      label: 'Stricto Sensu',
    },
    {
      value: 'LATO_SENSU',
      label: 'Lato Sensu',
    },
  ];

  const loadPosGraduacoes = useCallback(async () => {
    if (!id_pessoa) return;
    const response = await pessoas_api.get(
      `/pessoas/${id_pessoa}/pos-graduacoes`,
    );
    setPosGraduacoes(response.data);
  }, [id_pessoa]);

  useEffect(() => {
    loadPosGraduacoes();
  }, [loadPosGraduacoes]);

  const handleOpcoesTipo = () => {
    const { sentido } = control._formValues;

    if (sentido === 'STRICTO_SENSU') {
      const tiposDisponiveis: Option[] = [
        {
          value: 'MESTRADO',
          label: 'Mestrado',
        },
        {
          value: 'DOUTORADO',
          label: 'Doutorado',
        },
        {
          value: 'POS_DOC',
          label: 'Pós-doutorado',
        },
      ];

      setOpcoesTipo(tiposDisponiveis);
    } else if (sentido === 'LATO_SENSU') {
      const tiposDisponiveis: Option[] = [
        {
          value: 'MBA',
          label: 'MBA',
        },
        {
          value: 'ESPECIALIZACAO',
          label: 'Especialização',
        },
      ];

      setOpcoesTipo(tiposDisponiveis);
    }
  };

  const handleFormatarTipo = (value: string) => {
    const situacao = opcoesTipo.find(opcao => opcao.value === value);

    return situacao?.label;
  };

  const handleAdd = useCallback(
    async (form: IFormProps) => {
      if (!id_pessoa) return;
      form.descricao = `${form.descricao} / ${form.curso}`;
      try {
        await pessoas_api.post(`/pessoas/${id_pessoa}/pos-graduacoes`, form);
        await loadPosGraduacoes();
        reset({
          curso: '',
          descricao: '',
          sentido: '',
          tipo: '',
        });
      } catch (error: any) {
        console.log(error.response);
      }
    },
    [id_pessoa, reset, loadPosGraduacoes],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (readonly || !id_pessoa) return;
      try {
        await pessoas_api.delete(`/pessoas/${id_pessoa}/pos-graduacoes/${id}`);
      } catch (error: any) {
        console.log(error.response);
      }

      loadPosGraduacoes();
    },
    [id_pessoa, loadPosGraduacoes, readonly],
  );

  return (
    <Content>
      <Label>Pós-graduações</Label>
      <Form>
        <Select
          control={control}
          name="sentido"
          noValueOption="Tipo"
          options={opcoesSentido}
          event={handleOpcoesTipo}
          error={errors.sentido && errors.sentido.message}
          disabled={readonly || false}
        />
        <Select
          control={control}
          name="tipo"
          noValueOption="Programa"
          options={opcoesTipo}
          error={errors.tipo && errors.tipo.message}
          disabled={readonly || false}
        />
        <InputText
          isString
          control={control}
          name="curso"
          placeholder="curso"
          required
          error={errors.curso && errors.curso.message}
          readOnly={readonly || false}
          maxLength={35}
          onKeyUp={(e: any) => {
            if (e.keyCode === 13) {
              handleAdd(control._formValues as any);
            }
          }}
        />
        <InputText
          isString
          control={control}
          name="descricao"
          placeholder="Instituição"
          required
          error={errors.descricao && errors.descricao.message}
          readOnly={readonly || false}
          maxLength={35}
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
        {posGraduacoes &&
          posGraduacoes.map(posGraduacao => (
            <Item key={posGraduacao.id}>
              <ItemLabel>
                {handleFormatarTipo(posGraduacao.tipo)} em{' '}
                {posGraduacao.descricao}.{' '}
              </ItemLabel>
              <ItemAction onClick={() => handleDelete(posGraduacao.id)}>
                <FaTimesCircle />
              </ItemAction>
            </Item>
          ))}
      </Values>
    </Content>
  );
}
