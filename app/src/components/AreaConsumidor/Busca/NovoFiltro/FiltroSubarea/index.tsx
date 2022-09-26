import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Control } from 'react-hook-form';
import autoAnimate from '@formkit/auto-animate';
import { InputCheck } from '../../../../Form/InputCheck';
import { useBuscaFornecedorOferta } from '../../../../../hooks/buscaConsumidor';
import { useCaptarProjetoFornecedor } from '../../../../../hooks/captarProjetoFornecedor';
import { geral_api } from '../../../../../services/geral_api';
import {
  Container,
  GrupoResultado,
  SubAreaContainer,
  NameArea,
  SubAreaItem,
} from './style';
import { Area } from 'src/components/VitrinePerfil/style';

export type Subarea = {
  id: number;
  descricao: string;
  selected: boolean;
};

type Area = {
  descricao: string;
  id: number;
  subareas: Subarea[];
};

type FiltroSubareaProps = {
  control: Control;
  onChange?: (subareas: Subarea[]) => void;
  label?: string;
  setter?: React.Dispatch<React.SetStateAction<Subarea[]>>;
  initialValue?: Subarea[];
  page?: string;
};

const FiltroSubarea = ({
  control,
  onChange,
  label = 'Selecione uma ou mais áreas',
  setter,
  initialValue,
  page,
}: FiltroSubareaProps): JSX.Element => {
  const { handleSubmit, obterProjetos, mudar, setValue } =
    useCaptarProjetoFornecedor();
  const parent = useRef(null);

  const { isMudar } = useBuscaFornecedorOferta();
  const [areaSelect, setAreaSelect] = useState('');
  const [areas, setAreas] = useState<Area[]>([]);
  const [selectedSubareas, setSelectedSubareas] = useState<Subarea[]>([]);
  const onSubmit = useCallback(() => {
    if (page === 'captar') {
      obterProjetos();
    }
  }, [obterProjetos, page]);

  useEffect(() => {
    setSelectedSubareas([]);
    setAreas(oldAreas => {
      return oldAreas.map(a => ({
        id: a.id,
        descricao: a.descricao,
        subareas: a.subareas.map(sa => ({
          id: sa.id,
          descricao: sa.descricao,
          selected: false,
        })),
      }));
    });
  }, [mudar, isMudar, page, setValue]);

  useEffect(() => {
    if (page === 'captar') {
      handleSubmit(onSubmit);
    }
  }, [handleSubmit, onSubmit, page, selectedSubareas]);

  const handleChangeSubareas = useCallback((event: any) => {
    const selectedId = Number(event.target.id);
    setAreas(oldAreas => {
      return oldAreas.map(a => ({
        id: a.id,
        descricao: a.descricao,
        subareas: a.subareas.map(sa => ({
          id: sa.id,
          descricao: sa.descricao,
          selected: selectedId === sa.id ? !sa.selected : sa.selected,
        })),
      }));
    });
  }, []);

  useEffect(() => {
    const selSubareas: Subarea[] = [];

    areas.forEach(a => {
      a.subareas.forEach(sa => {
        if (sa.selected) selSubareas.push(sa);
      });
    });

    if (page === 'captar') {
      handleSubmit(onSubmit);
    }

    setSelectedSubareas(selSubareas);
  }, [areas, handleSubmit, onSubmit, page]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedSubareas);
    }
    if (setter !== undefined) {
      setter(selectedSubareas);
    }
  }, [onChange, selectedSubareas, setter]);

  useEffect(() => {
    if (initialValue) {
      setSelectedSubareas(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    geral_api.get<Area[]>('/areas').then(res => {
      setAreas(
        res.data.map(a => ({
          descricao: a.descricao,
          id: a.id,
          subareas: a.subareas.map(sa => ({
            id: sa.id,
            descricao: sa.descricao,
            selected:
              initialValue?.map((iv: Subarea) => iv.id).includes(sa.id) ||
              false,
          })),
        })),
      );
    });
  }, [initialValue]);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <Container>
      <GrupoResultado>
        <SubAreaContainer>
          <div className="areas">
            {areas.map(i => {
              return (
                <NameArea
                  ref={parent}
                  onClick={() => {
                    if (areaSelect === i.descricao) setAreaSelect('');
                    if (areaSelect !== i.descricao) setAreaSelect(i.descricao);
                  }}
                  select={areaSelect === i.descricao}
                  key={i.id}
                >
                  {i?.descricao}
                </NameArea>
              );
            })}
          </div>

          <SubAreaItem ref={parent} className="subarea__item">
            {areas
              .filter(i => i.descricao === areaSelect)
              .map(i => i.subareas)
              .map(selectedSubarea => (
                <>
                  {selectedSubarea.map(i => (
                    <InputCheck
                      key={i.descricao}
                      control={control}
                      name={i.id.toString()}
                      type="checkbox"
                      checked={i.selected}
                      onChange={handleChangeSubareas}
                      label={i.descricao}
                      onClick={() => {
                        if (page === 'captar') {
                          handleSubmit(onSubmit);
                        }
                      }}
                    />
                  ))}
                </>
              ))}
          </SubAreaItem>
        </SubAreaContainer>
      </GrupoResultado>
    </Container>
  );
};

export default FiltroSubarea;
