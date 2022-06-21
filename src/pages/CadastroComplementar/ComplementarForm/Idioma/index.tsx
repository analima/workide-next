import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaTimesCircle } from 'react-icons/fa';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
  ContainerSelect,
  ContainerAutoComplete,
} from './style';
import { Select } from '../../../../components/Form/Select';
import { niveis } from './niveis';
import { AutocompleteList } from '../../../../components/Form/InputTag/style';
import { geral_api } from '../../../../services/geral_api';
import { pessoas_api } from '../../../../services/pessoas_api';

interface IIdiomaProps {
  id_pessoa: number;
  readonly?: boolean;
}

interface IAllIdioma {
  descricao: string;
  id: number;
}

interface IIdiomasProps {
  idioma: IAllIdioma;
  nivel: string;
}

interface IFormProps {
  descricao: string;
  nivel: string;
}

const schema = Yup.object().shape({
  descricao: Yup.string().required('Nome do idioma é obrigatório'),
  nivel: Yup.string(),
});

const niveisOptions = [
  {
    value: 'Básico',
    label: 'Básico',
  },
  {
    value: 'Intermediário',
    label: 'Intermediário',
  },
  {
    value: 'Avançado',
    label: 'Avançado',
  },
  {
    value: 'Fluente',
    label: 'Fluente',
  },
  {
    value: 'Nativo',
    label: 'Nativo',
  },
];

export function Idioma({ id_pessoa, readonly }: IIdiomaProps) {
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

  const [idioma, setIdioma] = useState<IIdiomasProps[]>([]);
  const [todosIdiomas, setTodosIdiomas] = useState<IAllIdioma[]>([]);
  const [showAutocompleteList, setShowAutocompleteList] = useState(false);
  const [formErrorIdioma, setFormErrorIdioma] = useState('');

  const loadIdioma = useCallback(async () => {
    if (!id_pessoa) return;
    const { data: allLanguages } = await geral_api.get(`/idiomas/`);
    const { data: userLanguages } = await pessoas_api.get(
      `/pessoas/${id_pessoa}/idiomas`,
    );

    setTodosIdiomas(allLanguages);
    setIdioma(userLanguages);
  }, [id_pessoa]);

  useEffect(() => {
    loadIdioma();
  }, [loadIdioma]);

  const handleAdd = useCallback(
    async (form: IFormProps) => {
      if (!id_pessoa) return;

      try {
        const idiomaExistente = idioma.find(
          item => item.idioma.descricao === form.descricao,
        );
        if (idiomaExistente) {
          setFormErrorIdioma('Idioma já cadastrado!');
          return;
        }
        const idiomaSelecionado = todosIdiomas.find(
          idioma =>
            idioma.descricao.toLowerCase().trim() ===
            form.descricao.toLowerCase().trim(),
        );

        if (!idiomaSelecionado) {
          setFormErrorIdioma('Idioma não suportado');
          return;
        }

        await pessoas_api.post(`/pessoas/${id_pessoa}/idiomas`, {
          id_idioma: idiomaSelecionado?.id,
          nivel: form.nivel,
        });

        reset({ descricao: '' });
        reset({ nivel: '' });

        setFormErrorIdioma('');

        loadIdioma();
      } catch (error: any) {
        const message = error?.response?.data?.message;

        if (message) {
          setFormErrorIdioma(message);
        }
      }
    },
    [id_pessoa, todosIdiomas, idioma, reset, loadIdioma],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (readonly || !id_pessoa) return;
      await pessoas_api.delete(`/pessoas/${id_pessoa}/idiomas/${id}`);

      loadIdioma();
    },
    [id_pessoa, loadIdioma, readonly],
  );

  return (
    <Content>
      <Form>
        <div>
          <Label>Idiomas</Label>

          <InputText
            isString
            control={control}
            name="descricao"
            placeholder="Digite o seu idioma aqui"
            error={errors.descricao && errors.descricao.message}
            readOnly={readonly || false}
            maxLength={30}
            onKeyUp={(e: any) => {
              if (e.keyCode === 13) {
                handleAdd(control._formValues as any);
              }
            }}
            onFocus={() => setShowAutocompleteList(true)}
            onBlur={() =>
              setTimeout(() => {
                setShowAutocompleteList(false);
              }, 200)
            }
          />

          <ContainerAutoComplete>
            {showAutocompleteList && (
              <AutocompleteList>
                {todosIdiomas
                  .filter(idioma => {
                    return idioma.descricao
                      .toLowerCase()
                      .includes(
                        (control._formValues.descricao || '').toLowerCase(),
                      );
                  })
                  .map(obj => (
                    <li
                      onClick={() => {
                        reset({ descricao: obj.descricao });
                      }}
                      key={obj.id}
                    >
                      {obj.descricao}
                    </li>
                  ))}
              </AutocompleteList>
            )}
          </ContainerAutoComplete>
        </div>

        <ContainerSelect>
          <Label>Nível</Label>
          <Select
            control={control}
            name="nivel"
            noValueOption=""
            options={niveisOptions}
            error={errors.nivel && errors.nivel.message}
            disabled={readonly || false}
          />
        </ContainerSelect>

        <Button onClick={handleSubmit(handleAdd as any)}>
          <FaPlus />
        </Button>
      </Form>
      <Values>
        {idioma.map(idiomaInMap => (
          <Item key={idiomaInMap.idioma.id}>
            <ItemLabel>
              {idiomaInMap.idioma.descricao} - {niveis[idiomaInMap.nivel]}
            </ItemLabel>
            <ItemAction onClick={() => handleDelete(idiomaInMap.idioma.id)}>
              <FaTimesCircle />
            </ItemAction>
          </Item>
        ))}
      </Values>
      {formErrorIdioma && (
        <div className="error-message">{formErrorIdioma}</div>
      )}
    </Content>
  );
}
