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

const FiltroCausas = ({
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

  const [selectedCausas, setSelectedCausas] = useState<any[]>([]);
  const [textoCausas, setTextoCausas] = useState('');
  const [causasSociais, setCausasSociais] = useState<Array<any>>(
    [] as Array<any>,
  );
  const [causasFiltradas, setCausasFiltradas] = useState<Array<any>>(
    [] as Array<any>,
  );

  useEffect(() => {
    if (page === 'captar') setValue('busca_causas', '');
    setCausasSociais(oldAreas => {
      return oldAreas.map(a => ({
        id: a.id,
        causasSociais: a.causasSociais,
        selected: false,
      }));
    });
    setTextoCausas('');
    setCausasFiltradas([]);
    setSelectedCausas([]);
  }, [mudar, isMudar, page, setValue]);

  const onSubmit = useCallback(() => {
    if (page === 'captar') {
      obterProjetos();
    }
  }, [obterProjetos, page]);

  const handleChangeSubareas = useCallback((event: any) => {
    const selectedId = Number(event.target.id);
    setCausasSociais(oldAreas => {
      return oldAreas.map(a => ({
        id: a.id,
        causasSociais: a.causasSociais,
        selected: selectedId === a.id ? !a.selected : a.selected,
      }));
    });
  }, []);

  useEffect(() => {
    if (textoCausas) {
      setCausasFiltradas(causasSociais.filter(sa => sa.causasSociais));
    } else {
      setCausasFiltradas([]);
    }

    const selCausas: any[] = [];

    causasSociais.forEach(a => {
      if (a.selected) selCausas.push(a);
    });

    setSelectedCausas(selCausas);
  }, [causasSociais, textoCausas]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedCausas);
    }
    if (setter !== undefined) {
      setter(selectedCausas);
    }
  }, [onChange, selectedCausas, setter]);

  useEffect(() => {
    if (initialValue) {
      setSelectedCausas(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    geral_api.get(`/causas-sociais`).then(response => {
      setCausasSociais(response.data);
    });
  }, []);

  return (
    <Container>
      <ul>
        <li>
          <Grupo>
            <div
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setTextoCausas(event.target.value.toLocaleLowerCase())
              }
            >
              <InputText
                autoComplete="off"
                value={textoCausas}
                control={control}
                label={label}
                placeholder="Faça uma busca"
                name="busca_causas"
              />
            </div>
          </Grupo>
        </li>

        {causasFiltradas.length > 0 && (
          <li>
            <label className="resultados">Resultados</label>
            <GrupoResultado>
              <SubAreaContainer>
                {causasFiltradas.map(causaFiltrada => (
                  <SubAreaItem className="subarea__item" key={causaFiltrada.id}>
                    <InputCheck
                      control={control}
                      name={causaFiltrada.id.toString()}
                      type="checkbox"
                      checked={causaFiltrada.selected}
                      onChange={handleChangeSubareas}
                      label={causaFiltrada.causasSociais}
                      onClick={() => {
                        page === 'captar' && handleSubmit(onSubmit);
                      }}
                    />
                  </SubAreaItem>
                ))}
              </SubAreaContainer>
            </GrupoResultado>
          </li>
        )}

        <li>
          {selectedCausas.length > 0 && (
            <>
              <label className="resultados">Selecionados</label>
              <GrupoResultado>
                <SubAreaContainer>
                  {selectedCausas?.map(selectedCausa => (
                    <SubAreaItem
                      className="subarea__item"
                      key={selectedCausa.id}
                    >
                      <InputCheck
                        control={control}
                        name={selectedCausa.id.toString()}
                        type="checkbox"
                        checked={selectedCausa.selected}
                        onChange={handleChangeSubareas}
                        label={selectedCausa.causasSociais}
                        onClick={() => {
                          page === 'captar' && handleSubmit(onSubmit);
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

export default FiltroCausas ;
