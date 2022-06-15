import React, { useCallback, useEffect, useState } from 'react';
import { Control } from 'react-hook-form';
import { InputCheck } from '../../../../../components/Form/InputCheck';
import { InputText } from '../../../../../components/Form/InputText';
import { useBuscaFornecedorOferta } from '../../../../../hooks/buscaConsumidor';
import { useCaptarProjetoFornecedor } from '../../../../../hooks/captarProjetoFornecedor';
import { geral_api } from '../../../../../services/geral_api';
import {
  Container,
  Grupo,
  GrupoResultado,
  SubAreaContainer,
  SubAreaItem,
} from './style';

export type Subarea = {
  id: number;
  descricao: string;
  selected: boolean;
};

type FiltroSubareaProps = {
  control: Control;
  onChange?: (subareas: Subarea[]) => void;
  label?: string;
  setter?: React.Dispatch<React.SetStateAction<Subarea[]>>;
  initialValue?: Subarea[];
  page?: string;
};

const FiltroHabilidades = ({
  control,
  onChange,
  label = 'Selecione uma ou mais habilidades',
  setter,
  initialValue,
  page,
}: FiltroSubareaProps): JSX.Element => {
  const { handleSubmit, obterProjetos, mudar, setValue } =
    useCaptarProjetoFornecedor();
  const { isMudar } = useBuscaFornecedorOferta();

  const [selectedHabilidades, setSelectedHabilidades] = useState<any[]>([]);
  const [textoHabilidade, setTextoHabilidade] = useState('');
  const [habilidadesTecnicas, setHabilidadesTecnicas] = useState<Array<any>>(
    [] as Array<any>,
  );
  const [habilidadesFiltradas, setHabilidadesFiltradas] = useState<Array<any>>(
    [] as Array<any>,
  );

  useEffect(() => {
    if (page === 'captar') setValue('busca_habilidades', '');
    setHabilidadesTecnicas(oldAreas => {
      return oldAreas.map(a => ({
        id: a.id,
        habilidades: a.habilidades,
        selected: false,
      }));
    });
    setTextoHabilidade('');
    setHabilidadesFiltradas([]);
    setSelectedHabilidades([]);
  }, [mudar, isMudar, page, setValue]);

  const onSubmit = useCallback(() => {
    if (page === 'captar') obterProjetos();
  }, [obterProjetos, page]);

  const handleChangeSubareas = useCallback(event => {
    const selectedId = Number(event.target.id);
    setHabilidadesTecnicas(oldAreas => {
      return oldAreas.map(a => ({
        id: a.id,
        habilidades: a.habilidades,
        selected: selectedId === a.id ? !a.selected : a.selected,
      }));
    });
  }, []);

  useEffect(() => {
    if (textoHabilidade) {
      setHabilidadesFiltradas(
        habilidadesTecnicas.filter(
          sa =>
            sa.habilidades
              .toLocaleLowerCase()
              .indexOf(textoHabilidade.toLocaleLowerCase()) !== -1,
        ),
      );
    } else {
      setHabilidadesFiltradas([]);
    }

    const selHabilidades: Subarea[] = [];

    habilidadesTecnicas.forEach(a => {
      if (a.selected) selHabilidades.push(a);
    });

    if (page === 'captar') {
      handleSubmit(onSubmit);
    }

    setSelectedHabilidades(selHabilidades);
  }, [habilidadesTecnicas, handleSubmit, onSubmit, page, textoHabilidade]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedHabilidades);
    }
    if (setter !== undefined) {
      setter(selectedHabilidades);
    }
  }, [onChange, selectedHabilidades, setter]);

  useEffect(() => {
    if (initialValue) {
      setSelectedHabilidades(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    geral_api.get('habilidades-tecnicas').then(response => {
      setHabilidadesTecnicas(response.data);
    });
  }, []);

  return (
    <Container>
      <ul>
        <li>
          <Grupo>
            <div
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setTextoHabilidade(event.target.value.toLocaleLowerCase())
              }
            >
              <InputText
                autoComplete="off"
                value={textoHabilidade}
                control={control}
                label={label}
                placeholder="Faça uma busca"
                name="busca_habilidades"
              />
            </div>
          </Grupo>
        </li>

        {habilidadesFiltradas.length > 0 && (
          <li>
            <label className="resultados">Resultados</label>
            <GrupoResultado>
              <SubAreaContainer>
                {habilidadesFiltradas.map(selectedSubarea => (
                  <SubAreaItem
                    className="subarea__item"
                    key={selectedSubarea.id}
                  >
                    <InputCheck
                      control={control}
                      name={selectedSubarea.id.toString()}
                      type="checkbox"
                      checked={selectedSubarea.selected}
                      onChange={handleChangeSubareas}
                      label={selectedSubarea.habilidades}
                      onClick={() => {
                        if (page === 'captar') {
                          handleSubmit(onSubmit);
                        }
                      }}
                    />
                  </SubAreaItem>
                ))}
              </SubAreaContainer>
            </GrupoResultado>
          </li>
        )}

        <li>
          {selectedHabilidades.length > 0 && (
            <>
              <label className="resultados">Selecionados</label>
              <GrupoResultado>
                <SubAreaContainer>
                  {selectedHabilidades?.map(selectedSubarea => (
                    <SubAreaItem
                      className="subarea__item"
                      key={selectedSubarea.id}
                    >
                      <InputCheck
                        control={control}
                        name={selectedSubarea.id.toString()}
                        type="checkbox"
                        checked={selectedSubarea.selected}
                        onChange={handleChangeSubareas}
                        label={selectedSubarea.habilidades}
                        onClick={() => {
                          if (page === 'captar') {
                            handleSubmit(onSubmit);
                          }
                        }}
                      />
                    </SubAreaItem>
                  ))}
                </SubAreaContainer>
              </GrupoResultado>
            </>
          )}
        </li>
      </ul>
    </Container>
  );
};

export { FiltroHabilidades };
